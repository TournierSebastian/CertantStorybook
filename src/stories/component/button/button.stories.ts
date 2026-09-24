import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../../app/components/button/button';
import buttonTemplate from './button.template.html?raw';
import readmeFile from './button.md?raw';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,

  tags: ['autodocs', 'button'],

  args: {
    label: 'Button',
    variant: 'primary',
    disabled: false,
  },

  decorators: [],

  argTypes: {
    label: {
      control: 'text',
      description: 'Texto que se muestra dentro del botón',

      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'Button',
        },
      },
    },

    variant: {
      control: 'select',

      options: [
        'primary',
        'secondary',
        'danger',
      ],

      description: 'Define el estilo visual del botón',

      table: {
        type: {
          summary: "'primary' | 'secondary' | 'danger'",
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },

    disabled: {
      control: 'boolean',

      description: 'Indica si el botón está deshabilitado',

      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },

  parameters: {
    preview: [
      {
        tab: 'HTML',
        template: buttonTemplate,
        language: 'html',
        description: 'button.template.html',
        copy: true,
      }
    ],

    layout: 'centered',

    controls: {
      expanded: true,
    },

    docs: {
      description: {
        component: readmeFile,
      },
    },
  },

  render: (args) => ({
    props: {
      ...args,

      onClick: () => {
        alert('¡Hiciste click en el botón! 🎉');
      },
    },

    template: `
      <app-button
        [label]="label"
        [variant]="variant"
        [disabled]="disabled"
        (click)="onClick()"
      />
    `,
  }),
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    disabled: false,
  },

  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');

    await userEvent.click(button);
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Eliminar',
    variant: 'danger',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
};