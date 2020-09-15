<template>
<div class="q-gutter-md q-ml-none">

      <q-input
    v-model="substringToReplace"
        filled
        dense
        label="Заменяемая подстрока *"
        hint="Заменяемая подстрока"
        :rules="[ val => val && val.length > 0 || 'Задайте Заменяемая подстроку' ]"
      />

      <q-input
        v-model="replacementSubstring"
        filled
        dense
        label="Замещающая подстрока *"
        hint="Замещающая подстрока"
        :rules="[ val => val && val.length > 0 || 'Задайте замещающую подстроку' ]"
      />

      <q-select
      filled
      dense
      v-model="selectedVariableForREPLACE"
      :options="getVarsReplace"
      label="Выберите переменную типа string *"
      hint="Выберите переменную типа string"
      :rules="[ val => val && val.length > 0 || 'Выберите переменную типа string' ]"
/>
</div>

</template>

<script>
export default {
  name: 'Replace',

  props: {
    getVarsNames: {
      type: Array,
      default: () => ([]),
    },
    getVarsReplace: {
      type: Array,
      default: () => ([]),
    },

  },

  data() {
    return {
      replacementSubstring: '',
      substringToReplace: '',
      selectedVariableForREPLACE: '',
    };
  },

};
</script>
