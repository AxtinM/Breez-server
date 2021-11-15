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

export default {
  name: "app",
  components: {
    RockerSwitch,
    Lightbulb,
  },
  data() {
    return {
      currentValue: false,
    };
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
