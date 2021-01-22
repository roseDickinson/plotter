<template>
  <v-card outlined width="100%">
    <v-card-text class="pa-3">
      <v-row>
        <v-col
          cols="auto"
          style="display: flex; align-items: center"
          class="py-2 px-3"
        >
          <span>
            {{ name }}
          </span>
        </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-2">
          <v-btn icon small @click="dialogOpen = true">
            <v-icon dark>mdi-cog</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteCol">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialogOpen" max-width="760">
      <v-card>
        <v-card-title> {{ name }} options </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <Option
                :key="colTitle.name"
                :option="colTitle"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="4">
              <Option
                :key="colType.name"
                :option="colType"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="4">
              <Option
                :key="colScale.name"
                :option="colScale"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="6">
              <Option
                :key="colAggregate.name"
                :option="colAggregate"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="6">
              <Option
                :key="colTimeUnit.name"
                :option="colTimeUnit"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <!-- <v-col cols="6">
              <Option
                :key="colStack.name"
                :option="colStack"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col> -->
            <v-col cols="3">
              <Option
                :key="colBin.name"
                :option="colBin"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="3">
              <Option
                :key="colMaxBins.name"
                :option="colMaxBins"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
            <v-col cols="6">
              <Option
                :key="colCalculate.name"
                :option="colCalculate"
                :index="index"
                :aesthetic="aesthetic"
                :type="type"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogOpen = false"> Cancel </v-btn>
          <v-spacer />
          <v-btn @click="dialogOpen = false"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { columnProperties } from '~/constants/aesthetics'

export default {
  name: 'DraggableColumn',
  props: {
    type: {
      type: String,
      default: 'column',
    },
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    aesthetic: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogOpen: false,
      columnProperties,
    }
  },
  computed: {
    colType() {
      return columnProperties[0]
    },
    colAggregate() {
      return columnProperties[1]
    },
    colStack() {
      return columnProperties[2]
    },
    colBin() {
      return columnProperties[3]
    },
    colMaxBins() {
      return columnProperties[4]
    },
    colTitle() {
      return columnProperties[5]
    },
    colScale() {
      return columnProperties[6]
    },
    colCalculate() {
      return columnProperties[7]
    },
    colTimeUnit() {
      return columnProperties[8]
    },
  },
  methods: {
    ...mapActions({
      removeColumn: 'removeColumn',
    }),
    deleteCol() {
      this.removeColumn([this.type, this.index, this.aesthetic])
    },
  },
}
</script>
