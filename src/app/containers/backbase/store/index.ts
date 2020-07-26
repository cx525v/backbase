import { Action, ActionReducerMap } from '@ngrx/store';

import * as saveReducer from './reducers/balance.reducer';

export const featureKey = 'balance';

export interface State {
    save: saveReducer.State;
}

export const reducer: ActionReducerMap<State, Action> = {
    save: saveReducer.reducer
};

export const effects = [
];
