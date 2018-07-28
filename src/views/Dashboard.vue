<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <b-card>
          <b-card-body>
            <h1>Доска</h1>
            <p>Здесь должны быть графики.</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  created () {
    this.$store.dispatch('init')
  },
  computed: {
    ...mapState({
      data: state => state.conversations
    })
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
