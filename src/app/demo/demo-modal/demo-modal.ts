import { Component } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal';
import { ButtonComponent } from '../../components/button/button';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './demo-modal.html',
  styleUrl: './demo-modal.css'
})
export class DemoModalComponent {
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
