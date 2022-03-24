import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { countryServiceStub, routerStub } from 'src/app/core/models/model';
import { CountryService } from 'src/app/core/services/country.service';

import { CountryComponent } from './country.component';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let countryService: Partial<CountryService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryComponent],
      providers: [
        {
          provide: CountryService,
          useValue: countryServiceStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    countryService = fixture.debugElement.injector.get(CountryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get country data', () => {
    const countryData = component.getCountryData();
  });
});
