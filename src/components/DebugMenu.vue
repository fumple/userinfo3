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
  <div>
    <h1>"Secret" Debug Menu</h1>
    <b-alert
      class="ws-pre"
      :variant="alertVariant"
      :show="alertVariant != null"
      >{{ alertMsg }}</b-alert
    >
    <hr />
    <b-button
      @click="refresh('/users/@me', 'user')"
      :disabled="pending"
      class="m-1"
      >Refresh user data [/users/@me]</b-button
    >
    <b-button
      @click="refresh('/users/@me/guilds', 'guilds')"
      :disabled="pending"
      class="m-1"
      >Refresh guild data [/users/@me/guilds]</b-button
    >
    <b-button
      @click="refresh('/users/@me/connections', 'connections')"
      :disabled="pending"
      class="m-1"
      >Refresh guild data [/users/@me/connections]</b-button
    >
    <hr />
    <b-button @click="clearMemberCache" class="m-1"
      >Clear guild member cache</b-button
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    alertVariant: null,
    alertMsg: "",
  }),
  methods: {
    refresh(url, type) {
      this.alertVariant = "info";
      this.alertMsg = "Attempting to refresh " + type + " data...";
      /**
       * @type {import('axios').AxiosInstance}
       */
      const axios = this.$store.state.axios;
      axios
        .get(url)
        .then(({ data }) => {
          this.$store.commit("setData", { [type]: data });
          this.alertVariant = "success";
          this.alertMsg = "Refreshed " + type + " data!";
        })
        .catch((e) => {
          this.alertVariant = "error";
          this.alertMsg =
            "Something went wrong [" + type + "]...\n" + e.message;
        });
    },
    clearMemberCache() {
      this.$store.commit("clearMembers");
      this.alertVariant = "success";
      this.alertMsg = "Cleared member cache!";
    },
  },
  computed: {
    pending: function () {
      return (
        this.alertVariant != null &&
        !["success", "error"].includes(this.alertVariant)
      );
    },
  },
};
</script>

<style scoped>
.ws-pre {
  white-space: pre-wrap;
}
</style>
