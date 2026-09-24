import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { expect } from 'storybook/test';

import { ButtonComponent } from '../../../app/components/button/button';
import { ModalComponent } from '../../../app/components/modal/modal';
import readmeFile from './modal.md?raw';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs', 'modal'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: readmeFile,
      },
    },
  },
};

export default meta;

type Story = StoryObj<ModalComponent>;

export const WithButtonTrigger: Story = {
  name: 'Abierto con Button',
  args: {
    isOpen: false,
  },
  render: (args) => {
    const isOpen = signal(args.isOpen ?? false);
    const props = {
      openModal: () => {
        isOpen.set(true);
      },
      closeModal: () => {
        isOpen.set(false);
      },
      isOpen,
    };

    return {
      props,
      template: `
        <app-button
          label="Abrir modal"
          variant="primary"
          (click)="openModal()"
        />

        <app-modal
          [isOpen]="isOpen()"
          (closed)="closeModal()"
        >
          <span style="color: #7c3aed; font-size: 10px; font-weight: 700; letter-spacing: .12em;">
            MODAL
          </span>
          <h2>Contenido proyectado</h2>
          <p>
            Este contenido se muestra dentro del modal mediante ng-content.
          </p>
        </app-modal>
      `,
    };
  },

  play: async ({ canvas, userEvent }) => {
    const openButton = canvas.getByRole('button', {
      name: 'Abrir modal',
    });

    await userEvent.click(openButton);

    const dialog = await canvas.findByRole('dialog', {
      name: 'Ventana modal',
    });

    await expect(dialog).toBeVisible();

    const closeButton = canvas.getByRole('button', {
      name: 'Cerrar modal',
    });

    await userEvent.click(closeButton);
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
  },
};
