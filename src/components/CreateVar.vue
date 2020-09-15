<template>
  <div class="q-pa-md">

    <q-btn
    label="Создать переменную"
    color="secondary"
    class="glossy"
    rounded
    @click="card = true" />

    <q-dialog v-model="card" persistent>
<q-card square bordered class="q-pa-sm shadow-1">
  <q-card-section>
          <q-form
      class="q-gutter-md"
      @submit="create"
    >
          <span class="text-h6 text-weight-light text-uppercase">
            Содание переменной
          </span>

          <q-input
        filled
        clearable
        v-model="name"
        label="Имя переменной *"
        hint="Английские буквы и знак подчёркивания"
        :rules="[ val => val && val.length > 0 || 'Введите имя переменной',
        val => /^[a-zA-Z_]+$/.test(val) || 'Допустимы лишь английские буквы и _',
        val => val.length < 100 || 'Слишком длинное имя переменной'
        ]"
      />

      <q-select
      filled
      dense
      v-model="type"
      :options="options"
      label="Тип переменной *"
      hint="Задайте тип переменной"
      :rules="[ val => val && val.length > 0 || 'Выберите тип переменной' ]"
/>

      <q-input v-if="this.type === 'byte'"
        filled
        dense
        type="number"
        v-model="size"
        label="Размер"
        hint="Не более 3"
        :rules="[ val => val <= 3 || 'Тип byte не больше 3 знаков',
        val => val > 0 || val.length === 0 || 'Отрицательные значения и 0 недопустимы'
         ]"
      />

      <q-input v-if="this.type === 'double'"
        filled
        dense
        type="number"
        v-model="size"
        label="Размер"
        hint="Размер"
        :rules="[ val => val > 0 || val.length === 0 || 'Отрицательные значения и 0 недопустимы' ]"
      />

      <q-input v-if="this.type === 'integer'"
        filled
        dense
        type="number"
        v-model="size"
        label="Размер"
        hint="Не более 10"
        :rules="[ val => val <= 10 || 'Тип byte не больше 10 знаков',
        val => val > 0 || val.length === 0 || 'Отрицательные значения и 0 недопустимы'
         ]"
      />

      <q-input v-if="this.type === 'long'"
        filled
        dense
        type="number"
        v-model="size"
        label="Размер"
        hint="Не более 19"
        :rules="[ val => val <= 19 || 'Тип byte не больше 19 знаков',
        val => val > 0 || val.length === 0 || 'Отрицательные значения и 0 недопустимы'
         ]"
      />

      <q-input v-if="this.type === 'string'"
        filled
        dense
        type="number"
        v-model="size"
        label="Размер"
        hint="Длина строки"
      />

<q-select v-if="this.type === 'boolean'"
      filled
      dense
      clearable
      v-model="defaultValue"
      :options="booleanOptions"
      label="Значение по умолчанию"
      hint="Значение переменной"
/>

      <q-input v-if="this.type === 'byte'"
        filled
        dense
        clearable
        v-model="defaultValue"
        :maxlength = "size"
        label="Значение по умолчанию"
        :hint="defaultValueHint"
        :rules="[ val => val >= -128
        && val <= 127
        && Number.isInteger(Number(val)) || 'Должно быть целое число от -128 до 127' ]"
      />

        <q-input v-if="this.type === 'double'"
        filled
        dense
        clearable
        v-model="defaultValue"
        label="Значение по умолчанию"
        :hint="defaultValueHint"
        :maxlength = "size"
        :rules="[ val => Number(val) || !isNaN(Number(val))  || 'Введите вещественное число']"
      />

        <q-input v-if="this.type === 'integer'"
        filled
        dense
        clearable
        v-model="defaultValue"
        :maxlength = "size"
        label="Значение по умолчанию"
        :hint="defaultValueHint"
        :rules="[ val => val >= -2147483648
        && val <= 2147483647
        && Number.isInteger(Number(val))
        || 'Должно быть целое число от -2147483648 до 2147483647' ]"
      />

      <q-input v-if="this.type === 'long'"
        filled
        dense
        clearable
        v-model="defaultValue"
        :maxlength = "size"
        label="Значение по умолчанию"
        :hint="defaultValueHint"
        :rules="[ val => val >= -9223372036854775808
        && val <= 9223372036854775807
        && Number.isInteger(Number(val))
        || 'Должно быть целое число от -9223372036854775808 до 9223372036854775807' ]"
      />

      <q-input v-if="this.type === 'string'"
        filled
        dense
        clearable
        v-model="defaultValue"
        :maxlength = "size"
        label="Значение по умолчанию"
        :hint="defaultValueHint"

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
          dense
          color="red"
          label="Отменить"
          class="q-mr-md"
          @click="cancel" />

          <q-btn
          type="submit"
          color="secondary"
          label="Создать"
          icon-right="send"
          dense
          :disable="disableCreateBtn"
          />
</div>
</q-form>
</q-card-section>
</q-card>
    </q-dialog>

<q-dialog v-model="secondCreateDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white q-pt-lg">
        <q-card-section class="q-pt-none">
          Переменная с таким именем в данном скоупе уже есть. <br>
          Пожалуйста, выберите другое имя для переменной.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>

</template>

<script>
import { uid } from 'quasar';

export default {
  name: 'CreateVar',
  data() {
    return {
      card: false,
      secondCreateDialog: false,
      name: '',
      type: null,
      size: '',
      disableSize: false,
      defaultValue: '',
      options: ['boolean', 'byte', 'double', 'integer', 'long', 'string'],
      booleanOptions: ['true', 'false'],
      description: '',
      defaultValueHint: 'Значение переменной',
    };
  },
  computed: {
    disableCreateBtn() {
      return !(this.name && /^[a-zA-Z_]+$/.test(this.name) && this.type);
    },
  },
  methods: {
    create() {
      if (this.$store.getters['moduleCommon/isSameVarName'](this.name)) {
        this.card = true;
        this.secondCreateDialog = true;
      } else {
        const vars = {
          label: this.name,
          type: this.type,
          size: this.size,
          defaultValue: this.defaultValue,
          id: uid(),

          children: [{
            label: 'CREATE', body: 'description', description: this.description, id: Date.now(),
          },
          { label: 'NEXT' },
          ],
        };
        this.$store.commit('moduleCommon/SET_VAR', vars);
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Переменная создана',
          position: 'bottom-right',
        });

        this.card = false;
        this.cancel();
      }
    },
    cancel() {
      this.name = '';
      this.size = '';
      this.type = '';
      this.defaultValue = '';
      this.description = '';
    },
  },

};
</script>
