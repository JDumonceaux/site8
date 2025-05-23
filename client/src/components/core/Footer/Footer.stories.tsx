// Footer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A simple footer rendering the current year and using the native `<footer>` landmark for accessibility.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/** Default footer showing the current year */
export const Default: Story = {};
