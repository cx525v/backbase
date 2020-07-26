import { createAction, props } from '@ngrx/store';
import { BankAccount } from 'src/app/shared/models/account.model';

export const saveBalance = createAction(
    '[Save] Save Balance',
    props<{ val: BankAccount}>()
  );
