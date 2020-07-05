const actions: any = {};

export { actions };

export const addActions = (acts: any) => {
  Object.keys(acts).forEach((key) => {
    actions[key] = acts[key];
  });
};
