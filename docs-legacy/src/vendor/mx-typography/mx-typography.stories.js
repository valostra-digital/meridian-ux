import { html } from 'lit';
import '../mx-typography/index.js';
const meta = {
    title: 'General/Typography',
    component: 'mx-typography',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['title', 'text', 'paragraph'],
        },
        level: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5],
            if: { arg: 'variant', eq: 'title' },
        },
        type: {
            control: { type: 'select' },
            options: [undefined, 'secondary', 'success', 'warning', 'danger'],
        },
        disabled: { control: 'boolean' },
        mark: { control: 'boolean' },
        code: { control: 'boolean' },
        underline: { control: 'boolean' },
        delete: { control: 'boolean' },
        strong: { control: 'boolean' },
        italic: { control: 'boolean' },
    },
};
export default meta;
export const Title = {
    render: () => html `
    <mx-typography variant="title" level="1">h1. Meridian UX</mx-typography>
    <mx-typography variant="title" level="2">h2. Meridian UX</mx-typography>
    <mx-typography variant="title" level="3">h3. Meridian UX</mx-typography>
    <mx-typography variant="title" level="4">h4. Meridian UX</mx-typography>
    <mx-typography variant="title" level="5">h5. Meridian UX</mx-typography>
  `,
};
export const Text = {
    render: () => html `
    <mx-typography>Meridian UX (Default)</mx-typography>
    <mx-typography type="secondary">Meridian UX (Secondary)</mx-typography>
    <mx-typography type="success">Meridian UX (Success)</mx-typography>
    <mx-typography type="warning">Meridian UX (Warning)</mx-typography>
    <mx-typography type="danger">Meridian UX (Danger)</mx-typography>
    <mx-typography disabled>Meridian UX (Disabled)</mx-typography>
    <mx-typography mark>Meridian UX (Mark)</mx-typography>
    <mx-typography code>Meridian UX (Code)</mx-typography>
    <mx-typography keyboard>Meridian UX (Keyboard)</mx-typography>
    <mx-typography underline>Meridian UX (Underline)</mx-typography>
    <mx-typography delete>Meridian UX (Delete)</mx-typography>
    <mx-typography strong>Meridian UX (Strong)</mx-typography>
    <mx-typography italic>Meridian UX (Italic)</mx-typography>
  `,
};
//# sourceMappingURL=mx-typography.stories.js.map