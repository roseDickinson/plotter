<template>
  <v-card elevation="0">
    <v-card-title>
      <v-row>
        <v-col cols="auto" style="display: flex; align-items: center">
          <v-icon color="primary"> mdi-table </v-icon>
        </v-col>
        <v-col cols="auto" class="pl-0"> Columns </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Drag columns to an aesthetic</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <draggable
            v-model="columns"
            :group="{ name: 'aesthetics', pull: 'clone', put: true }"
            :sort="false"
            tag="v-expansion-panels"
            :component-data="getComponentData()"
          >
            <Column
              v-for="(column, i) in columns"
              :key="column.name"
              :name="column.name"
              :index="i"
              type="column"
              class="my-1"
            />
          </draggable>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-overflow-btn
            v-model="addColumnSelected"
            :items="columnsInDataFile"
            label="Add new field"
            flat
            filled
            @input="addColumn"
          />
        </v-col>
        <v-col cols="10" class="py-0">
          <v-text-field
            v-model="calculateExpression"
            label="Calculate new field"
            hint='for example: "2*datum.fieldName" <a
      href="https://vega.github.io/vega/docs/expressions">(syntax}</a>'
            filled
            persistent-hint
          >
            <template v-slot:message="{ message }">
              <span v-html="message" />
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2" class="py-0">
          <v-btn icon @click="addCalculateField">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model="filterExpression"
            label="Filter data"
            hint='for example: "datum.fieldName > 60" <a
      href="https://vega.github.io/vega/docs/expressions">(syntax}</a>'
            filled
            persistent-hint
          >
            <template v-slot:message="{ message }">
              <span v-html="message" />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import Column from '~/components/Column'

export default {
  name: 'Columns',
  components: {
    draggable,
    Column,
  },
  data() {
    return { calculateExpression: null, addColumnSelected: null }
  },
  computed: {
    columnsInDataFile() {
      const cols = this.$store.state.dataset.columnsInDataFile.map((c) => {
        return c.name
      })
      return cols
    },
    columns: {
      get() {
        return this.$store.state.dataset.columns
      },
      set(value) {
        this.$store.commit('dataset/setColumns', value)
      },
    },
    filterExpression: {
      get() {
        return this.$store.state.dataset.filter
      },
      set(value) {
        this.$store.commit('dataset/setFilter', value)
      },
    },
  },
  methods: {
    getComponentData() {
      return {
        attrs: {
          flat: true,
          hover: true,
        },
      }
    },
    addColumn(name) {
      this.$store.commit('dataset/addColumn', name)
      this.$nextTick(() => {
        this.addColumnSelected = null
      })
    },
    addCalculateField(mouseEvent) {
      this.$store.commit('dataset/addCalculateField', this.calculateExpression)
      this.$nextTick(() => {
        this.calculateExpression = null
      })
    },
  },
}
</script>

<style>
.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.footer-item {
  opacity: 50%;
}
</style>
