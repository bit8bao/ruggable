/* eslint-disable */
import { useState, useMemo } from 'react';

export const defaultState: any = {};

const defaultReducer = (old: any, newState: any) => newState;

export const useTableState = (initialState = {}, overrides = {}, { reducer = defaultReducer, useState: userUseState = useState } = {}) => {
  const [state, setState] = userUseState({
    ...defaultState,
    ...initialState,
  });

  const overriddenState = useMemo(() => {
    const newState = {
      ...state,
    };
    Object.keys(overrides).forEach((key) => {
      newState[key] = overrides[key];
    });

    return newState;
  }, [state, ...Object.values(overrides)]);

  const reducedSetState = (updater: any, type: any) =>
    setState((old: any) => {
      const newState = updater(old);

      return reducer(old, newState /*, type*/);
    });

  return [overriddenState, reducedSetState];
};
