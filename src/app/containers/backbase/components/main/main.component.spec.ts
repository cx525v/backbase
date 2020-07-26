import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { TransferComponent } from '../transfer/transfer.component';
import { BackbaseService } from 'src/app/shared/services/backbase.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BankAccount } from 'src/app/shared/models/account.model';
import * as action from '../../store/actions/balance.actions';
import { BrowserModule, By } from '@angular/platform-browser';


const mockTransactions = [
  {
    "merchant": "test1",
    "amount": "10",
    "transactionDate": 1595605913915,
    "transactionType": "Online Transfer",
    "merchantLogo": ""
  },
  {
    "merchant": "test2",
    "amount": "20",
    "transactionDate": 159560592345,
    "transactionType": "Online Transfer",
    "merchantLogo": ""
  },
]

@Injectable()
export class MockService extends BackbaseService {
  getTransactions() {
    return of(mockTransactions);
   }
   addTransaction<Transaction>(trans: Transaction) {
    return of(mockTransactions[0]);
   }
}

const account: BankAccount = {
  accountType: 'test type',
  accountLast4: 'test',
  balance: 1
}

@Injectable()
export class StoreMock {
  pipe = jasmine.createSpy();
  select =  jasmine.createSpy().and.returnValue(of({account}));
  dispatch = () => action.saveBalance({val: account});
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, TransactionsComponent,TransferComponent ],
      imports:  [ HttpClientTestingModule, SharedModule, BrowserModule,
        BrowserAnimationsModule ,NoopAnimationsModule],

      providers: [

        { provide: Store, useClass: StoreMock },
        { provide: BackbaseService, useClass: MockService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscibe', () => {
   component.ngOnDestroy();
   fixture.detectChanges();
   expect(component.bankAccountValue$.closed).toBeTruthy();
  });

  it('should transfer', ()=> {
    spyOn(component, 'transfer').and.callThrough();
    const transfer = fixture.debugElement.query(By.css('app-transfer'));
    transfer.triggerEventHandler('onTransfer', {});
    fixture.detectChanges();

    expect(component.transfer).toHaveBeenCalled();
  });
});
