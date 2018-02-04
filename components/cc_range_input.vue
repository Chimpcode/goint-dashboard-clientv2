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
          :model="firstValue"
          :name="'Desde'"
          :type="'mini'"
        />
      </v-flex>

      <v-flex xs5>
        <CcTextInput
          :model="lastValue"
          :name="'Hasta'"
          :type="'mini'"
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
      type: String
    },
    data () {
      return {
        firstValue: 0,
        lastValue: 0
      }
    },

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
