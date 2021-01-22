<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <Data />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <Geometries />
          </v-col>
          <v-col cols="12">
            <v-card outlined>
              <v-card-text class="pa-0">
                <v-row>
                  <v-col cols="6" class="pr-0">
                    <Columns />
                  </v-col>
                  <v-col cols="6" class="pl-0">
                    <Aesthetics />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <PlotView />
        <!-- <Spec /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Columns from '~/components/Columns'
import Aesthetics from '~/components/Aesthetics'
import Geometries from '~/components/Geometries'
import PlotView from '~/components/PlotView'
import Spec from '~/components/Spec'
import {
  setInstanceId,
  setDefaultInstanceId,
  getInstanceId,
} from '~/plugins/instanceId'

export default {
  name: 'Homepage',
  components: {
    Aesthetics,
    Columns,
    Geometries,
    PlotView,
    Spec,
  },
  computed: {
    url: {
      get() {
        return this.$store.state.dataset.url
      },
      set(value) {
        this.$store.commit('dataset/setUrl', value)
        this.$store.dispatch('dataset/loadData')
      },
    },
  },
  created() {
    this.$store.dispatch('loadStore')
    if (this.$route.query.instanceId) {
      setInstanceId(this.$route.query.instanceId)
      console.log('set instanceId via url query to', getInstanceId())
    } else {
      setDefaultInstanceId().then(() => {
        console.log('using default instanceId of', getInstanceId())
      })
    }
  },
}
</script>
