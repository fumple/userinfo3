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
  <div id="sidebar" class="overflow-auto">
    <sidebar-server overrideText="Home" name="Home" sid="" />
    <sidebar-server overrideText="Stats" name="Stats" sid="stats" />
    <sidebar-server
      :imgUrl="$store.getters.avatar"
      :name="($store.state.user || {}).username || 'You'"
      sid="user"
    />
    <hr />
    <sidebar-server
      v-for="guild in $store.getters.guilds"
      :key="guild.id"
      :imgUrl="guild._iconURL"
      :name="guild.name"
      :sid="guild.id"
    />
  </div>
</template>

<script>
import SidebarServer from "./SidebarServer.vue";
export default {
  name: "ServerSidebar",

  components: {
    SidebarServer,
  },
};
</script>

<style>
#sidebar {
  width: 80px;
  height: 100%;
  background-color: #202225;
  user-select: none;
  flex-shrink: 0;
}
#sidebar hr {
  margin: 10px 0 5px 0;
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
