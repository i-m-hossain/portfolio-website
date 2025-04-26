import {
    PageObjectResponse,
    RichTextItemResponse,
    TitlePropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

// Helper type guard
function isRichTextItemResponse(
    item: any
): item is RichTextItemResponse {
    return item?.type === 'text' && 'plain_text' in item
}

// Helper function to safely get rich text
function getRichTextContent(
    richText: RichTextItemResponse[] | undefined
): string {
    if (!richText || !richText.length) return ''
    const firstItem = richText[0]
    return isRichTextItemResponse(firstItem)
        ? firstItem.plain_text
        : ''
}

// Helper function to safely get title
function getTitleContent(
    title: TitlePropertyItemObjectResponse['title'] | undefined
): string {
    if (!title || !title.length) return 'Untitled'
    const firstItem = title[0]
    return isRichTextItemResponse(firstItem)
        ? firstItem.plain_text
        : 'Untitled'
}
