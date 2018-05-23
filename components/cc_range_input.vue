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
          v-model.number="firstValueComputed"
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
          v-model.number="lastValueComputed"
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
      min: Number,
      value: Array
    },
    computed: {
      firstValueComputed: {
        get () {
          if (this.value !== undefined) {
            this.firstValue = this.value[0]
            return this.firstValue
          }
          return this.firstValue
        },
        set (value) {
          this.firstValue = value
        }
      },
      lastValueComputed: {
        get () {
          if (this.value !== undefined) {
            this.lastValue = this.value[1]
            return this.lastValue
          }
          return this.lastValue
        },
        set (value) {
          this.lastValue = value
        }
      }
    },
    data () {
      return {
        firstValue: this.min,
        lastValue: this.max
      }
    },
    methods: {
      checkValidity (value) {
        if (this.firstValue > this.lastValue) {
          // let startValue = this.$refs.startVal.value
          const temporalValue = this.firstValue
          this.firstValue = this.lastValue
          this.lastValue = temporalValue
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
