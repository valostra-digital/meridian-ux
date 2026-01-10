var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
/**
 * Progress component for displaying progress of an operation.
 *
 * @element mx-progress
 *
 * @attr {number} percent - Progress percentage (0-100)
 * @attr {ProgressType} type - Progress type: line, circle, dashboard
 * @attr {ProgressStatus} status - Progress status: success, exception, normal, active
 * @attr {ProgressSize} size - Size: default, small
 * @attr {boolean} show-info - Whether to show progress text
 * @attr {number} stroke-width - Width of progress bar/circle
 * @attr {string} stroke-color - Color of progress bar
 * @attr {string} trail-color - Color of unfilled part
 * @attr {number} width - Canvas width for circle/dashboard (default 120)
 * @attr {number} gap-degree - Gap degree for dashboard (default 75)
 * @attr {number} gap-position - Gap position for dashboard: top, bottom, left, right
 *
 * @slot format - Custom progress text format
 *
 * @example
 * ```html
 * <!-- Line progress -->
 * <mx-progress percent="50"></mx-progress>
 *
 * <!-- Circle progress -->
 * <mx-progress type="circle" percent="75"></mx-progress>
 *
 * <!-- Dashboard -->
 * <mx-progress type="dashboard" percent="80"></mx-progress>
 *
 * <!-- Success state -->
 * <mx-progress percent="100" status="success"></mx-progress>
 *
 * <!-- Custom color -->
 * <mx-progress percent="60" stroke-color="#52c41a"></mx-progress>
 * ```
 */
