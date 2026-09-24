import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class ButtonComponent {

  @Input() label = 'Button';

  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  @Input() disabled = false;

}