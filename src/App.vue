<template>
  <v-app :class="themeColor">
    <div class="main-body">
      <Navbar @changeTheme="changeTheme()" />
      <div class="main-container">
        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-view-container">
          <router-view />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    ...mapGetters(["themeColor"]),
  },
  created() {
    this.$store.commit(
      "SET_THEME_COLOR",
      localStorage.getItem("theme-color") || "theme-light"
    );
  },
  methods: {
    changeTheme() {
      const savedTheme = localStorage.getItem("theme-color");
      if (savedTheme === "theme-dark") {
        localStorage.setItem("theme-color", "theme-light");
        this.currentTheme = localStorage.getItem("theme-color");
      } else {
        localStorage.setItem("theme-color", "theme-dark");
        this.currentTheme = localStorage.getItem("theme-color");
      }
    },
  },
};
</script>


<style lang="scss">
:root {
  --color-primary: #0191ff;
  --color-blue: #040344;
  --color-dark: #243247;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app.theme-dark {
  background-color: #fff;
  .v-app-bar {
    background-color: var(--color-dark);
    color: #fff;
  }
  .v-card {
    background-color: var(--color-dark);
    color: #fff;
  }
  .v-navigation-drawer {
    background-color: var(--color-dark);
    .v-list-item__title {
      color: #fff !important;
    }
  }
  .nav-menu {
    a {
      color: #fff !important;
    }
    .router-link-exact-active {
      color: var(--color-primary) !important;
    }
  }
  .v-label,
  .v-input textarea,
  .v-input input {
    color: #fff !important;
  }
  .local-device {
    background-color: var(--color-primary);
  }
}

.main-body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-container {
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  padding-top: 64px;
}
.sidebar-container {
  height: 100%;
}
.main-view-container {
  padding: 30px;
  width: 100%;
}
</style>
