<template>
  <v-app-bar app flat>
    <v-toolbar-title>
      <router-link to="/">
        <img src="@/assets/logo.png" class="site-logo" />
      </router-link>
    </v-toolbar-title>
    <div class="nav d-flex align-center">
      <div class="nav-menu">
        <router-link to="/home">{{ $t("home") }} </router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/about"> {{ $t("about") }} </router-link>
      </div>
    </div>

    <v-spacer></v-spacer>

    <div class="toggle-wrapper">
      <div>{{ $t("light") }}</div>
      <v-switch
        hide-details
        class="mx-2"
        v-model="themeValue"
        @change="changeTheme"
      ></v-switch>
      <div>{{ $t("dark") }}</div>
    </div>
    <div class="toggle-wrapper">
      <div>English</div>
      <v-switch
        hide-details
        class="mx-2"
        v-model="$i18n.locale"
        true-value="np"
        false-value="en"
        @change="switchLocale"
      ></v-switch>
      <div>Nepali</div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    themeValue: false,
  }),
  computed: {
    ...mapGetters(["themeColor", "locale"]),
  },
  mounted() {
    this.themeValue = this.themeColor === "theme-dark";
    this.$i18n.locale = this.locale;
  },
  methods: {
    changeTheme(event) {
      this.$store.commit(
        "SET_THEME_COLOR",
        event ? "theme-dark" : "theme-light"
      );
    },
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        localStorage.setItem("lang", locale);
      }
      this.$i18n.locale = locale;
      this.$store.commit("SET_LOCALE", locale);
    },
  },
};
</script>

<style>
.toggle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
}
.site-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-menu {
  font-size: 18px;
  padding: 0 24px;
}
.nav-menu a {
  font-weight: bold;
  text-decoration: none;
  color: #444 !important;
}
.nav-menu .router-link-exact-active {
  color: var(--color-primary) !important;
}
</style>