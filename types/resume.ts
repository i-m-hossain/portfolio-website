// Type definitions
export interface NotionFileBlock {
    type: 'file';
    file: {
        file: {
            url: string;
            expiry_time: string;
        };
        caption: Array<{
            plain_text: string;
            [key: string]: any;
        }>;
    };
    id: string;
    [key: string]: any;
}

export interface NotionPdfBlock {
    type: 'pdf';
    pdf: {
        file: {
            url: string;
            expiry_time: string;
        };
        caption: Array<{
            plain_text: string;
            [key: string]: any;
        }>;
    };
    id: string;
    [key: string]: any;
}

export type NotionBlock = NotionFileBlock | NotionPdfBlock | {
    type: string;
    id: string;
    [key: string]: any;
};

export interface PdfPage {
    id: string;
    title: string;
    url: string;
    lastModified: string;
}

export interface NotionError extends Error {
    code?: string;
    body?: any;
}

export interface PdfItem {
    id: string;
    title: string;
    url: string;
    lastModified?: string;
}

export interface ApiResponse {
    success?: boolean;
    data?: PdfItem[];
    message?: string;
}

export interface FetchResponse extends Response {
    json(): Promise<PdfItem[] | ApiResponse>;
}