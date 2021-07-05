<template>
  <v-card height="100%" width="256" class="sidebar-card">
    <v-navigation-drawer permanent>
      <v-list nav class="px-2 py-5">
        <v-list-item v-for="device in devices" :key="device.id" link>
          <v-list-item-content @click="getDeviceId(device)">
            <v-list-item-title>{{ device.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="local in localDevices" :key="local.name" link>
          <v-list-item-content
            class="local-device"
            @click="getDeviceId(local, 'local')"
          >
            <v-list-item-title>{{ local.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["devices", "localDevices"]),
  },
  created() {
    this.$store.commit("SET_LOCAL_DEVICES");
    this.$store.dispatch("getDevices");
  },
  methods: {
    getDeviceId(data, type) {
      if (type === "local") {
        data.type = "local";
      }
      this.$store.commit("SET_SELECTED_DEVICE", data);
    },
  },
};
</script>

<style>
.sidebar-card {
  box-shadow: none !important;
}
.v-navigation-drawer {
  border-radius: 0 !important;
}
.local-device {
  background-color: var(--color-dark);
  color: #fff;
}
</style>