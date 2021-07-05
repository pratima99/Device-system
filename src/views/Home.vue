<template>
  <div class="home-container">
    <DeviceForm />
    <div class="status-message-container">
      <v-snackbar v-model="snackbar" v-if="isSnackbarVisible">
        {{ statusMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="resetMessage()">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceForm from "@/components/DeviceForm";
export default {
  name: "Home",
  components: {
    DeviceForm,
  },
  data: () => ({
    snackbar: true,
  }),
  computed: {
    ...mapGetters(["statusMessage"]),
    isSnackbarVisible() {
      return this.statusMessage.length > 0;
    },
  },
  methods: {
    resetMessage() {
      this.$store.commit("SET_STATUS_MESSAGE", "");
    },
  },
};
</script>

<style>
.status-message-container {
  position: absolute;
  bottom: 0;
}
</style>
