import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Countries';
  darkMode: boolean = false;
  @HostBinding('class') className: 'lightMode' | 'darkMode' = 'lightMode';

  constructor(private overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.overlay.getContainerElement().classList.add('lightMode');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.className = this.darkMode ? 'darkMode' : 'lightMode';
    if (this.darkMode) {
      this.overlay.getContainerElement().classList.add('darkMode');
      this.overlay.getContainerElement().classList.remove('lightMode');
    } else {
      this.overlay.getContainerElement().classList.add('lightMode');
      this.overlay.getContainerElement().classList.remove('darkMode');
    }
  }
}
