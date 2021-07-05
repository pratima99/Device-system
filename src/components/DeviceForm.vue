<template>
  <div class="home-wrapper">
    <v-card width="400px" outlined v-if="!isDeviceSelected">
      <div class="form-title">{{ $t("addDevice") }}</div>
      <v-form>
        <v-container>
          <v-row class="top-form-row">
            <v-col cols="12">
              <v-text-field
                class="form-input-control"
                :label="$t('deviceName')"
                v-model="formData.name"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                :label="$t('deviceDescription')"
                v-model="formData.description"
                dense
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="form-button-row">
            <v-btn depressed class="blue-btn" @click="saveLocally()">
              {{ $t("save") }}
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-row class="action-button-row" v-if="isDeviceSelected">
      <v-btn
        depressed
        class="red-btn"
        v-if="!isLocalDevices"
        @click="deleteDevice()"
      >
        {{ $t("delete") }}
      </v-btn>
      <v-btn
        depressed
        class="blue-btn"
        v-if="isLocalDevices"
        @click="saveDevice()"
      >
        {{ $t("send") }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    formData: {},
  }),
  computed: {
    ...mapGetters(["selectedDevice", "devices"]),
    isLocalDevices() {
      return this.selectedDevice?.type === "local";
    },
    isDeviceSelected() {
      return Object.keys(this.selectedDevice).length > 0;
    },
  },
  methods: {
    saveLocally() {
      if (localStorage.getItem("data") == null) {
        localStorage.setItem("data", "[]");
      }
      const old_data = JSON.parse(localStorage.getItem("data"));
      old_data.push(this.formData);

      localStorage.setItem("data", JSON.stringify(old_data));
      this.formData = {};
      this.$store.commit("SET_LOCAL_DEVICES");
    },
    async deleteDevice() {
      const confirmation = confirm("Do you want to delete this device ?");
      if (confirmation) {
        await this.$store.dispatch("deleteDevice", this.selectedDevice.id);
        this.$store.commit("SET_SELECTED_DEVICE", {});
      }
    },
    async saveDevice() {
      const dataToSend = {
        devices: [
          {
            id: this.devices[this.devices.length - 1].id + 1,
            name: this.selectedDevice.name,
            description: this.selectedDevice.description,
          },
        ],
      };
      await this.$store.dispatch("saveDevice", dataToSend);
      this.$store.commit("SET_SELECTED_DEVICE", {});
    },
  },
};
</script>

<style>
.form-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-primary);
  padding: 20px 0;
}
.top-form-row {
  padding: 0 15px;
}
.form-input-control {
  height: 40px;
}
.form-button-row {
  padding: 0 24px 24px 27px;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-button-row {
  padding: 20px;
}
.blue-btn {
  background-color: var(--color-primary) !important;
  color: #fff !important;
}
.red-btn {
  background-color: #d11a2a !important;
  color: #fff !important;
}
</style>
