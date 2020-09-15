export function SET_VAR(state, newVar) {
  state.vars[0].children.push(newVar);
}

export function SET_ACTION_IN_LIST(state, payload) {
  const {
    selectedVariable,
    action,
    description,
    id,
  } = payload;
  state.vars[0].children.filter((el) => el.label === selectedVariable)[0]
    .children.splice(-1, 0, {
      label: action,
      description,
      id,
    });
}

/// Устанавливаем новое значение описания действия
export function SET_NEW_DESCRIPTION(state, payload) {
  const {
    editNode,
    editId,
    description,
  } = payload;
  const node = state.vars[0].children.filter((el) => el.label === editNode);
  const editAction = node[0].children.filter((el) => el.id === editId);
  editAction[0].description = description;
}

export function SET_NEW_VALUE(state, payload) {
  const {
    selectedVariable,
    newVal,
  } = payload;
  state.vars[0].children.filter((el) => el.label === selectedVariable)[0].defaultValue = newVal;
}

export function SET_DEFAULT_VALUE(state, value) {
  state.defaultValue = value;
}

export function CLEAR_DEFAULT_VALUE(state) {
  state.defaultValue = null;
}

export function SET_NEW_VALUE_AS_DEFAULT_VALUE(state, value) {
  state.defaultValue = value;
}

export function REMOVE_ACTION_IN_LIST(state, payload) {
  const {
    id,
    varName,
  } = payload;

  const actionsArray = state.vars[0].children
    .filter((v) => v.label === varName)[0].children;
  const elemIndex = actionsArray.findIndex((el) => el.id === id);
  actionsArray.splice(elemIndex, 1);
}

export function REMOVE_VAR_IN_LIST(state, payload) {
  const {
    varName,
  } = payload;

  const varsArray = state.vars[0].children;
  const elemIndex = varsArray.findIndex((el) => el.label === varName);
  varsArray.splice(elemIndex, 1);
}

function changePlacesInArr(arr, param) {
  /*
      коррекция  элементов массива по паре индексов элементов
      * arr - массив, требующий коррекции
      * param - пара [n1,n2] - индексы массива для взаимной перестановки
  */
  const [first, second] = param;
  // eslint-disable-next-line
  arr[second] = arr.splice(first, 1, arr[second])[0];
}

export function UP_ACTION(state, payload) {
  const {
    selectedVar,
    id,
  } = payload;
  const selVar = state.vars[0].children
    .filter((el) => el.label === selectedVar);

  const elemIndex = selVar[0].children.findIndex((el) => el.id === id);
  if (elemIndex > 1) {
    changePlacesInArr(selVar[0].children, [elemIndex - 1, elemIndex]);
  }
}

export function DOWN_ACTION(state, payload) {
  const {
    selectedVar,
    id,
  } = payload;
  const selVar = state.vars[0].children
    .filter((el) => el.label === selectedVar);

  const elemIndex = selVar[0].children.findIndex((el) => el.id === id);
  if (elemIndex < selVar[0].children.length - 2) {
    changePlacesInArr(selVar[0].children, [elemIndex, elemIndex + 1]);
  }
}

export function SET_FILTER(state, val) {
  const {
    value,
  } = val;
  state.filter = value;
}
