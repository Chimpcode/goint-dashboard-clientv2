<template>
  <div>
    <span v-if="type === 'big'" class="big-title">
        {{name}}
    </span>
    <span v-if="type === 'simple'" class="simple-title">
        {{name}}
    </span>

    <v-layout row style="margin-left: 0px;" v-if="!vertical">
      <div v-for="(item, key) in model" @click="changeInternalState(key)">
        <span class="item-title-style">{{item.name}}</span>
        <div :class="item.value?'activated-check-container':'deactivated-check-container'">
        </div>
      </div>
    </v-layout>
    <div style="margin-left: 0px;" v-if="vertical">
      <div v-for="(item, key) in model" @click="changeInternalState(key)">
        <span class="item-title-style">{{item.name}}</span>
        <div :class="item.value?'activated-check-container':'deactivated-check-container'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CcCheckBoxGroup',
  props: {
    model: Object,
    name: String,
    type: String,
    onChangeState: Function,
    vertical: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    changeInternalState (key) {
      console.log(key)
      const vmodel = this.model
      vmodel[key].value = !vmodel[key].value
      if (this.onChangeState) {
        this.onChangeState(vmodel)
      }
    }
  }

}
</script>

<style>
.deactivated-check-container {
  background: #D8D8D8;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  margin-right: 15px;
}
.activated-check-container {
  background: #F57474;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  margin-right: 15px;
}
.item-title-style {
  font-family: NexaBold;
  font-size: 12px;
  color: #838383;
}
.big-title {
  font-family: NexaBold;
  font-size: 26px;
  color: #666666;
  padding-top: 20px;
}
.simple-title {
  font-family: NexaBold;
  font-size: 16px;
  color: #666666;
  padding-top: 30px;
}

.activated-check-container:hover {
  cursor: pointer;
}
.deactivated-check-container:hover {
  cursor: pointer;
}
</style>
