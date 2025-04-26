export interface NotionResponse {
    object: string;
    results: NotionPage[];
    next_cursor: string | null;
    has_more: boolean;
}

export interface NotionPage {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    properties: {
      [key: string]: {
        id: string;
        type: string;
        [key: string]: any;
      };
    };
  }