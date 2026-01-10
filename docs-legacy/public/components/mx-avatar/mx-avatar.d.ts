import { LitElement } from 'lit';
export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'large' | 'default' | 'small' | number;
/**
 * Avatar component for displaying user profile pictures or icons.
 *
 * @element mx-avatar
 *
 * @attr {AvatarShape} shape - Shape of avatar: circle, square
 * @attr {AvatarSize} size - Size: large (40px), default (32px), small (24px), or number
 * @attr {string} src - Image source URL
 * @attr {string} srcset - Responsive image sources
 * @attr {string} alt - Alt text for image
 * @attr {string} icon - Icon to display
 * @attr {string} gap - Gap between text and border (for text avatars)
 *
 * @slot - Default content (text or custom content)
 * @slot icon - Custom icon content
 *
 * @fires error - Dispatched when image fails to load
 *
 * @example
 * ```html
 * <!-- Image avatar -->
 * <mx-avatar src="user.jpg" alt="User"></mx-avatar>
 *
 * <!-- Text avatar -->
 * <mx-avatar>JD</mx-avatar>
 *
 * <!-- Icon avatar -->
 * <mx-avatar icon="user"></mx-avatar>
 *
 * <!-- Different sizes -->
 * <mx-avatar size="large" src="user.jpg"></mx-avatar>
 * <mx-avatar size="64" src="user.jpg"></mx-avatar>
 *
 * <!-- Square shape -->
 * <mx-avatar shape="square" src="user.jpg"></mx-avatar>
 * ```
 */
export declare class MXAvatar extends LitElement {
    static styles: import("lit").CSSResult;
    shape: AvatarShape;
    size: AvatarSize;
    src: string;
    srcset: string;
    alt: string;
    icon: string;
    gap: number;
    private scale;
    private imageError;
    private handleImageError;
    private updateTextScale;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    firstUpdated(): void;
    private getSizeValue;
    private getSizeClass;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-avatar': MXAvatar;
    }
}
//# sourceMappingURL=mx-avatar.d.ts.map