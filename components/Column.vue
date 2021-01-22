<template>
  <v-card outlined elevation="2" width="100%">
    <v-card-text>
      <v-row>
        <v-col style="display: flex; align-items: center" class="py-2 px-3">
          <span>
            {{ name }}
          </span>
        </v-col>
        <v-spacer />
        <v-col style="display: flex; justify-content: flex-end" class="pa-2">
          <v-btn icon small @click="deleteCol">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { columnProperties } from '~/constants/aesthetics'

export default {
  name: 'Column',
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
  computed: {
    columnProperties() {
      return columnProperties
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
