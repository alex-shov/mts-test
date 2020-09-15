export const getVars = (state) => state.vars;

export const getVarsNames = (state) => {
  // Деструктурируем массив и потом формируем массив
  // из названий переменных
  // после проверок на существование массива vars
  const {
    vars: [{
      children,
    }],
  } = state;
  return children && children.length && children.map((variable) => variable.label);
};

export const getDefaultValue = (state) => (selectedVariable) => {
  const variable = state.vars[0].children.filter((el) => el.label === selectedVariable);
  const value = variable && variable[0] && variable[0].defaultValue;

  return value;
};

export const getDescription = (state) => (editNode, editId) => state.vars[0].children
  .filter((el) => el.label === editNode)[0].children
  .filter((el) => el.id === editId)[0].description;

export const isVars = (state) => !!state.vars[0].children.length;

// Проверяем, есть ли среди ранее созданных переменных
// переменная с таким именем, которое присвоили создаваемой переменной
export const isSameVarName = (state) => (createdVariable) => state.vars[0].children
  .some((v) => v.label === createdVariable);

export const getVarsForREPLACE = (state) => {
  const varsLabel = [];
  state.vars[0].children.forEach((el) => {
    if (el.type === 'string') varsLabel.push(el.label);
  });
  return varsLabel;
};

export const getFilters = (state) => state.filter;
