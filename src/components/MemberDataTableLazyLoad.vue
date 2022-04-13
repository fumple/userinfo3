<!--
    Discord UserInfo 3
    Copyright (C) 2022 Fumple (fumple.pl)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<template>
  <data-table
    v-if="data != null"
    :data="data[1]"
    :hide="['user']"
    :guildId="guildId"
  />
  <div v-else-if="status != null" style="white-space: pre">
    {{ status }}
  </div>
  <b-button v-else @click="load"
    >Click to load member info (Can only click 5 times per 5 minutes!)</b-button
  >
</template>

<script>
import DataTable from "./DataTable.vue";
export default {
  components: { DataTable },
  props: {
    guildId: String,
  },
  data: () => ({
    status: null,
  }),
  computed: {
    data: function () {
      return this.$store.state.guildMembers.find((e) => e[0] == this.guildId);
    },
  },
  methods: {
    load() {
      this.status = "Loading...";
      /**
       * @type {import('axios').AxiosInstance}
       */
      const axios = this.$store.state.axios;
      axios
        .get("/users/@me/guilds/" + this.guildId + "/member")
        .then(({ data: data }) => {
          this.$store.commit("setMember", [this.guildId, data]);
          this.status = null;
        })
        .catch((e) => {
          console.error(e);
          var timetoreset =
            parseInt(
              e.response.headers["x-ratelimit-reset-after"].split(".")[0]
            ) + 1;
          if (e.response.status == 429) {
            this.status =
              "The API responded with error 429\nYou clicked the button too many times, you can click the button again in " +
              timetoreset +
              " seconds";
            timetoreset -= 1;
            var self = setInterval(() => {
              this.status =
                "The API responded with error 429\nYou clicked the button too many times, you can click the button again in " +
                timetoreset +
                " seconds";
              if (timetoreset == 0) {
                this.status = null;
                clearInterval(self);
              }
              timetoreset -= 1;
            }, 1000);
          } else
            this.status =
              "Something went wrong [/users/@me/guilds/" +
              this.guildId +
              "/member]...\n" +
              e.message;
        });
    },
  },
  watch: {
    guildId: function () {
      if (this.status != null && this.status.startsWith("Something went wrong"))
        this.status == null;
    },
  },
};
</script>

<style></style>
