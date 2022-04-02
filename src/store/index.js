/*
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
*/
import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

function createAxios() {
  var token = window.localStorage.getItem("token");
  return token != null
    ? axios.create({
        baseURL: "https://discord.com/api/v9/",
        timeout: 10000,
        headers: {
          Authorization: (token.includes(".") ? "Bot" : "Bearer") + " " + token,
        },
      })
    : null;
}

export default new Vuex.Store({
  state: {
    user: {},
    guilds: [],
    guildMembers: [],
    connections: [],
    selected: "",

    axios: createAxios(),

    token: window.localStorage.getItem("token"),
  },
  mutations: {
    setSelected(state, payload) {
      if (state.selected === payload) return;

      state.selected = payload;
      window.location.hash = "#" + payload;
    },
    setToken(state, payload) {
      state.token = payload;
      window.localStorage.setItem("token", payload);
      state.axios = createAxios();
    },

    setData(state, { user, guilds, connections }) {
      state.user = user;
      state.guilds = guilds;
      state.connections = connections;
    },
    setMember(state, data) {
      state.guildMembers.push(data);
    },
  },
  getters: {
    avatar(state) {
      if (state.user.discriminator == null)
        return "https://cdn.discordapp.com/embed/avatars/0.png";
      if (state.user.avatar == null)
        return (
          "https://cdn.discordapp.com/embed/avatars/" +
          (parseInt(state.user.discriminator) % 5) +
          ".png"
        );
      return (
        "https://cdn.discordapp.com/avatars/" +
        state.user.id +
        "/" +
        state.user.avatar +
        "." +
        (state.user.avatar.startsWith("a_") ? "gif" : "png")
      );
    },
    guilds(state) {
      return state.guilds.map((e) => ({
        ...e,
        _iconURL:
          e.icon != null
            ? "https://cdn.discordapp.com/icons/" +
              e.id +
              "/" +
              e.icon +
              "." +
              (e.icon.startsWith("a_") ? "gif" : "png")
            : null,
      }));
    },
  },
  actions: {},
  modules: {},
});
