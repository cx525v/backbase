import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transfer.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['transactionDate', 'merchantLogo', 'merchant', 'amount'];
  @Input()
  set transactions(val: Transaction[]) {
    if(val) {
      this.dataSource = new MatTableDataSource(val);
      if(this.dataSource) {
        this.dataSource.sort = this.sort;
      }
    }
  }
  dataSource: any;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit (){
    if(this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild('searchField') search: ElementRef;

  onFilter(value: any) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  clearSearchField() {
    this.search.nativeElement.value = '';
    this.dataSource.filter = '';
  }
}
