import { LitElement } from 'lit';
export type QRCodeLevel = 'L' | 'M' | 'Q' | 'H';
export type QRCodeStatus = 'active' | 'expired' | 'loading';
/**
 * QR Code component for generating QR codes.
 *
 * @element mx-qr-code
 *
 * @attr {string} value - Value to encode in QR code
 * @attr {number} size - Size of QR code in pixels (default 160)
 * @attr {string} color - Color of QR code (default #000000)
 * @attr {string} bg-color - Background color (default #ffffff)
 * @attr {QRCodeLevel} error-level - Error correction level: L, M, Q, H
 * @attr {string} icon - Icon image URL for center
 * @attr {number} icon-size - Icon size (default 40)
 * @attr {boolean} bordered - Whether to show border
 * @attr {QRCodeStatus} status - Status: active, expired, loading
 *
 * @example
 * ```html
 * <mx-qr-code
 *   value="https://example.com"
 *   size="200"
 *   bordered
 * ></mx-qr-code>
 * ```
 */
export declare class MXQRCode extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    size: number;
    color: string;
    bgColor: string;
    errorLevel: QRCodeLevel;
    icon: string;
    iconSize: number;
    bordered: boolean;
    status: QRCodeStatus;
    private qrDataUrl;
    updated(changedProperties: Map<string, any>): void;
    connectedCallback(): void;
    private generateQRCode;
    private drawFinderPattern;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-qr-code': MXQRCode;
    }
}
//# sourceMappingURL=mx-qr-code.d.ts.map