import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type UploadListType = 'text' | 'picture' | 'picture-card';

export interface UploadFile {
  uid: string;
  name: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
  percent?: number;
  originFileObj?: File;
}

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
@customElement('mx-upload')
export class MXUpload extends LitElement {
  static styles = css`
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

  /**
   * Upload action URL
   */
  @property({ type: String })
  action?: string;

  /**
   * Accept file types
   */
  @property({ type: String })
  accept?: string;

  /**
   * Upload list type
   */
  @property({ type: String, attribute: 'list-type' })
  listType: UploadListType = 'text';

  /**
   * Whether to support multiple file selection
   */
  @property({ type: Boolean })
  multiple = false;

  /**
   * Whether disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Max count of files
   */
  @property({ type: Number, attribute: 'max-count' })
  maxCount?: number;

  /**
   * Support drag and drop upload
   */
  @property({ type: Boolean })
  drag = false;

  /**
   * Whether to show upload list
   */
  @property({ type: Boolean, attribute: 'show-upload-list' })
  showUploadList = true;

  /**
   * File list
   */
  @property({ type: Array, attribute: 'file-list' })
  fileList: UploadFile[] = [];

  /**
   * Default file list
   */
  @property({ type: Array, attribute: 'default-file-list' })
  defaultFileList: UploadFile[] = [];

  /**
   * Directory upload
   */
  @property({ type: Boolean })
  directory = false;

  /**
   * Custom upload request
   */
  @property({ attribute: false })
  customRequest?: (options: any) => void;

  /**
   * Before upload hook
   */
  @property({ attribute: false })
  beforeUpload?: (file: File) => boolean | Promise<boolean>;

  @state()
  private internalFileList: UploadFile[] = [];

  @state()
  private isDragOver = false;

  @query('input[type="file"]')
  private fileInput?: HTMLInputElement;

  private fileIdCounter = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.internalFileList = this.fileList.length > 0 
      ? [...this.fileList] 
      : [...this.defaultFileList];
  }

  private generateUid(): string {
    return `upload-${Date.now()}-${this.fileIdCounter++}`;
  }

  private async handleFileChange(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    if (files.length === 0) return;

    await this.processFiles(files);

    // Reset input
    input.value = '';
  }

  private async processFiles(files: File[]): Promise<void> {
    for (const file of files) {
      // Check max count
      if (this.maxCount && this.internalFileList.length >= this.maxCount) {
        break;
      }

      // Before upload hook
      if (this.beforeUpload) {
        const result = await this.beforeUpload(file);
        if (!result) continue;
      }

      const uploadFile: UploadFile = {
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

  private async uploadFile(uploadFile: UploadFile, file: File): Promise<void> {
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

  private handleProgress(uploadFile: UploadFile, percent: number): void {
    const file = this.internalFileList.find(f => f.uid === uploadFile.uid);
    if (file) {
      file.percent = percent;
      this.requestUpdate();
    }
  }

  private handleRemove(file: UploadFile): void {
    this.dispatchEvent(new CustomEvent('remove', {
      detail: { file },
      bubbles: true,
      composed: true,
    }));

    this.internalFileList = this.internalFileList.filter(f => f.uid !== file.uid);
    this.dispatchChangeEvent();
  }

  private handlePreview(file: UploadFile): void {
    this.dispatchEvent(new CustomEvent('preview', {
      detail: { file },
      bubbles: true,
      composed: true,
    }));
  }

  private handleDownload(file: UploadFile): void {
    this.dispatchEvent(new CustomEvent('download', {
      detail: { file },
      bubbles: true,
      composed: true,
    }));
  }

  private handleDragOver(e: DragEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    this.isDragOver = true;
  }

  private handleDragLeave(): void {
    this.isDragOver = false;
  }

  private async handleDrop(e: DragEvent): Promise<void> {
    if (this.disabled) return;
    
    e.preventDefault();
    this.isDragOver = false;

    const files = Array.from(e.dataTransfer?.files || []);
    await this.processFiles(files);
  }

  private handleClick(): void {
    if (this.disabled) return;
    this.fileInput?.click();
  }

  private dispatchChangeEvent(): void {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { fileList: this.internalFileList },
      bubbles: true,
      composed: true,
    }));
  }

  private renderUploadButton(): any {
    if (this.listType === 'picture-card') {
      return html`
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

      return html`
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

    return html`
      <div class="mx-upload-btn" @click=${this.handleClick}>
        <slot>
          <button type="button">Upload</button>
        </slot>
      </div>
    `;
  }

  private renderFileList(): any {
    if (!this.showUploadList || this.internalFileList.length === 0) {
      return '';
    }

    if (this.listType === 'picture-card') {
      return html`
        <div class="mx-upload-list mx-upload-list-picture-card">
          ${this.internalFileList.map(file => html`
            <div class="mx-upload-list-picture-card-container">
              ${file.thumbUrl ? html`
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

    return html`
      <div class="mx-upload-list">
        ${this.internalFileList.map(file => {
          const itemClasses = {
            'mx-upload-list-item': true,
            'mx-upload-list-item-error': file.status === 'error',
          };

          return html`
            <div class=${classMap(itemClasses)}>
              <span class="mx-upload-list-item-name">${file.name}</span>
              <span class="mx-upload-list-item-card-actions">
                ${file.status === 'done' ? html`
                  <button @click=${() => this.handleDownload(file)}>⬇️</button>
                ` : ''}
                <button @click=${() => this.handleRemove(file)}>✕</button>
              </span>
              ${file.status === 'uploading' && file.percent !== undefined ? html`
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

    return html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-upload': MXUpload;
  }
}
