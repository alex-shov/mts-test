<template>
<div>
  <q-tree
      ref="tree"
      :nodes="getVars"
      node-key="id"
      :filter="getFilters"
      no-results-label="Соответствий не найдено"
      default-expand-all
    >

    <template v-slot:default-header="scope">
      <span>{{ scope.node.label }}</span>
      <span v-if="scope.node.label !== 'NEXT'
      && !scope.node.type">
      <span v-if="scope.node.label !== 'CREATE'">
        <q-btn
        icon="edit"
        class="q-mx-sm"
        padding="xs"
        outline
        @click.prevent.stop="edit(scope.node.id, scope.tree)"
        >
        <q-tooltip>
          Редактировать действие
        </q-tooltip>
        </q-btn>

        <q-btn
        icon="mdi-arrow-up"
        outline
        class="q-mx-sm"
        padding="xs"
        @click.prevent.stop="up(scope.node.label, scope.node.id, scope.tree)"
        >
        <q-tooltip>
          Переместить действие вверх
        </q-tooltip>
        </q-btn>

        <q-btn
        icon="mdi-arrow-down"
        outline
        class="q-mx-sm"
        padding="xs"
        @click.prevent.stop="down(scope.node.label, scope.node.id, scope.tree)"
        >
        <q-tooltip>
          Переместить действие вниз
        </q-tooltip>
        </q-btn>
        </span>

        <q-btn
        icon="mdi-delete"
        outline
        class="q-mx-sm"
        padding="xs"
        @click.prevent.stop="remove(scope.node.label, scope.node.id, scope.tree)"
        >
        <q-tooltip>
          Удалить действие
        </q-tooltip>
        </q-btn>
        </span>
     </template>

     <template v-slot:default-body="scope">
        <div v-if="scope.node.description">
          <span class="text-weight-bold">Описание</span>: {{ scope.node.description }}
        </div>
      </template>

  </q-tree>

  <q-dialog v-model="removeVar" persistent>
      <q-card class="bg-negative text-white q-pt-lg">
        <q-card-section class="q-pt-none">
          При удалении действия CREATE удалятся все прочие действия с этой переменной
          и, соответственно, сама эта переменная. <br>
          Вы согласны?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Нет"
          v-close-popup
          />
          <q-btn flat label="OK"
          v-close-popup
          @click="removeConfirm = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <q-dialog v-model="removeAction" persistent>
      <q-card class="bg-negative text-white q-pt-lg" style="width: 500px">
        <q-card-section class="q-pt-none">
          Действие будет удалено. <br>
          Вы согласны?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Нет"
          v-close-popup
          />
          <q-btn flat label="OK"
          @click="removeConfirmAction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

      <q-dialog v-model="editAction" persistent>
      <q-card class="my-card">
        <q-card-section class="q-gutter-md q-pa-lg">
          <div class="text-h6">Редактирование действия</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
      <q-input
        filled
        dense
        label="Описание действия"
        hint="Описание действия"
        @input="setNewDescription"
        :value="description"
      />
       </q-card-section>
        <q-separator />
<q-card-actions align="right">
          <q-btn
          v-close-popup
          dense
          color="red"
          label="Отменить"
          class="q-mr-md"
          />

         <q-btn
          color="secondary"
          label="Изменить"
          icon-right="edit"
          dense
          @click="editDescription"
          />
</q-card-actions>

      </q-card>
    </q-dialog>

</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Variable',

  props: {
    vars: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      removeVar: false,
      removeAction: false,
      removeConfirm: null,
      removeNode: null,
      editAction: false,
      editId: null,
      editNode: null,
      description: '',
      newDescription: '',
      selectedVar: null,
      selectedAction: '',
      selectedId: '',
      filter: '',
    };
  },

  computed: {
    ...mapGetters('moduleCommon', ['getVars', 'getDescription', 'getFilters', 'getVarsNames']),

  },

  methods: {
    remove(action, id, tree) {
      this.selectedVar = tree.nodes[0].children
        .filter((node) => node.children.some((el) => el.id === id))[0].label;
      this.selectedAction = action;
      this.selectedId = id;

      if (action === 'CREATE') {
        this.removeVar = true;
      } else {
        this.removeAction = true;
      }
    },
    removeConfirmAction() {
      this.$store.commit('moduleCommon/REMOVE_ACTION_IN_LIST', {
        id: this.selectedId,
        varName: this.selectedVar,
      });
      this.removeAction = false;
    },

    edit(id, tree) {
      this.editAction = true;
      this.editNode = tree.nodes[0].children
        .filter((node) => node.children.some((el) => el.id === id))[0].label;
      this.editId = id;
      this.description = this.$store.getters['moduleCommon/getDescription'](this.editNode, this.editId);
    },
    editDescription() {
      this.$store.commit('moduleCommon/SET_NEW_DESCRIPTION',
        {
          editNode: this.editNode,
          editId: this.editId,
          description: this.newDescription,
        });
      this.editAction = false;
    },
    setNewDescription(val) {
      this.newDescription = val;
    },
    up(label, id, tree) {
      this.selectedVar = tree.nodes[0].children
        .filter((node) => node.children.some((el) => el.id === id))[0].label;

      this.$store.commit('moduleCommon/UP_ACTION',
        {
          selectedVar: this.selectedVar, id,
        });
    },

    down(label, id, tree) {
      this.selectedVar = tree.nodes[0].children
        .filter((node) => node.children.some((el) => el.id === id))[0].label;

      this.$store.commit('moduleCommon/DOWN_ACTION',
        {
          selectedVar: this.selectedVar, id,
        });
    },

  },
  watch: {
    removeConfirm() {
      if (this.removeConfirm) {
        this.$store.commit('moduleCommon/REMOVE_VAR_IN_LIST', { varName: this.selectedVar });
        this.removeConfirm = false;
      }
    },
    // Пусть будут раскрыты ноды вновь создаваемых узлов
    getVarsNames() {
      this.$refs.tree.expandAll();
    },
  },
};
</script>