let MXProgress = class MXProgress extends LitElement {
    constructor() {
        super(...arguments);
        this.percent = 0;
        this.type = 'line';
        this.status = 'normal';
        this.size = 'default';
        this.showInfo = true;
        this.strokeColor = '';
        this.trailColor = '';
        this.width = 120;
        this.gapDegree = 75;
        this.gapPosition = 'bottom';
    }
    get actualStatus() {
        if (this.status !== 'normal')
            return this.status;
        if (this.percent >= 100)
            return 'success';
        return 'normal';
    }
    get progressColor() {
        if (this.strokeColor)
            return this.strokeColor;
        switch (this.actualStatus) {
            case 'success':
                return 'var(--mx-color-success, #52c41a)';
            case 'exception':
                return 'var(--mx-color-error, #ff4d4f)';
            default:
                return 'var(--mx-color-primary, #1677ff)';
        }
    }
    renderLineProgress() {
        const strokeWidth = this.strokeWidth || (this.size === 'small' ? 6 : 8);
        const bgClasses = {
            'mx-progress-bg': true,
            'mx-progress-bg-success': this.actualStatus === 'success',
            'mx-progress-bg-exception': this.actualStatus === 'exception',
            'mx-progress-bg-active': this.status === 'active'
        };
        const bgStyles = {
            width: `${this.percent}%`,
            height: `${strokeWidth}px`,
            backgroundColor: this.progressColor
        };
        const innerStyles = this.trailColor ? { backgroundColor: this.trailColor } : {};
        return html `
      <div class="mx-progress-outer">
        <div class="mx-progress-inner" style=${styleMap(innerStyles)}>
          <div class=${classMap(bgClasses)} style=${styleMap(bgStyles)}></div>
        </div>
      </div>
      ${this.showInfo ? this.renderText() : null}
    `;
    }
    renderCircleProgress() {
        const strokeWidth = this.strokeWidth || 6;
        const radius = (this.width - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this.percent / 100) * circumference;
        const center = this.width / 2;
        const trailColor = this.trailColor || 'var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06))';
        return svg `
      <svg width="${this.width}" height="${this.width}" viewBox="0 0 ${this.width} ${this.width}">
        <!-- Background circle -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="${trailColor}"
          stroke-width="${strokeWidth}"
        />
        <!-- Progress circle -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="${this.progressColor}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
          transform="rotate(-90 ${center} ${center})"
          style="transition: stroke-dashoffset 0.3s ease"
        />
      </svg>
    `;
    }
    renderDashboardProgress() {
        const strokeWidth = this.strokeWidth || 6;
        const radius = (this.width - strokeWidth) / 2;
        const gapRad = (this.gapDegree * Math.PI) / 180;
        const circumference = 2 * Math.PI * radius;
        const dashLength = circumference - radius * gapRad;
        const offset = dashLength - (this.percent / 100) * dashLength;
        const center = this.width / 2;
        let gapAngle = -90;
        switch (this.gapPosition) {
            case 'top':
                gapAngle = 0;
                break;
            case 'right':
                gapAngle = 90;
                break;
            case 'bottom':
                gapAngle = 180;
                break;
            case 'left':
                gapAngle = -90;
                break;
        }
        const trailColor = this.trailColor || 'var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06))';
        return svg `
      <svg width="${this.width}" height="${this.width}" viewBox="0 0 ${this.width} ${this.width}">
        <!-- Background arc -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="${trailColor}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${dashLength} ${circumference}"
          transform="rotate(${gapAngle + this.gapDegree / 2} ${center} ${center})"
        />
        <!-- Progress arc -->
        <circle
          cx="${center}"
          cy="${center}"
          r="${radius}"
          fill="none"
          stroke="${this.progressColor}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${dashLength} ${circumference}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
          transform="rotate(${gapAngle + this.gapDegree / 2} ${center} ${center})"
          style="transition: stroke-dashoffset 0.3s ease"
        />
      </svg>
    `;
    }
    renderText() {
        const hasCustomFormat = this.querySelector('[slot="format"]');
        const textClasses = {
            'mx-progress-text': true,
            'mx-progress-text-success': this.actualStatus === 'success',
            'mx-progress-text-exception': this.actualStatus === 'exception'
        };
        let content;
        if (hasCustomFormat) {
            content = html `<slot name="format"></slot>`;
        }
        else if (this.actualStatus === 'success') {
            content = '✓';
        }
        else if (this.actualStatus === 'exception') {
            content = '✕';
        }
        else {
            content = `${this.percent}%`;
        }
        return html `<div class=${classMap(textClasses)}>${content}</div>`;
    }
    render() {
        const classes = {
            'mx-progress': true,
            [`mx-progress-${this.type}`]: true,
            [`mx-progress-${this.size}`]: this.size !== 'default',
            [`mx-progress-status-${this.actualStatus}`]: true
        };
        return html `
      <div class=${classMap(classes)}>
        ${this.type === 'line' ? this.renderLineProgress() :
            this.type === 'circle' ? html `
            ${this.renderCircleProgress()}
            ${this.showInfo ? this.renderText() : null}
          ` : html `
            ${this.renderDashboardProgress()}
            ${this.showInfo ? this.renderText() : null}
          `}
      </div>
    `;
    }
};
MXProgress.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-progress {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      display: inline-block;
    }

    /* Line progress */
    .mx-progress-line {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .mx-progress-outer {
      flex: 1;
      margin-right: 8px;
    }

    .mx-progress-inner {
      position: relative;
      display: inline-block;
      width: 100%;
      overflow: hidden;
      vertical-align: middle;
      background-color: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
      border-radius: 100px;
    }

    .mx-progress-bg {
      position: relative;
      background-color: var(--mx-color-primary, #1677ff);
      border-radius: 100px;
      transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }

    .mx-progress-bg-success {
      background-color: var(--mx-color-success, #52c41a);
    }

    .mx-progress-bg-exception {
      background-color: var(--mx-color-error, #ff4d4f);
    }

    /* Active animation */
    .mx-progress-bg-active::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #fff;
      border-radius: 10px;
      opacity: 0;
      animation: progress-active 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
      content: '';
    }

    @keyframes progress-active {
      0% {
        width: 0;
        opacity: 0.1;
      }
      20% {
        width: 0;
        opacity: 0.5;
      }
      100% {
        width: 100%;
        opacity: 0;
      }
    }

    /* Size variants */
    .mx-progress-line .mx-progress-inner {
      height: 8px;
    }

    .mx-progress-small .mx-progress-inner {
      height: 6px;
    }

    .mx-progress-line .mx-progress-text {
      display: inline-block;
      width: auto;
      margin-left: 8px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
      font-size: 14px;
      line-height: 1;
      white-space: nowrap;
      word-break: normal;
    }

    .mx-progress-small .mx-progress-text {
      font-size: 12px;
    }

    .mx-progress-text-success {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-progress-text-exception {
      color: var(--mx-color-error, #ff4d4f);
    }

    /* Circle/Dashboard progress */
    .mx-progress-circle,
    .mx-progress-dashboard {
      display: inline-block;
      position: relative;
    }

    .mx-progress-circle .mx-progress-text,
    .mx-progress-dashboard .mx-progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 24px;
      line-height: 1;
      white-space: normal;
      text-align: center;
      word-break: normal;
    }

    .mx-progress-circle-small .mx-progress-text,
    .mx-progress-dashboard-small .mx-progress-text {
      font-size: 18px;
    }
  `;
__decorate([
    property({ type: Number })
], MXProgress.prototype, "percent", void 0);
__decorate([
    property({ type: String })
], MXProgress.prototype, "type", void 0);
__decorate([
    property({ type: String })
], MXProgress.prototype, "status", void 0);
__decorate([
    property({ type: String })
], MXProgress.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-info' })
], MXProgress.prototype, "showInfo", void 0);
__decorate([
    property({ type: Number, attribute: 'stroke-width' })
], MXProgress.prototype, "strokeWidth", void 0);
__decorate([
    property({ type: String, attribute: 'stroke-color' })
], MXProgress.prototype, "strokeColor", void 0);
__decorate([
    property({ type: String, attribute: 'trail-color' })
], MXProgress.prototype, "trailColor", void 0);
__decorate([
    property({ type: Number })
], MXProgress.prototype, "width", void 0);
__decorate([
    property({ type: Number, attribute: 'gap-degree' })
], MXProgress.prototype, "gapDegree", void 0);
__decorate([
    property({ type: String, attribute: 'gap-position' })
], MXProgress.prototype, "gapPosition", void 0);
MXProgress = __decorate([
    customElement('mx-progress')
], MXProgress);
export { MXProgress };
//# sourceMappingURL=mx-progress.js.map