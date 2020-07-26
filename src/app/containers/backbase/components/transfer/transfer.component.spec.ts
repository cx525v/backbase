import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import { BankAccount } from 'src/app/shared/models/account.model';
import { By, BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferComponent ],
      imports:  [SharedModule, BrowserAnimationsModule,NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set bankaccount value', ()=> {
    const account: BankAccount = {
      accountType: 'test type',
      accountLast4: 'test',
      balance: 1
   }
   component.bankAccount = account;

   expect(component.account.accountLast4).toEqual(account.accountLast4);
   expect(component.account.accountType).toEqual(account.accountType);
   expect(component.account.balance).toEqual(account.balance);
  });

  it('should set bankaccount initial value', ()=> {

   component.bankAccount = null;
   expect(component.account.accountLast4).toEqual('');
   expect(component.account.accountType).toEqual('');
   expect(component.account.balance).toEqual(0);
  });

  it('should validate transfer amount -- invalid', ()=> {
    const account: BankAccount = {
      accountType: 'test type',
      accountLast4: 'test',
      balance: 1
   }
   component.bankAccount = account;
   fixture.detectChanges();

   const e:Event = document.createEvent('Event');
   e.initEvent('input', false, false);

   const toAccount =fixture.debugElement.query(By.css('#toAccountInput'));
   toAccount.nativeElement.value = 'test account';
   toAccount.nativeElement.dispatchEvent(e);

    const amount = fixture.debugElement.query(By.css('#inputAmount'));
    amount.nativeElement.value='0';
    amount.nativeElement.dispatchEvent(e);

    fixture.detectChanges();

    expect(component.transferForm.invalid).toBeTrue();

  });

  it('should transfer amount', async(()=> {
      const account: BankAccount = {
        accountType: 'test type',
        accountLast4: 'test',
        balance: 100
     }
     component.bankAccount = account;
     fixture.detectChanges();

     const e:Event = document.createEvent('Event');
     e.initEvent('input', false, false);

     const toAccount =fixture.debugElement.query(By.css('#toAccountInput'));
     toAccount.nativeElement.value = 'test account';
     toAccount.nativeElement.dispatchEvent(e);

      const amount = fixture.debugElement.query(By.css('#inputAmount'));
      amount.nativeElement.value= 20;
      amount.nativeElement.dispatchEvent(e);
      fixture.detectChanges();

      const spy = spyOn(component, 'transfer').and.callThrough();

      const bSubmit = fixture.debugElement.query(By.css('#bSubmit'));
      bSubmit.nativeElement.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();

    }));

    it('should not transfer - over balance', async(()=> {
      const account: BankAccount = {
        accountType: 'test type',
        accountLast4: 'test',
        balance: 100
     }
     component.bankAccount = account;
     fixture.detectChanges();

     const e:Event = document.createEvent('Event');
     e.initEvent('input', false, false);

     const toAccount =fixture.debugElement.query(By.css('#toAccountInput'));
     toAccount.nativeElement.value = 'test account';
     toAccount.nativeElement.dispatchEvent(e);

      const amount = fixture.debugElement.query(By.css('#inputAmount'));
      amount.nativeElement.value= 200;
      amount.nativeElement.dispatchEvent(e);
      fixture.detectChanges();

       const amountError = fixture.debugElement.query(By.css('#amountError'));
       console.log(amountError.nativeElement.textContent);

       expect(amountError.nativeElement.textContent.trim()).toEqual('Amount is over balance');

    }));

});
