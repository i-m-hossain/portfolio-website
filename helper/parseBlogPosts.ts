import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface BlogPostData {
    id: string;
    title: string;
    url: string;
    publishedAt: string;
    cover: string | null;
  }

export function parseBlogPost(page: PageObjectResponse): BlogPostData {
    return {
      id: page.id,
      title: page.properties.title?.title?.[0]?.plain_text || 'Untitled',
      url: page.properties.url?.url || '',
      publishedAt: page.properties.publishedAt?.rich_text?.[0]?.plain_text || '',
      cover: page.cover
        ? page.cover.type === 'external'
          ? page.cover.external.url
          : page.cover.file.url
        : null,
    };
  }