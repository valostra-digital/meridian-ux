import { Page } from './Page';
import * as HeaderStories from './Header.stories';
const meta = {
    title: 'Example/Page',
    render: (args) => Page(args),
};
export default meta;
export const LoggedIn = {
    args: {
        // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
        ...HeaderStories.LoggedIn.args,
    },
};
export const LoggedOut = {
    args: {
        ...HeaderStories.LoggedOut.args,
    },
};
//# sourceMappingURL=Page.stories.js.map