<template>
  <div>
    <span v-if="type === 'big'" class="big-title">
        {{name}}
    </span>
    <span v-if="type === 'simple'" class="simple-title">
        {{name}}
    </span>
    <v-layout row>
      <v-flex xs5>
        <CcTextInput
          v-model.number="firstValue"
          ref="startVal"
          @input="checkValidity"
          :name="'Desde'"
          :type="'mini'"
          mode="number"
          :max="max"
          :min="min"
        />
      </v-flex>

      <v-flex xs5>
        <CcTextInput
          v-model.number="lastValue"
          ref="endVal"
          @input="checkValidity"
          :name="'Hasta'"
          :type="'mini'"
          mode="number"
          :max="max"
          :min="min"
        />
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
  import CcTextInput from '~/components/cc_textinput'
  export default {
    name: 'CcRangeInput',
    components: { CcTextInput },
    props: {
      model: Number,
      name: String,
      type: String,
      max: Number,
      min: Number
    },
    data () {
      return {
        firstValue: this.min,
        lastValue: this.max
      }
    },
    methods: {
      checkValidity (value) {
        console.log('check on change', value)
        if (this.$refs.startVal.value > this.$refs.endVal.value) {
          // let startValue = this.$refs.startVal.value
          this.firstValue = this.$refs.endVal.value
          this.lastValue = this.$refs.startVal.value
          // this.$refs.startVal.value = this.$refs.endVal.value
          // this.$refs.endVal.value = startValue
        }
        let input = [this.firstValue, this.lastValue]
        this.emitValue(input)
      },
      emitValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>
<style>
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
</style>
