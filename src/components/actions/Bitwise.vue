<template>
<div class="q-gutter-md q-ml-none">

<q-select
      filled
      dense
      :options="shiftType"
      v-model="selectedShiftType"
      label="Тип сдвига *"
      hint="Выберите тип сдвига"
      :rules="[ val => val && val.length > 0 || 'Выберите тип сдвига' ]"
/>

<q-input
v-model="mask"
        filled
        dense
        label="Маска *"
        hint="Присвоить значение"
        :rules="[ val => val && val.length > 0 ||  'Задайте маску',
        val => /^[A-F0-9]+$/.test(val) || 'Только 16-ричный формат' ]"
        @input="setUpperCase"
      />

      <q-select
      filled
      dense
      v-model="selectedVariableForBITSE"
      :options="getVarsNames"
      label="Выберите результирующую переменную *"
      hint="Выберите результирующую переменную"
      :rules="[ val => val && val.length > 0 || 'Выберите результирующую переменную' ]"
/>
</div>
</template>

<script>
export default {
  name: 'Bitwise',

  props: {
    getVarsNames: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      selectedShiftType: '',
      mask: '',
      selectedVariableForBITSE: '',
      shiftType: ['AND', 'OR', 'XOR'],
    };
  },

  methods: {
    setUpperCase(value) {
      this.mask = value.toUpperCase();
    },
  },

};
</script>
