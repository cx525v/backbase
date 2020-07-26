import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/balance.actions';
import * as reducer from './balance.reducer';
import { BankAccount } from 'src/app/shared/models/account.model';

describe('balance reducer', () => {
  it('should reducer save bank account', () => {
    const account: BankAccount = {
      accountType: 'test type',
      accountLast4: 'test',
      balance: 1
   }

    const action = actions.saveBalance({val: account});
    const state = reducer.reducer(reducer.initialState, action);

    expect(state.val.accountLast4).toEqual(account.accountLast4);
    expect(state.val.accountType).toEqual(account.accountType);
    expect(state.val.balance).toEqual(account.balance);
  });
});
