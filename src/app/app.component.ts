//import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

//@Component({
 // selector: 'app-root',
 // imports: [RouterOutlet],
  //templateUrl: './app.component.html',
 // styleUrl: './app.component.css'
//})
//export class AppComponent {
  //title = 'trabalho';
//}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
