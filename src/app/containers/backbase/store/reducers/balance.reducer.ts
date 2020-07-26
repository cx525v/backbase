import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/balance.actions';
import { BankAccount } from 'src/app/shared/models/account.model';

export interface State {
  val: BankAccount
};

export const initialState: State = {
  val: {
    accountType: 'Free Checking',
    accountLast4: '4692',
    balance: 5824.76
  }
};


const saveBalance = createReducer(
  initialState,
  on(actions.saveBalance, (state, props) => ({
    ...state,
    val: props.val
  }))
);

export function reducer(state: State | undefined, action: Action) {
    return saveBalance(state, action);
}


