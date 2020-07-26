
import { BackbaseService } from './backbase.service';
import { TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule} from '../../shared/shared.module';

describe('BackbaseService', () => {
  let service: BackbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BackbaseService
      ],
      imports:  [ HttpClientTestingModule, SharedModule]
    });
    service = TestBed.inject(BackbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTransactioons()',  fakeAsync(inject([HttpTestingController, BackbaseService],
    (backend: HttpTestingController, srv: BackbaseService) => {
      const url = 'http://localhost:3000/data';
      let response = null;
      const responseObject = [
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
    ];

      srv.getTransactions().subscribe(transactions => {
        response = transactions;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('GET');
      expect(response).toEqual(responseObject);

  })));

  it('should add new transaction',  fakeAsync(inject([HttpTestingController, BackbaseService],
    (backend: HttpTestingController, srv: BackbaseService) => {
      const url = 'http://localhost:3000/data';
      let response = null;
      const responseObject = {
        "merchant": "test2",
        "amount": "20",
        "transactionDate": 159560592345,
        "transactionType": "Online Transfer",
        "merchantLogo": ""
      };

      const newTrans = {
        "merchant": "test2",
        "amount": "20",
        "transactionDate": 159560592345,
        "transactionType": "Online Transfer",
        "merchantLogo": ""
      };

      srv.addTransaction(newTrans).subscribe(trans => {
        response = trans;
      });

      const requestWrapper = backend.expectOne({url});
      requestWrapper.flush(responseObject);

      tick();

      expect(requestWrapper.request.method).toEqual('POST');
      expect(response).toEqual(responseObject);

  })));

});
