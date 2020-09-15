import { uid } from 'quasar';

export default function () {
  return {
    vars: [{
      label: 'ПЕРЕМЕННЫЕ И ДЕЙСТВИЯ',
      children: [],
      id: uid(),
      // Добавили type, чтобы скрыть отображение значков действий
      type: 'none',
    }],
    defaultValue: null,
    filter: '',
  };
}
