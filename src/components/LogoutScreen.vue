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
    <template v-if="$store.state.token == null">
      <h1>You are logged out</h1>
    </template>
    <template v-else>
      <h1>Are you sure that you want to log out?</h1>
      <div>
        <b-button variant="danger" @click="logout" class="mr-2">Yes</b-button>
        <b-button variant="success" @click="back">No</b-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "LogoutScreen",

  methods: {
    logout: function () {
      window.localStorage.removeItem("token");
      window.location.reload();
    },
    back: function () {
      window.history.back();
    },
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
