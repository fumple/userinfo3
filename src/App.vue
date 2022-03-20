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
  <div id="app">
    <Login v-if="$store.state.user.id == null || $store.state.token == null" />
    <div v-else class="d-flex w-100">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>

<script>
import Content from "./components/Content.vue";
import Login from "./components/Login.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Login,
    Sidebar,
    Content,
  },
};
</script>

<style>
html,
body {
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
  color: #eee;
  display: flex;
  flex-direction: row;
}
</style>
