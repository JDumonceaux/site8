// Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Dialog, { type DialogProps, VARIANTS, SIZES } from './Dialog';
import styled from 'styled-components';

// A simple trigger button for stories
const OpenButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const meta: Meta<DialogProps> = {
  title: '@components/Dialog',
  component: Dialog,
  args: {
    label: 'Dialog Title',
    children: (
      <p>
        This is the main content of the dialog. You can put any React nodes
        here.
      </p>
    ),
    footer: <button>Confirm</button>,
    variant: 'default',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(VARIANTS),
      description: 'Visual style variant (border color & icon)',
    },
    size: {
      control: 'select',
      options: Object.keys(SIZES),
      description: 'Max-width size of the dialog',
    },
    onOpenChange: { action: 'onOpenChange' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A controlled, accessible dialog powered by Radix UI. Use `isOpen` + `onOpenChange` to manage visibility.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<DialogProps>;

/**
 * Default story: shows how to open/close the dialog.
 */
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <OpenButton
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Dialog
        </OpenButton>
        <Dialog
          {...args}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
};

/**
 * Variant gallery: renders one dialog per variant.
 */
export const Variants: Story = {
  name: 'All Variants',
  render: (args) => {
    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
    const toggle = (v: string) => {
      setOpenMap((prev) => ({ ...prev, [v]: !prev[v] }));
    };
    return (
      <>
        {Object.keys(VARIANTS).map((v) => (
          <div
            key={v}
            style={{ marginBottom: '2rem' }}
          >
            <OpenButton
              onClick={() => {
                toggle(v);
              }}
            >
              Open {v}
            </OpenButton>
            <Dialog
              {...args}
              variant={v as typeof args.variant}
              isOpen={!!openMap[v]}
              onOpenChange={(o) => {
                setOpenMap((prev) => ({ ...prev, [v]: o }));
              }}
              label={`Variant: ${v}`}
            />
          </div>
        ))}
      </>
    );
  },
};

/**
 * Size gallery: renders one dialog per size.
 */
export const Sizes: Story = {
  name: 'All Sizes',
  render: (args) => {
    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
    const toggle = (s: string) => {
      setOpenMap((prev) => ({ ...prev, [s]: !prev[s] }));
    };
    return (
      <>
        {Object.keys(SIZES).map((s) => (
          <div
            key={s}
            style={{ marginBottom: '2rem' }}
          >
            <OpenButton
              onClick={() => {
                toggle(s);
              }}
            >
              Open {s}
            </OpenButton>
            <Dialog
              {...args}
              size={s as typeof args.size}
              isOpen={!!openMap[s]}
              onOpenChange={(o) => {
                setOpenMap((prev) => ({ ...prev, [s]: o }));
              }}
              label={`Size: ${s}`}
            />
          </div>
        ))}
      </>
    );
  },
};
