<template>
  <div id="app">
    <h1>Breez</h1>
    <Lightbulb :isOn="currentValue" class="pointer" />
    <div>
      <code>{{ currentValue }}</code>
    </div>
    <RockerSwitch
      :size="1.0"
      :value="currentValue"
      background-color-on="green"
      activeColorLabel="yellow"
      @change="(isOn) => (currentValue = isOn)"
      @change-state="changeState"
    />
  </div>
</template>

<script>
import Lightbulb from "./components/Lightbulb";
import RockerSwitch from "./components/RockerSwitch";
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
  methods: {
    sendMessage(msg) {
      console.log(msg);
      this.connection.send(msg);
    },
    changeState(value) {
      console.log("value", value);
      this.sendMessage(value ? "1" : "0");
    },
  },
  created() {
    console.log("connecting to websocket server");
    this.connection = new WebSocket("ws://localhost:8801/status");
    this.connection.onmessage = function(event) {
      console.log(event);
      this.connection.onopen = function(event) {
        console.log(event);
        console.log("started connection on websocket server");
      };
    };
  },
};
</script>

<style>
h1 {
  font-family: "Ubuntu", sans-serif;
  text-align: center;
  margin: 50px 0;
}
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
