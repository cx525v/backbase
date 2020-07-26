import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../models/transfer.model';

const API_URL = 'http://localhost:3000/data';
const HEADER_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BackbaseService {

  constructor(private http: HttpClient) {

  }
  getTransactions() {
    return this.http.get<Transaction[]>(`${API_URL}`);

   }

  addTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(`${API_URL}`, transaction, HEADER_OPTIONS);
  }

}
