import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { Country } from 'src/app/core/models/model';
import { FetchCountriesActions } from 'store/actions/fetch-countries.action';
import { CountriesSelector } from 'store/selectors/countries.selector';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  country$ = this.store.select(CountriesSelector.selectSelectedCountry);
  isComponentActive = true;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  ngOnInit(): void {
    this.country$
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe((country) => {
        if (!country) {
          this.store.dispatch(
            FetchCountriesActions.fetchCountry({
              name: this.activatedRoute.snapshot.params['name'],
            })
          );
        }
      });
  }

  getLanguages(country: Country): string | null {
    return (
      country?.languages
        .map((lang) => new TitleCasePipe().transform(lang.name))
        .join(',') ?? null
    );
  }

  back() {
    this.router.navigate(['countries']);
  }
}
