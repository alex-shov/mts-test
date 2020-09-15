<template>
<div>

      <q-input
      :value="value"
        filled
        dense
        label="Значение *"
        hint="Присвоить значение"
        @input="setNewValue"
        :rules="[ val => val && val.length > 0 || 'Присвойте значение переменной' ]"
        />

</div>

</template>

<script>
export default {
  name: 'Set',

  data() {
    return {
      value: '',
    };
  },
  methods: {
    setNewValue(value) {
      this.value = value;
      this.$emit('setNewDefaultValue', value);
    },
  },

  computed: {
    defaultValue() {
      return this.$store.state.moduleCommon.defaultValue;
    },
  },

  watch: {
    defaultValue(val) {
      this.value = val;
    },
  },

};
</script>
