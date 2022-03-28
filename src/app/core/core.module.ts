import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountryComponent } from 'components/country/country.component';
import { CountriesEffects } from 'store/effects/countries.effects';
import { countriesFeature } from 'store/feature/country.feature';
import { CountriesComponent } from './components/countries/countries.component';

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
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class CoreModule {}
