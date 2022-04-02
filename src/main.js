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

import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

Vue.config.productionTip = false;

// Get current hash, and set the current page to it
const _hash = window.location.hash.substring(1);
if (_hash.length !== 0) {
  store.commit("setSelected", _hash);
}

// On hash change, set the current page to the hash if the page is different from the current one, to prevent spamming the browser history
window.addEventListener("hashchange", (e) => {
  var strhash = new URL(e.newURL).hash;
  var hash = strhash.substring(1);
  if (hash === "null" || hash.length <= 1) hash = "";
  if (hash !== store.state.selectedChannel) {
    store.commit("setSelected", hash);
  }
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
