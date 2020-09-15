<template>
  <div class="q-pa-md">
    <q-btn
    label="Действия с переменными"
    color="secondary"
    class="glossy"
    rounded
    :disable="!isVars"
    @click="card = true"

    />

<q-dialog v-model="card" persistent>
      <q-card class="my-card">

        <q-card-section class="q-gutter-md q-pa-lg">
          <q-form
          @submit="setAction"
          class="q-gutter-md">

          <span class="text-h6 text-weight-light text-uppercase">
            Действия с переменными
          </span>

      <q-select
      autofocus
      filled
      dense
      v-model="action"
      :options="options"
      label="Действие с переменной *"
      hint="Выберите действие с переменной"
      :rules="[ val => val && val.length > 0 || 'Выберите действие с переменной' ]"
/>

<q-select
      filled
      dense
      v-model="selectedVariable"
      @input="setVariable"
      :options="this.action === 'REPLACE' ? getVarsReplace : getVarsNames"
      label="Выберите переменную *"
      hint="Выберите переменную"
      :rules="[ val => val && val.length > 0 || 'Выберите переменную' ]"
/>

<component
:is="showWhich"
:getVarsNames="getVarsNames"
:getVarsReplace="getVarsReplace"
@setNewDefaultValue="setNewValue"
/>

      <q-input
        filled
        clearable
        dense
        v-model="description"
        label="Описание действия"
        hint="Описание действия"
      />

        <q-separator />

        <div>

          <q-btn
          v-close-popup
          color="red"
          :label="cancelBtn"
          class="q-mr-md"
          @click="cancel"
          />

          <q-btn
          type="submit"
          color="secondary"
          label="Реализовать"
          icon-right="send"
          />

          </div>
          </q-form>
        </q-card-section>
  </q-card>
</q-dialog>

  </div>
</template>

<script>
import { uid } from 'quasar';
import { mapGetters } from 'vuex';
import Bitwise from './actions/Bitwise.vue';
import Replace from './actions/Replace.vue';
import Set from './actions/Set.vue';

export default {
  name: 'Actions',

  components: {
    Set,
    Bitwise,
    Replace,
  },

  data() {
    return {
      card: false,
      action: '',
      selectedVariable: '',
      selectedVariableForREPLACE: '',
      vol: '',
      cancelBtn: 'Отменить',
      newVal: '',
      options: ['SET', 'BITWISE', 'REPLACE'],

      description: '',
    };
  },
  methods: {
    setNewValue(val) {
      this.newVal = val;
    },

    setVariable(name) {
      const value = this.getDefaultValue(name);
      this.$store.commit('moduleCommon/SET_DEFAULT_VALUE', value);
    },

    setAction() {
      this.$store.commit('moduleCommon/SET_NEW_VALUE', {
        selectedVariable: this.selectedVariable,
        newVal: this.newVal,
        id: uid(),
      });
      this.$store.commit('moduleCommon/SET_ACTION_IN_LIST',
        {
          selectedVariable: this.selectedVariable,
          action: this.action,
          description: this.description,
          id: uid(),
        });
      this.card = false;
      this.cancelBtn = 'Закрыть';
      this.cancel();
    },
    cancel() {
      this.action = '';
      this.selectedVariable = '';
      this.defaultValue = '';
      this.description = '';
      this.selectedShiftType = '';
      this.mask = '';
      this.selectedVariableForBITSE = '';
      this.selectedVariableForREPLACE = '';
      this.$store.commit('moduleCommon/CLEAR_DEFAULT_VALUE');
    },
    setNewDefaultValue(value) {
      this.defaultValue = value;
    },
  },

  computed: {
    ...mapGetters('moduleCommon', ['getVarsNames', 'isVars', 'getVars', 'getDefaultValue']),

    getVarsReplace() {
      return this.$store.getters['moduleCommon/getVarsForREPLACE'];
    },

    showWhich() {
      if (this.action === 'SET') {
        return 'Set';
      } if (this.action === 'BITWISE') {
        return 'Bitwise';
      } if (this.action === 'REPLACE') {
        return 'Replace';
      }
      return null;
    },

  },

};
</script>
