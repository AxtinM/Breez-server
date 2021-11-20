<template>
  <div id="app">
    <Lightbulb :isOn="currentValue" class="pointer" />
    <div>
      <code>{{ currentValue }}</code>
    </div>
    <RockerSwitch
      :size="1.2"
      :value="currentValue"
      background-color-on="green"
      activeColorLabel="yellow"
      @change="(isOn) => (currentValue = isOn)"
    />
  </div>
</template>

<script>
import Lightbulb from "./components/Lightbulb";
import RockerSwitch from "./components/RockerSwitch";
import VueNativeSock from "vue-native-websocket";

Vue.use(VueNativeSock, "ws://localhost:9090");

export default {
  name: "app",
  components: {
    RockerSwitch,
    Lightbulb,
  },
  data() {
    return {
      currentValue: false,
      connection: null,
    };
  },
  created() {
    console.log("connection to websocket server");
    this.connection = new VueNativeSock("ws://localhost:1883");
  },
};
</script>

<style>
#app div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.pointer {
  cursor: pointer;
}
</style>
