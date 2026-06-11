import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleBarComponent } from './components/title-bar/title-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
