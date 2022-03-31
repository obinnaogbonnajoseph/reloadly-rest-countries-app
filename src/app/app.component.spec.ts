import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add lightmode on ngOnInit', () => {
    component.ngOnInit();
    const hasLightMode = component.overlay
      .getContainerElement()
      .classList.contains('lightMode');
    expect(hasLightMode).toBeTrue();
  });

  it(`should have as title 'Countries'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Countries');
  });

  it('should toggle dark mode', () => {
    component.toggleDarkMode();
    const hasDarkMode = component.overlay
      .getContainerElement()
      .classList.contains('darkMode');
    expect(component.darkMode).toEqual(true);
    expect(hasDarkMode).toBeTrue();
  });

  it('should toggle to light mode', () => {
    component.darkMode = true;
    component.toggleDarkMode();
    const hasLightMode = component.overlay
      .getContainerElement()
      .classList.contains('lightMode');
    expect(component.darkMode).toBeFalse();
    expect(hasLightMode).toBeTrue();
  });
});
