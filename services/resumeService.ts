import {
    createNotionClient,
} from "@/lib/notionClient";

const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);

const PARENT_PAGE_ID = process.env.NOTION_PDF_PAGE_ID?.replace(/"/g, '') || '';

export async function getAllPdfPages() {
    console.log('Using Notion page ID:', PARENT_PAGE_ID);

    try {
        // First, retrieve the page to verify it exists
        const page = await notionClient.pages.retrieve({
            page_id: PARENT_PAGE_ID
        });

        console.log('Successfully retrieved page:', page.id);

        // Then get all blocks in the page
        const { results } = await notionClient.blocks.children.list({
            block_id: PARENT_PAGE_ID
        });

        console.log(`Found ${results.length} blocks in the page`);

        // Filter for file blocks that contain PDFs
        const pdfBlocks = results.filter(block => {
            if (block.type === 'file' || block.type === 'pdf') {
                // Check if it's a PDF file
                const file = block[block.type];
                if (file && typeof file === 'object' && 'file' in file) {
                    const url = file.file.url;
                    return url.toLowerCase().includes('.pdf') ||
                        url.includes('application/pdf');
                }
            }
            return false;
        });

        console.log(`Found ${pdfBlocks.length} PDF blocks`);

        // Map the blocks to the expected format
        const pdfPages = pdfBlocks.map(block => {
            const blockType = block.type;
            const fileObj = block[blockType];

            return {
                id: block.id,
                title: fileObj.caption && fileObj.caption.length > 0
                    ? fileObj.caption[0].plain_text
                    : `PDF Document (${block.id.slice(0, 8)})`,
                url: fileObj.file.url,
                lastModified: fileObj.file.expiry_time
            };
        });

        return pdfPages;
    } catch (error) {
        console.error('Error accessing Notion:', error);

        // Provide more detailed error information
        if (error.code === 'validation_error') {
            console.error('Validation error details:', error.body);
        }

        throw error;
    }
}

// Function to get a specific PDF by ID
export async function getPdfById(id) {
    try {
        // Get all PDFs first
        const allPdfs = await getAllPdfPages();

        // Find the specific PDF by ID
        const pdf = allPdfs.find(pdf => pdf.id === id);

        if (!pdf) {
            throw new Error(`PDF with ID ${id} not found`);
        }

        return pdf;
    } catch (error) {
        console.error(`Error getting PDF ${id}:`, error);
        throw error;
    }
}