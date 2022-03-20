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
  <b-table-simple striped bordered dark class="text-left">
    <b-tbody>
      <b-tr
        v-for="[k, v] in Object.entries(data).filter(
          (e) => hide == null || !hide.includes(e[0])
        )"
        :key="k"
      >
        <b-td style="width: 1%">{{ k }}</b-td>
        <b-td v-if="!allowClick" :class="k == 'features' ? 'p-0' : ''">
          <a
            v-if="isLink(k) && v != null"
            :href="getLink(k)"
            target="_blank"
            class="ws-pre"
            >{{ vv(v) }}</a
          >
          <span v-else-if="isColor(k) && v != null"
            ><div
              :style="{
                '--color': v.toString().startsWith('#')
                  ? v
                  : '#' + v.toString(16),
              }"
              class="ws-pre"
            ></div>
            {{ vv(v) }}</span
          >
          <span v-else-if="isTable(k) && v != null" class="ws-pre"
            ><data-table :data="getTableData(k, v)" :hide="['features']"
          /></span>
          <span v-else class="ws-pre">{{ vv(v) }}{{ ve(k, v) }}</span>
        </b-td>
        <b-td v-else>
          <a href="#" class="ws-pre" @click="$emit('value-clicked', k)">{{
            vv(v)
          }}</a>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { FLAGS, FEATURES } from "../Static.js";

export default {
  name: "data-table",
  props: {
    data: Object,
    allowClick: Boolean,
    hide: Array,
  },
  methods: {
    isLink(k) {
      return ["avatar", "banner", "icon"].includes(k);
    },
    isColor(k) {
      return ["banner_color", "accent_color"].includes(k);
    },
    isTable(k) {
      return ["features"].includes(k);
    },
    getLink: function (k) {
      if (k == "avatar")
        return (
          "https://cdn.discordapp.com/avatars/" +
          this.data.id +
          "/" +
          this.data[k] +
          "." +
          (this.data[k].startsWith("a_") ? "gif" : "png") +
          "?size=1024"
        );
      else if (k == "banner")
        return (
          "https://cdn.discordapp.com/banners/" +
          this.data.id +
          "/" +
          this.data[k] +
          "." +
          (this.data[k].startsWith("a_") ? "gif" : "png") +
          "?size=1024"
        );
      else if (k == "icon")
        return (
          "https://cdn.discordapp.com/icons/" +
          this.data.id +
          "/" +
          this.data[k] +
          "." +
          (this.data[k].startsWith("a_") ? "gif" : "png") +
          "?size=1024"
        );
      else return "";
    },
    getTableData: function (k, v) {
      if (k == "features") {
        var vc = [...v].sort((a, b) => a.localeCompare(b));
        return Object.fromEntries(
          Object.entries(vc).map((e) => [e[1], FEATURES[e[1]] || "unknown"])
        );
      } else return {};
    },
    vv: function (v) {
      // vv? basically formatted v
      var vc;
      if (v?.sort != null) vc = [...v];
      if (v != null && typeof v == "object")
        return JSON.stringify(
          v.sort != null ? vc.sort((a, b) => a.localeCompare(b)) : v,
          null,
          2
        );
      return v == null ? "null" : v;
    },
    ve: function (k, v) {
      // value extra
      if (k == "id") {
        // credit to https://hugo.moe/discord/discord-id-creation-date.html
        var bin = parseInt(v).toString(2);
        return (
          "\nCreated at: " +
          new Date(
            parseInt(bin.substring(0, 42 - (64 - bin.length)), 2) +
              1420070400000
          ).toUTCString()
        );
      } else if (k == "flags" || k == "public_flags") {
        return (
          "\n" +
          JSON.stringify(
            Object.entries(FLAGS)
              .filter((e) => (v & e[0]) != 0)
              .map((e) => e[1]),
            null,
            4
          )
        );
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: inline;
  width: 1em;
  height: 1em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: var(--color);
}
.ws-pre {
  white-space: pre-wrap;
}
table table {
  padding: 0;
}
</style>
