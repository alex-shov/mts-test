<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>

      <q-toolbar>
        <q-toolbar-title class="text-center">
          Список переменных и действий
        </q-toolbar-title>

      </q-toolbar>
      <q-toolbar inset>
        <span class="q-mr-sm"><CreateVar /></span>
        <Actions />
        <q-space />
 <q-input
      bottom-slots
      standout="bg-secondary"
      label="Поиск по действиям..."
      v-model="filter"
      dense
      rounded
      bg-color="white"
      label-color="black"
      color="black"
      >
        <template v-slot:append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import CreateVar from 'components/CreateVar.vue';
import Actions from 'components/Actions.vue';

export default {

  name: 'MainLayout',
  components: { Actions, CreateVar },
  data() {
    return {
      leftDrawerOpen: false,
      filter: '',
    };
  },
  watch: {
    filter() {
      this.$store.commit('moduleCommon/SET_FILTER',
        {
          value: this.filter,
        });
    },
  },
};
</script>
