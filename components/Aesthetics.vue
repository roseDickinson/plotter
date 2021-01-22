<template>
  <v-card elevation="0" height="100%" class="bg-grey">
    <v-card-title>
      <v-row>
        <v-col cols="auto" style="display: flex; align-items: center">
          <v-icon color="primary"> mdi-image-filter-vintage </v-icon>
        </v-col>
        <v-col cols="auto" class="pl-0"> Aesthetics </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Map columns to visual properies</v-card-subtitle>
    <v-card-text>
      <v-list class="bg-grey">
        <Aesthetic
          v-for="aesthetic in currentAesthetics"
          :key="aesthetic"
          :name="aesthetic"
        />
      </v-list>
      <v-overflow-btn
        v-model="addAestheticSelected"
        :items="aesthetics"
        item-value="name"
        label="Add new aesthetic"
        flat
        filled
        @input="addAesthetic"
      >
        <template v-slot:item="{ item, attrs, on }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-title
                :id="attrs['aria-labelledby']"
                v-text="item.name"
              />

              <v-list-item-subtitle v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-overflow-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import Aesthetic from '~/components/Aesthetic'
import { aesthetics } from '~/constants/aesthetics'

export default {
  name: 'Dataset',
  components: {
    Aesthetic,
  },
  data() {
    return { addAestheticSelected: null }
  },
  computed: {
    currentAesthetics() {
      const geometry = this.$store.getters['geometries/geometry']
      return Object.keys(geometry.aesthetics)
    },
    aesthetics() {
      return aesthetics
    },
  },
  methods: {
    addAesthetic(name) {
      this.$store.commit('geometries/addAesthetic', name)
      this.$nextTick(() => {
        this.addAestheticSelected = null
      })
    },
  },
}
</script>
