import { html } from 'lit';
import '../mx-spin/index.js';
const meta = {
    title: 'Feedback/Spin',
    component: 'mx-spin',
    tags: ['autodocs'],
    argTypes: {
        spinning: { control: 'boolean' },
        size: {
            control: { type: 'select' },
            options: ['small', 'default', 'large'],
        },
    },
    args: {
        spinning: true,
        size: 'default',
    },
};
export default meta;
export const Basic = {
    render: (args) => html `
    <mx-spin ?spinning=${args.spinning} size=${args.size}></mx-spin>
  `,
};
export const InsideContainer = {
    render: (args) => html `
    <div style="padding: 24px; background: rgba(0,0,0,0.05); border-radius: 4px; text-align: center;">
      <mx-spin ?spinning=${args.spinning} size=${args.size}>
        <div style="padding: 24px; background: white; border: 1px solid #ddd;">
           Alert message title
        </div>
      </mx-spin>
    </div>
  `,
};
//# sourceMappingURL=mx-spin.stories.js.map