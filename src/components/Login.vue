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
  <div class="login">
    <template
      v-if="
        hash.get('error') == null &&
        hash.get('access_token') == null &&
        $store.state.token == null
      "
    >
      <h1>You are not logged it</h1>
      <span v-if="$store.state.user.id == null"
        >You are being redirected automatically as we speak<br
      /></span>
      If the redirect doesn't happen, <a :href="loginUrl">click here!</a>
    </template>
    <template v-else-if="hash.get('error') != null">
      <h1>{{ hash.get("error") }}</h1>
      {{ hash.get("error_description") }}<br />
      Want to try logging in again? <a :href="loginUrl">Click here!</a>
    </template>
    <template v-else>
      <h1>{{ status }}</h1>
      <span v-if="status.startsWith('Something went wrong')"
        >If refreshing the page won't fix this problem, maybe
        <a href="#" @click="logout">logging out</a> and logging in again will
        help?</span
      >
      <span v-else-if="page == 'loggedout'"
        >If you won't get redirected automatically, refresh this page</span
      >
    </template>
  </div>
</template>

<script>
const loginUrl = new URL(
  "https://discord.com/api/oauth2/authorize?response_type=token&scope=identify%20guilds%20guilds.members.read%20connections"
);
loginUrl.searchParams.set("client_id", process.env.VUE_APP_CLIENT_ID);
loginUrl.searchParams.set("redirect_uri", process.env.VUE_APP_REDIRECT_URI);
const hash = window.location.hash.substr(1);
window.location.hash = "#";

function handleError(v, e) {
  if (e.response.status == 401) {
    v.status = "Token expired, you must log in again";
    v.logout(true);
  }
}

export default {
  name: "Login",
  data: () => ({
    status: "Please wait...",
    page: "",
  }),
  computed: {
    loginUrl() {
      return loginUrl.toString();
    },
    hash() {
      return new URLSearchParams(hash);
    },
  },
  methods: {
    logout: function (dontChangeStatus) {
      window.localStorage.removeItem("token");
      if (dontChangeStatus) this.status = "Logged out, refreshing page...";
      this.page = "loggedout";
      window.location.reload();
    },
  },
  created() {
    var hash = this.hash;
    if (
      hash.get("error") == null &&
      hash.get("access_token") == null &&
      this.$store.state.token == null
    ) {
      window.location = this.loginUrl;
      return;
    } else if (hash.get("access_token") != null) {
      this.$store.commit("setToken", hash.get("access_token"));
    }

    if (this.$store.state.token != null) {
      this.status = "Got a token, trying to use it...";
      /**
       * @type {import('axios').AxiosInstance}
       */
      const axios = this.$store.state.axios;
      axios
        .get("/users/@me")
        .then(({ data: user }) => {
          axios
            .get("/users/@me/guilds")
            .then(({ data: guilds }) => {
              axios
                .get("/users/@me/connections")
                .then(({ data: connections }) => {
                  this.$store.commit("setData", { user, guilds, connections });
                })
                .catch((e) => {
                  this.status =
                    "Something went wrong [/users/@me/connections]...\n" +
                    e.message;
                  handleError(this, e);
                });
            })
            .catch((e) => {
              this.status =
                "Something went wrong [/users/@me/guilds]...\n" + e.message;
              handleError(this, e);
            });
        })
        .catch((e) => {
          this.status = "Something went wrong [/users/@me]...\n" + e.message;
          handleError(this, e);
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre;
}
</style>
