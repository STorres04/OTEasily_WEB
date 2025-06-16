import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  @Output() homeClicked = new EventEmitter<void>();

  navigateToLogin() {
    this.homeClicked.emit();
  }
}
