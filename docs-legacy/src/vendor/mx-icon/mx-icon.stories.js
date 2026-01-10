import { html } from 'lit';
import '../mx-icon/index.js';
const meta = {
    title: 'General/Icon',
    component: 'mx-icon',
    tags: ['autodocs'],
    argTypes: {
        spin: { control: 'boolean' },
        rotate: { control: 'number' },
        svg: { control: 'text' },
    },
    args: {
        spin: false,
        svg: '<svg viewBox="0 0 1024 1024"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L488.6 803l227.1 119.5c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27.1-36.3z"/></svg>',
    },
};
export default meta;
export const Basic = {
    render: (args) => html `
    <mx-icon
      ?spin=${args.spin}
      .rotate=${args.rotate}
      .svg=${args.svg}
      style="font-size: 32px; color: #1677ff;"
    ></mx-icon>
  `,
};
export const Spinning = {
    args: {
        spin: true,
        svg: '<svg viewBox="0 0 1024 1024"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>'
    },
    render: Basic.render,
};
//# sourceMappingURL=mx-icon.stories.js.map