// modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { StoreModule} from '@ngrx/store';
import { EffectsModule, Actions} from '@ngrx/effects';
import { effects, featureKey, reducer } from './store';

const COMPONENTS = [
  TransactionsComponent, TransferComponent, MainComponent
];

const MODULES = [SharedModule];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
    RouterModule.forChild([{ path: '', component: MainComponent }]),
    EffectsModule.forFeature(effects),
    StoreModule.forFeature(featureKey, reducer)
  ],

  entryComponents: [],
})
export class BackbaseModule {}
