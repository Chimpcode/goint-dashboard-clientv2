<template>
  <div>
    <span v-if="type === 'big'" class="big-title">
        {{name}}
    </span>
    <span v-if="type === 'simple'" class="simple-title">
        {{name}}
    </span>
    <span v-if="type === 'mini'" class="mini-title">
        {{name}}
    </span>
    <div :class="focused?'cc-container-focused':'cc-container'">
      <input class="inner-input" :value="value" ref="numInput" :placeholder="placeholder"
              @focus="focused = true"
              @blur="focused = false"
              :type="mode"
              :max="max"
              :min="min"
              v-if="mode === 'number'"
              @change="updateInput()"
      />
      <input class="inner-input" :value="value" ref="textInput" :placeholder="placeholder"
             @focus="focused = true"
             @blur="focused = false"
             :type="mode"
             v-else-if="mode === 'date'"
             @input="updateInput()"
      />
      <input class="inner-input" :value="value" ref="textInput" :placeholder="placeholder"
             @focus="focused = true"
             @blur="focused = false"
             @input="updateInput()"
             type="text"
             v-else
      />

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CcTextInput',
    props: {
      value: [String, Number],
      name: String,
      placeholder: String,
      type: String,
      mode: String,
      max: Number,
      min: Number
    },
    data () {
      return {
        focused: false
      }
    },
    methods: {
      updateInput () {
        if (this.mode === 'number') {
          if (this.$refs.numInput.value > this.max ||
            this.$refs.numInput.value < this.min) {
            if (this.$refs.numInput.value > this.max) {
              this.$refs.numInput.value = this.max
              // this.value = this.max - 1
            } else {
              this.$refs.numInput.value = this.min
              // this.value = this.min + 1
            }
          }
          this.$emit('input', this.$refs.numInput.value)
        } else {
          this.$emit('input', this.$refs.textInput.value)
        }
      }
    }
  }
</script>

<style type="stylus">
.inner-input {
  border: none;
  width: 100%;
  /*padding-right: 30px;*/
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.cc-container {
  background: #FFFFFF;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.16);
  border-radius: 4px;
  width: 100%;
  height: 35px;
  padding: 10px;
  text-align: center;
  vertical-align: center;
}

.cc-container-focused {
  background: #FFFFFF;
  box-shadow: 0 0 7px 0 #F3777A, 0 1px 10px 0 rgba(0,0,0,0.16);
  border-radius: 4px;
  width: 100%;
  height: 35px;
  padding: 10px;
  text-align: center;
  vertical-align: center;
}

.inner-input:focus {
    outline:none;
}

.big-title {
  font-family: NexaBold;
  font-size: 26px;
  color: #666666;
  margin-bottom: 10px;
}
.simple-title {
  font-family: NexaBold;
  font-size: 16px;
  color: #666666;
  margin-bottom: 10px;
}
.mini-title {
  font-family: NexaBold;
  font-size: 12px;
  color: #888888;
  margin-bottom: 10px;
}
</style>
