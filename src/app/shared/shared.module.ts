import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatCommonModule, MatOptionModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export const CORE_MODULES = [HttpClientModule, CommonModule, RouterModule];

export const FORMS_MODULES = [FormsModule, ReactiveFormsModule];

export const MATERIAL_MODULES = [
  MatTableModule,
  MatCommonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule,
  MatRadioModule,
  MatOptionModule,
  MatSortModule
];


export const DEFAULT_IMPORTS = [
  ...CORE_MODULES,
  ...FORMS_MODULES,
  ...MATERIAL_MODULES,
];


export const DIRECTIVES = [

];

export const PROVIDERS = [HttpClient];

export const MODALS = [];

export const PIPES = [];

@NgModule({
  imports: [...DEFAULT_IMPORTS],
  providers: [...PROVIDERS],
  declarations: [...DIRECTIVES, ...PIPES, ...MODALS],
  entryComponents: [...MODALS],
  exports: [
    ...DEFAULT_IMPORTS
  ],
})
export class SharedModule {}
