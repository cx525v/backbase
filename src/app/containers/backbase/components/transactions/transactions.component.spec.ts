import { TransactionsComponent } from './transactions.component';
import { TestBed, ComponentFixture, inject, async, fakeAsync, tick} from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';

const mockData = [
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

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:  [ SharedModule, BrowserModule,
        BrowserAnimationsModule ,NoopAnimationsModule],
      declarations: [ TransactionsComponent ],
      providers: [
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list transactions', () => {
    component.transactions = mockData;
    component.ngAfterViewInit();
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    const th = table.query(By.css('th'));
    const div = th.query(By.css('div'));
    const btn = div.query(By.css('button')).nativeElement;
    expect(btn.textContent.trim()).toEqual('Transaction Date');

    const trs = table.queryAll(By.css('tr'));
    expect(trs.length).toEqual(3);
  });
  it('should clear filter', () => {
    const searchField =fixture.debugElement.query(By.css('#searchFilter'));
    searchField.nativeElement.value='test';
    fixture.detectChanges();
    const clearFilter = spyOn(component, 'clearSearchField').and.callThrough();
    const btn = fixture.debugElement.query(By.css('#bClear'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(clearFilter).toHaveBeenCalled();
    expect(searchField.nativeElement.value).toEqual('');
  });
  it('should not display clear filter button', () => {
    const btn = fixture.debugElement.query(By.css('#bClear'));
    expect(btn).toBeNull();
  })

  it('should call keyup event', async(() => {
    const event = new KeyboardEvent('keyup', {
      bubbles : true, cancelable : true, shiftKey : false
    });

    component.dataSource = mockData;
    fixture.detectChanges();

    const searchField =fixture.debugElement.query(By.css('#searchFilter'));

    const onFilter = spyOn(component, 'onFilter').and.callThrough();
    searchField.nativeElement.value='test1';
    searchField.nativeElement.dispatchEvent(event);

    fixture.detectChanges();

    expect(onFilter).toHaveBeenCalled();

  }));

  it('should not display transaction without value', ()=> {
    component.transactions = null;
    component.ngAfterViewInit();
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    const th = table.query(By.css('th'));
    const div = th.query(By.css('div'));
    const btn = div.query(By.css('button')).nativeElement;
    expect(btn.textContent.trim()).toEqual('Transaction Date');

    const trs = table.queryAll(By.css('tr'));
    expect(trs.length).toEqual(1);
  });

});
