import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Countries';
  darkMode: boolean = false;
  @HostBinding('class') className: 'lightMode' | 'darkMode' = 'lightMode';

  constructor(private overlay: OverlayContainer) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.className = this.darkMode ? 'darkMode' : 'lightMode';
    if (this.darkMode) {
      this.overlay.getContainerElement().classList.add('darkMode');
    } else this.overlay.getContainerElement().classList.remove('darkMode');
  }
}
