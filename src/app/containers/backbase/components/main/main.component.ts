import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackbaseService } from 'src/app/shared/services/backbase.service';
import { Transaction } from 'src/app/shared/models/transfer.model';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { State } from '../../store';
import * as selectors from '../../store/selectors/selectors';
import * as action from '../../store/actions/balance.actions';
import { BankAccount } from 'src/app/shared/models/account.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {

  bankAccountValue$: Subscription;

  transactions: Transaction[];

  bankAccount: BankAccount;

  constructor(private service: BackbaseService, private store: Store<State>) { }
  ngOnDestroy(): void {
    this.bankAccountValue$.unsubscribe();
  }

  ngOnInit(): void {
    this.getTransactions();

    this.bankAccountValue$ = this.store.select(selectors.balanceSelector).subscribe(
      x=> {
        this.bankAccount = x;
        console.log(x);
      }
    );
  }



  getTransactions() {
    this.transactions = [];
    this.service.getTransactions().subscribe((trs: Transaction[]) => {
    this.transactions = trs;
    });
  }

  transfer(val: any) {
    const trans: Transaction = {
      transactionDate: val.transactionDate,
      transactionType: val.transactionType,
      merchant: val.merchant,
      merchantLogo: val.merchantLogo,
      amount: val.amount
    };

    this.service.addTransaction(trans).subscribe(res => {

      this.getTransactions();

      const newBalance = this.bankAccount.balance - Number(val.amount);

      const newAccount: BankAccount = {
         accountType: this.bankAccount.accountType,
         accountLast4: this.bankAccount.accountLast4,
         balance: newBalance
      }

      this.store.dispatch(action.saveBalance({val: newAccount}));

    });
  }
}
