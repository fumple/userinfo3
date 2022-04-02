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
  <div
    id="content"
    class="overflow-auto m-4"
    v-if="$store.state.selected == null || $store.state.selected == ''"
  >
    <h1 class="m-0">Welcome to Discord UserInfo 3.0!</h1>
    <h5 class="m-0">
      now at <code>//dinfo.fumple.pl</code>, previously at
      <code>//fumple.pl/discord/userinfo</code>
    </h5>
    <p class="mt-4">
      I see you have already logged in!<br />
      Pick a server or yourself on the left to continue<br />
      If you are looking for a specific server, you can search below<br />
      Oh right, the most important statistic!<br />
    </p>
    <h2>You are in {{ $store.state.guilds.length }} servers!</h2>
    <p>Amazing, right?</p>
    <b-form-input
      v-model="search"
      placeholder="Search (server name)"
      class="big-80"
    ></b-form-input>
    <h6 class="mt-4 text-left big-80">
      Found {{ searchGuilds.length }} servers!
    </h6>
    <div class="mb-4 big-80">
      <sidebar-server
        v-for="guild in searchGuilds"
        :key="guild.id"
        :imgUrl="guild._iconURL"
        :name="guild.name"
        :sid="guild.id"
        class="d-block m-1"
        disableTooltip
      />
    </div>
    <p style="font-size: small" class="mt-4">
      This website is not affiliated with Discord<br />
      Your data or token never leaves your browser outside of communicating with
      the Discord API<br />
      You can read a bit more about your privacy
      <a href="https://fumple.pl/discord/userinfo/privacy" target="_blank"
        >here</a
      ><br />
      Feature and Flag descriptions from
      <a href="https://discord.com/developers/docs" target="_blank"
        >https://discord.com/developers/docs</a
      ><br />
      <a href="#" @click="() => $store.commit('setToken', null)">Log out</a
      ><br />
      <br />
      <!-- if you made a fork of this website, uncomment the line below and fill it -->
      <!-- This is a modified version of the app above
      Copyright (C) {year} {author}
      Source code available at <a href="{url}">{hostname}</a> under the GNU General Public License -->
      <!-- as part of the licence the footer below must remain intact and accessible -->
      Discord UserInfo 3.0<br />
      Copyright (C) 2022 Fumple (fumple.pl)<br />
      Source code available at
      <a href="https://github.com/fumple/userinfo3">github.com</a> under the GNU
      General Public License<br />
      <a href="https://github.com/fumple/userinfo3/contributors"
        >List of contributors</a
      >
      <!-- end of the footer -->
    </p>
  </div>
  <div
    id="content"
    class="overflow-auto m-4"
    v-else-if="$store.state.selected == 'stats'"
  >
    <h1>Servers with feature</h1>
    <data-table
      :data="featuresCount"
      :allowClick="true"
      @value-clicked="
        (k) => {
          search = '!feature:' + k;
          $store.commit('setSelected', '');
        }
      "
    />
    <h1>Servers with permission</h1>
    <data-table
      :data="permissionCount"
      :allowClick="true"
      @value-clicked="
        (k) => {
          search = '!permission:' + k;
          $store.commit('setSelected', '');
        }
      "
    />
  </div>
  <div
    id="content"
    class="overflow-auto m-4 text-left"
    v-else-if="$store.state.selected == 'user'"
  >
    <h1>Info about you!</h1>
    <data-table :data="$store.state.user" />
    <h1>Your connections</h1>
    <b-table
      striped
      bordered
      dark
      sort
      responsive
      :items="$store.state.connections"
    ></b-table>
  </div>
  <div
    id="content"
    class="overflow-auto m-4 text-left"
    v-else-if="$store.state.selected == 'debug'"
  >
    <debug-menu />
  </div>
  <div
    id="content"
    class="overflow-auto m-4 text-left"
    v-else-if="$store.state.guilds.find((e) => e.id == $store.state.selected)"
  >
    <h1>Info about a server!</h1>
    <data-table
      :data="$store.state.guilds.find((e) => e.id == $store.state.selected)"
    />
    <h1>Info about you in that server!</h1>
    <member-data-table-lazy-load :guildId="$store.state.selected" />
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import MemberDataTableLazyLoad from "./MemberDataTableLazyLoad.vue";
import SidebarServer from "./SidebarServer.vue";

import { PERMISSIONS } from "../Static.js";
import DebugMenu from "./DebugMenu.vue";

export default {
  name: "MainContent",

  components: { SidebarServer, DataTable, MemberDataTableLazyLoad, DebugMenu },
  data: () => ({
    search: "",
  }),
  computed: {
    searchGuilds: function () {
      var matches = this.search.matchAll(/!(feature|permission):([A-Z_]*)/g);
      var searchName = this.search
        .replace(/!(feature|permission):([A-Z_]*)/g, "")
        .trim()
        .toLowerCase();
      var search = this.$store.getters.guilds.filter((e) =>
        e.name.toLowerCase().includes(searchName)
      );
      for (var match of matches) {
        if (match[1] == "feature")
          search = search.filter((e) => {
            return e.features.includes(match[2]);
          });
        else if (match[1] == "permission") {
          var permNum = Object.entries(PERMISSIONS).find(
            (e) => e[1] == match[2]
          )?.[0];
          if (permNum != null)
            search = search.filter((e) => {
              return (e.permissions & (1 << permNum)) != 0;
            });
        }
      }
      return search;
    },
    featuresCount: function () {
      var count = {};
      for (var g of this.$store.state.guilds) {
        if (g.features != null)
          for (var f of g.features) {
            count[f] = count[f] != null ? count[f] + 1 : 1;
          }
      }
      return Object.fromEntries(
        Object.entries(count).sort((a, b) => a[0].localeCompare(b[0]))
      );
    },
    permissionCount: function () {
      var count = {};
      for (var g of this.$store.state.guilds) {
        if (g.permissions != null)
          for (var perm of Object.entries(PERMISSIONS)
            .filter((e) => (g.permissions & (1 << e[0])) != 0)
            .map((e) => e[1])) {
            count[perm] = count[perm] != null ? count[perm] + 1 : 1;
          }
      }
      return Object.fromEntries(
        Object.entries(count).sort((a, b) => a[0].localeCompare(b[0]))
      );
    },
  },
};
</script>

<style>
#content {
  height: calc(100% - 3rem);
  flex-grow: 1;
}
.big-80 {
  max-width: 80%;
  margin-left: 10%;
}
@media only screen and (max-width: 600px) {
  .big-80 {
    max-width: 100%;
    width: 100%;
    margin-left: 0;
  }
}
</style>
