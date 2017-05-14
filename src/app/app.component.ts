import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCon = false;
  pass: string;
  Exit(): void {
    this.showCon = false;
  }
  Decrypt(): void {
    this.showCon = true;
  }
}
