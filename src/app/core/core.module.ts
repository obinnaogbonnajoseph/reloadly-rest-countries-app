import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CountryComponent } from 'components/country/country.component';
import { countriesFeature } from 'store/feature/country.feature';
import { EffectsModule } from '@ngrx/effects';
import { CountriesEffects } from 'store/effects/countries.effects';
import { CountriesComponent } from './components/countries/countries.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesComponent,
  },
  {
    path: 'country/:name',
    component: CountryComponent,
  },
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/countries',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [CountryComponent, CountriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(countriesFeature),
    EffectsModule.forFeature([CountriesEffects]),
  ],
})
export class CoreModule {}
