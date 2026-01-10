import { html } from 'lit';
import '../mx-button/index.js';
import '../mx-icon/index.js'; // For icon examples
const meta = {
    title: 'General/Button',
    component: 'mx-button',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['primary', 'default', 'dashed', 'text', 'link'],
            description: 'Can be set to primary, default, dashed, text, link',
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'middle', 'small'],
        },
        shape: {
            control: { type: 'select' },
            options: ['default', 'circle', 'round'],
        },
        disabled: { control: 'boolean' },
        danger: { control: 'boolean' },
        loading: { control: 'boolean' },
        href: { control: 'text' },
    },
    args: {
        type: 'default',
        size: 'middle',
        shape: 'default',
        disabled: false,
        danger: false,
        loading: false,
    },
};
export default meta;
export const Primary = {
    args: {
        type: 'primary',
        slot: 'Primary Button',
    },
    render: (args) => html `
    <mx-button
      type=${args.type}
      size=${args.size}
      shape=${args.shape}
      ?disabled=${args.disabled}
      ?danger=${args.danger}
      ?loading=${args.loading}
      href=${args.href}
    >
      ${args.slot}
    </mx-button>
  `,
};
export const Default = {
    args: {
        slot: 'Default Button',
    },
    render: Primary.render,
};
export const Dashed = {
    args: {
        type: 'dashed',
        slot: 'Dashed Button',
    },
    render: Primary.render,
};
export const Text = {
    args: {
        type: 'text',
        slot: 'Text Button',
    },
    render: Primary.render,
};
export const Link = {
    args: {
        type: 'link',
        slot: 'Link Button',
        href: 'https://example.com',
    },
    render: Primary.render,
};
export const WithIcon = {
    render: (args) => html `
    <mx-button type="primary" shape="circle">
      <mx-icon slot="icon" svg='<svg viewBox="0 0 1024 1024"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L488.6 803l227.1 119.5c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27.1-36.3z"/></svg></mx-icon>
    </mx-button>
    <mx-button type="primary">
       <mx-icon slot="icon" svg='<svg viewBox="0 0 1024 1024"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L488.6 803l227.1 119.5c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27.1-36.3z"/></svg></mx-icon>
       Search
    </mx-button>
  `,
};
//# sourceMappingURL=mx-button.stories.js.map