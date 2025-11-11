/* eslint-disable react/forbid-dom-props */
// Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import styled from 'styled-components';
import Dialog, { type DialogProps, SIZES, VARIANTS } from './Dialog';

// A simple trigger button for stories
const OpenButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const meta: Meta<DialogProps> = {
  args: {
    children: (
      <p>
        This is the main content of the dialog. You can put any React nodes
        here.
      </p>
    ),
    footer: <button type="button">Confirm</button>,
    label: 'Dialog Title',
    size: 'md',
    variant: 'default',
  },
  argTypes: {
    onOpenChange: { action: 'onOpenChange' },
    size: {
      control: 'select',
      description: 'Max-width size of the dialog',
      options: Object.keys(SIZES),
    },
    variant: {
      control: 'select',
      description: 'Visual style variant (border color & icon)',
      options: Object.keys(VARIANTS),
    },
  },
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A controlled, accessible dialog powered by Radix UI. Use `isOpen` + `onOpenChange` to manage visibility.',
      },
    },
  },
  title: '@components/Dialog',
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
              isOpen={!!openMap[v]}
              label={`Variant: ${v}`}
              variant={v as typeof args.variant}
              onOpenChange={(o) => {
                setOpenMap((prev) => ({ ...prev, [v]: o }));
              }}
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
              isOpen={!!openMap[s]}
              label={`Size: ${s}`}
              size={s as typeof args.size}
              onOpenChange={(o) => {
                setOpenMap((prev) => ({ ...prev, [s]: o }));
              }}
            />
          </div>
        ))}
      </>
    );
  },
};
