import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CountryComponent } from 'components/country/country.component';
import { countriesFeature } from 'store/feature/country.feature';

@NgModule({
  declarations: [CountryComponent],
  imports: [CommonModule, StoreModule.forFeature(countriesFeature)],
})
export class CoreModule {}
