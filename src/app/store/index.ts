import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

// * Application Root State
export interface AppState {
  router: fromRouter.RouterReducerState<any>;
}

// * State composed of a map of action reducer functions.
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers', {
  factory: /* istanbul ignore next */ () => ({
    router: fromRouter.routerReducer
  })
});

// * Selectors
export const selectReducerState = createFeatureSelector<fromRouter.RouterReducerState>('router');
export const getRouterInfo = createSelector(
  selectReducerState,
  state => state.state
);
