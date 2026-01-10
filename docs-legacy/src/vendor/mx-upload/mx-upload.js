var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Upload component - File upload with drag-drop
 *
 * @element mx-upload
 *
 * @fires change - Dispatched when file list changes
 * @fires preview - Dispatched when preview is requested
 * @fires remove - Dispatched when file is removed
 * @fires download - Dispatched when download is requested
 *
 * @slot - Custom upload button/trigger
 */
let MXUpload = class MXUpload extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Upload list type
         */
        this.listType = 'text';
        /**
         * Whether to support multiple file selection
         */
        this.multiple = false;
        /**
         * Whether disabled
         */
        this.disabled = false;
        /**
         * Support drag and drop upload
         */
        this.drag = false;
        /**
         * Whether to show upload list
         */
        this.showUploadList = true;
        /**
         * File list
         */
        this.fileList = [];
        /**
         * Default file list
         */
        this.defaultFileList = [];
        /**
         * Directory upload
         */
        this.directory = false;
        this.internalFileList = [];
        this.isDragOver = false;
        this.fileIdCounter = 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.internalFileList = this.fileList.length > 0
            ? [...this.fileList]
            : [...this.defaultFileList];
    }
    generateUid() {
        return `upload-${Date.now()}-${this.fileIdCounter++}`;
    }
    async handleFileChange(e) {
        const input = e.target;
        const files = Array.from(input.files || []);
        if (files.length === 0)
            return;
        await this.processFiles(files);
        // Reset input
        input.value = '';
    }
    async processFiles(files) {
        for (const file of files) {
            // Check max count
            if (this.maxCount && this.internalFileList.length >= this.maxCount) {
                break;
            }
            // Before upload hook
            if (this.beforeUpload) {
                const result = await this.beforeUpload(file);
                if (!result)
                    continue;
            }
            const uploadFile = {
                uid: this.generateUid(),
                name: file.name,
                status: 'uploading',
                size: file.size,
                type: file.type,
                percent: 0,
                originFileObj: file,
            };
            this.internalFileList = [...this.internalFileList, uploadFile];
            this.dispatchChangeEvent();
            // Simulate upload (in real implementation, this would call the API)
            this.uploadFile(uploadFile, file);
        }
    }
    async uploadFile(uploadFile, file) {
        if (this.customRequest) {
            this.customRequest({ file, onProgress: this.handleProgress.bind(this, uploadFile) });
            return;
        }
        // Simulate upload progress
        const interval = setInterval(() => {
            const currentFile = this.internalFileList.find(f => f.uid === uploadFile.uid);
            if (!currentFile) {
                clearInterval(interval);
                return;
            }
            currentFile.percent = Math.min((currentFile.percent || 0) + 10, 100);
            if (currentFile.percent >= 100) {
                clearInterval(interval);
                currentFile.status = 'done';
                currentFile.url = URL.createObjectURL(file);
                currentFile.thumbUrl = currentFile.url;
            }
            this.requestUpdate();
            this.dispatchChangeEvent();
        }, 200);
    }
    handleProgress(uploadFile, percent) {
        const file = this.internalFileList.find(f => f.uid === uploadFile.uid);
        if (file) {
            file.percent = percent;
            this.requestUpdate();
        }
    }
    handleRemove(file) {
        this.dispatchEvent(new CustomEvent('remove', {
            detail: { file },
            bubbles: true,
            composed: true,
        }));
        this.internalFileList = this.internalFileList.filter(f => f.uid !== file.uid);
        this.dispatchChangeEvent();
    }
    handlePreview(file) {
        this.dispatchEvent(new CustomEvent('preview', {
            detail: { file },
            bubbles: true,
            composed: true,
        }));
    }
    handleDownload(file) {
        this.dispatchEvent(new CustomEvent('download', {
            detail: { file },
            bubbles: true,
            composed: true,
        }));
    }
    handleDragOver(e) {
        if (this.disabled)
            return;
        e.preventDefault();
        this.isDragOver = true;
    }
    handleDragLeave() {
        this.isDragOver = false;
    }
    async handleDrop(e) {
        if (this.disabled)
            return;
        e.preventDefault();
        this.isDragOver = false;
        const files = Array.from(e.dataTransfer?.files || []);
        await this.processFiles(files);
    }
    handleClick() {
        if (this.disabled)
            return;
        this.fileInput?.click();
    }
    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { fileList: this.internalFileList },
            bubbles: true,
            composed: true,
        }));
    }
    renderUploadButton() {
        if (this.listType === 'picture-card') {
            return html `
        <div class="mx-upload-select-picture-card" @click=${this.handleClick}>
          <div class="mx-upload-select-picture-card-icon">+</div>
        </div>
      `;
        }
        if (this.drag) {
            const dragClasses = {
                'mx-upload-drag': true,
                'mx-upload-drag-hover': this.isDragOver,
            };
            return html `
        <div
          class=${classMap(dragClasses)}
          @click=${this.handleClick}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <p class="mx-upload-drag-icon">📁</p>
          <p class="mx-upload-text">
            <slot name="text">Click or drag file to this area to upload</slot>
          </p>
          <p class="mx-upload-hint">
            <slot name="hint">Support for a single or bulk upload.</slot>
          </p>
        </div>
      `;
        }
        return html `
      <div class="mx-upload-btn" @click=${this.handleClick}>
        <slot>
          <button type="button">Upload</button>
        </slot>
      </div>
    `;
    }
    renderFileList() {
        if (!this.showUploadList || this.internalFileList.length === 0) {
            return '';
        }
        if (this.listType === 'picture-card') {
            return html `
        <div class="mx-upload-list mx-upload-list-picture-card">
          ${this.internalFileList.map(file => html `
            <div class="mx-upload-list-picture-card-container">
              ${file.thumbUrl ? html `
                <img class="mx-upload-list-item-thumbnail" src=${file.thumbUrl} alt=${file.name} />
              ` : ''}
              <div class="mx-upload-list-item-actions">
                <button @click=${() => this.handlePreview(file)}>👁️</button>
                <button @click=${() => this.handleRemove(file)}>🗑️</button>
              </div>
            </div>
          `)}
        </div>
      `;
        }
        return html `
      <div class="mx-upload-list">
        ${this.internalFileList.map(file => {
            const itemClasses = {
                'mx-upload-list-item': true,
                'mx-upload-list-item-error': file.status === 'error',
            };
            return html `
            <div class=${classMap(itemClasses)}>
              <span class="mx-upload-list-item-name">${file.name}</span>
              <span class="mx-upload-list-item-card-actions">
                ${file.status === 'done' ? html `
                  <button @click=${() => this.handleDownload(file)}>⬇️</button>
                ` : ''}
                <button @click=${() => this.handleRemove(file)}>✕</button>
              </span>
              ${file.status === 'uploading' && file.percent !== undefined ? html `
                <div class="mx-upload-list-item-progress">
                  <div
                    class="mx-upload-list-item-progress-bar"
                    style="width: ${file.percent}%"
                  ></div>
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
    }
    render() {
        const classes = {
            'mx-upload': true,
            'mx-upload-disabled': this.disabled,
        };
        return html `
      <div class=${classMap(classes)}>
        <div class="mx-upload-wrapper">
          <div class="mx-upload-select">
            <input
              type="file"
              .accept=${this.accept || ''}
              ?multiple=${this.multiple}
              ?webkitdirectory=${this.directory}
              ?disabled=${this.disabled}
              @change=${this.handleFileChange}
            />
            ${this.renderUploadButton()}
          </div>
        </div>
        ${this.renderFileList()}
      </div>
    `;
    }
};
MXUpload.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-upload {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-upload-wrapper {
      display: inline-block;
    }

    .mx-upload-select {
      display: inline-block;
      cursor: pointer;
    }

    .mx-upload-disabled .mx-upload-select {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .mx-upload-btn {
      display: block;
    }

    input[type="file"] {
      display: none;
    }

    /* Drag upload */
    .mx-upload-drag {
      position: relative;
      width: 100%;
      height: 180px;
      padding: 16px;
      text-align: center;
      background: var(--mx-color-fill-alter, #fafafa);
      border: 1px dashed var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      cursor: pointer;
      transition: border-color 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .mx-upload-drag:hover {
      border-color: var(--mx-color-primary, #1677ff);
    }

    .mx-upload-drag.mx-upload-drag-hover {
      border-color: var(--mx-color-primary, #1677ff);
      background: var(--mx-color-primary-bg, #e6f4ff);
    }

    .mx-upload-drag-icon {
      margin-bottom: 8px;
      font-size: 48px;
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-upload-text {
      margin: 0 0 4px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 16px;
    }

    .mx-upload-hint {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 14px;
    }

    /* Upload list */
    .mx-upload-list {
      line-height: var(--mx-line-height, 1.5714285714285714);
    }

    .mx-upload-list-item {
      position: relative;
      height: 22px;
      margin-top: 8px;
      font-size: var(--mx-font-size, 14px);
      display: flex;
      align-items: center;
      transition: background-color 0.3s;
    }

    .mx-upload-list-item:hover {
      background-color: var(--mx-color-fill-alter, #fafafa);
    }

    .mx-upload-list-item-name {
      flex: 1;
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mx-upload-list-item-card-actions {
      display: flex;
      gap: 8px;
    }

    .mx-upload-list-item-card-actions button {
      padding: 0;
      background: none;
      border: none;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      cursor: pointer;
      transition: color 0.3s;
    }

    .mx-upload-list-item-card-actions button:hover {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-upload-list-item-error .mx-upload-list-item-name {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-upload-list-item-progress {
      position: absolute;
      bottom: -12px;
      left: 0;
      width: 100%;
      line-height: 0;
    }

    .mx-upload-list-item-progress-bar {
      height: 2px;
      background-color: var(--mx-color-primary, #1677ff);
      transition: width 0.3s;
      border-radius: 1px;
    }

    /* Picture card */
    .mx-upload-list-picture-card {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .mx-upload-list-picture-card-container {
      position: relative;
      width: 104px;
      height: 104px;
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      overflow: hidden;
    }

    .mx-upload-list-item-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .mx-upload-list-item-actions {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .mx-upload-list-picture-card-container:hover .mx-upload-list-item-actions {
      opacity: 1;
    }

    .mx-upload-list-item-actions button {
      padding: 4px 8px;
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 16px;
    }

    .mx-upload-select-picture-card {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 104px;
      height: 104px;
      background-color: var(--mx-color-fill-alter, #fafafa);
      border: 1px dashed var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      cursor: pointer;
      transition: border-color 0.3s;
    }

    .mx-upload-select-picture-card:hover {
      border-color: var(--mx-color-primary, #1677ff);
    }

    .mx-upload-select-picture-card-icon {
      font-size: 32px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }
  `;
__decorate([
    property({ type: String })
], MXUpload.prototype, "action", void 0);
__decorate([
    property({ type: String })
], MXUpload.prototype, "accept", void 0);
__decorate([
    property({ type: String, attribute: 'list-type' })
], MXUpload.prototype, "listType", void 0);
__decorate([
    property({ type: Boolean })
], MXUpload.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean })
], MXUpload.prototype, "disabled", void 0);
__decorate([
    property({ type: Number, attribute: 'max-count' })
], MXUpload.prototype, "maxCount", void 0);
__decorate([
    property({ type: Boolean })
], MXUpload.prototype, "drag", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-upload-list' })
], MXUpload.prototype, "showUploadList", void 0);
__decorate([
    property({ type: Array, attribute: 'file-list' })
], MXUpload.prototype, "fileList", void 0);
__decorate([
    property({ type: Array, attribute: 'default-file-list' })
], MXUpload.prototype, "defaultFileList", void 0);
__decorate([
    property({ type: Boolean })
], MXUpload.prototype, "directory", void 0);
__decorate([
    property({ attribute: false })
], MXUpload.prototype, "customRequest", void 0);
__decorate([
    property({ attribute: false })
], MXUpload.prototype, "beforeUpload", void 0);
__decorate([
    state()
], MXUpload.prototype, "internalFileList", void 0);
__decorate([
    state()
], MXUpload.prototype, "isDragOver", void 0);
__decorate([
    query('input[type="file"]')
], MXUpload.prototype, "fileInput", void 0);
MXUpload = __decorate([
    customElement('mx-upload')
], MXUpload);
export { MXUpload };
//# sourceMappingURL=mx-upload.js.map