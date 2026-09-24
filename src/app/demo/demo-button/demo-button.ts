import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-demo-button',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './demo-button.html',
  styleUrl: './demo-button.css'
})
export class DemoButtonComponent {}