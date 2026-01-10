import { LitElement } from 'lit';
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
export declare class MXUpload extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Upload action URL
     */
    action?: string;
    /**
     * Accept file types
     */
    accept?: string;
    /**
     * Upload list type
     */
    listType: UploadListType;
    /**
     * Whether to support multiple file selection
     */
    multiple: boolean;
    /**
     * Whether disabled
     */
    disabled: boolean;
    /**
     * Max count of files
     */
    maxCount?: number;
    /**
     * Support drag and drop upload
     */
    drag: boolean;
    /**
     * Whether to show upload list
     */
    showUploadList: boolean;
    /**
     * File list
     */
    fileList: UploadFile[];
    /**
     * Default file list
     */
    defaultFileList: UploadFile[];
    /**
     * Directory upload
     */
    directory: boolean;
    /**
     * Custom upload request
     */
    customRequest?: (options: any) => void;
    /**
     * Before upload hook
     */
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    private internalFileList;
    private isDragOver;
    private fileInput?;
    private fileIdCounter;
    connectedCallback(): void;
    private generateUid;
    private handleFileChange;
    private processFiles;
    private uploadFile;
    private handleProgress;
    private handleRemove;
    private handlePreview;
    private handleDownload;
    private handleDragOver;
    private handleDragLeave;
    private handleDrop;
    private handleClick;
    private dispatchChangeEvent;
    private renderUploadButton;
    private renderFileList;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-upload': MXUpload;
    }
}
//# sourceMappingURL=mx-upload.d.ts.map