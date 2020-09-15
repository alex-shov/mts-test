<template>
  <q-page class="flex flex-center">

<div>

  <div v-if="getVars[0].children.length === 0"
    style="text-align: center; font-size: 18px;">
    Чтобы создать переменные, <br> нажмите кнопку "Создать переменную"
  </div>
  <div v-else><Variables /></div>

<!-- https://ru.vuejs.org/v2/guide/list.html -->
  </div>

  </q-page>
</template>

<script>
import Variables from 'components/Variables.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  components: {
    Variables,
  },

  data() {
    return {
      filter: '',
    };
  },

  computed: {
    ...mapGetters('moduleCommon', ['getVars']),
  },

  methods: {
    resetFilter() {
      this.filter = '';
      this.$refs.filter.focus();
    },
  },
};
</script>
