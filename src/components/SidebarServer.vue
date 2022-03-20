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
  <div v-if="disableTooltip" class="d-flex mt-2 box" @click="select">
    <img
      v-if="imgUrl != null"
      :src="imgUrl"
      class="icon"
      :class="selected ? 'selected' : ''"
      :title="name"
      @click="select"
    />
    <div
      v-else
      class="icon text m-0"
      :class="selected ? 'selected' : ''"
      :title="name"
      @click="select"
    >
      {{ overrideText || name.substr(0, 3) }}
    </div>
    <div class="align-self-center ml-2">{{ name }}</div>
  </div>
  <div v-else>
    <img
      v-if="imgUrl != null"
      :src="imgUrl"
      class="icon mt-2"
      :class="selected ? 'selected' : ''"
      v-b-tooltip.right.hover="{ customClass: 'tooltip', boundary: 'viewport' }"
      :title="name"
      @click="select"
    />
    <div
      v-else
      class="icon mt-2 text"
      :class="selected ? 'selected' : ''"
      v-b-tooltip.right.hover="{ customClass: 'tooltip', boundary: 'viewport' }"
      :title="name"
      @click="select"
    >
      {{ overrideText || name.substr(0, 3) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarServer",
  props: {
    imgUrl: String,
    name: String,
    sid: String,
    dontChange: Boolean,
    overrideText: String,
    disableTooltip: Boolean,
  },
  computed: {
    selected() {
      return this.$store.state.selected === this.sid && this.sid != null;
    },
  },
  methods: {
    select() {
      if (!this.dontChange) {
        this.$store.commit("setSelected", this.sid);
      }
    },
  },
};
</script>

<style scoped>
.icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: 100ms border-radius;
  cursor: pointer;

  background: #112;

  box-sizing: content-box;
}
.text {
  text-align: center;
  vertical-align: middle;
  line-height: 48px;
  margin-left: auto;
  margin-right: auto;
}
.icon:hover {
  border-radius: 25px;
}
.icon.selected {
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}
.tooltip {
  margin-left: 10px;
}
.tooltip.b-tooltip {
  opacity: 1;
}
.box {
  transition: 0.1s ease-in-out background-color;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 25px;
  cursor: pointer;
}
.box:hover {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
