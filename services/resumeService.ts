import {
    createNotionClient,
} from "@/lib/notionClient";
import { NotionBlock, NotionError, NotionFileBlock, NotionPdfBlock, PdfPage } from "@/types/resume";

const apiKey = process.env.NOTION_TOKEN!
const notionClient = createNotionClient(apiKey);

const PARENT_PAGE_ID = process.env.NOTION_PDF_PAGE_ID?.replace(/"/g, '') || '';
// Helper type guards
function isFileBlock(block: NotionBlock): block is NotionFileBlock {
    return block.type === 'file' && 'file' in block;
}

function isPdfBlock(block: NotionBlock): block is NotionPdfBlock {
    return block.type === 'pdf' && 'pdf' in block;
}

function isPdfFileBlock(block: NotionBlock): block is NotionFileBlock | NotionPdfBlock {
    return isFileBlock(block) || isPdfBlock(block);
}
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
        const blocks = results as NotionBlock[];
        // Filter for file blocks that contain PDFs
        const pdfBlocks = blocks.filter((block):block is NotionFileBlock | NotionPdfBlock => {
            if (!isPdfFileBlock(block)) {
                return false;
            }
            const fileObj = block.type === 'file' ? block.file : block.pdf;
            
            if (fileObj && typeof fileObj === 'object' && 'file' in fileObj) {
                const url: string = fileObj.file.url;
                return url.toLowerCase().includes('.pdf') ||
                    url.includes('application/pdf');
            }
            
            return false;
        });

        console.log(`Found ${pdfBlocks.length} PDF blocks`);

        // Map the blocks to the expected format
        const pdfPages: PdfPage[] = pdfBlocks.map((block): PdfPage => {
            const fileObj = block.type === 'file' ? block.file : block.pdf;

            const title = fileObj.caption && fileObj.caption.length > 0
                ? fileObj.caption[0].plain_text
                : `PDF Document (${block.id.slice(0, 8)})`;

            return {
                id: block.id,
                title,
                url: fileObj.file.url,
                lastModified: fileObj.file.expiry_time
            };
        });

        return pdfPages;
    } catch (error) {
       console.error('Error accessing Notion:', error);

        // Type guard for NotionError
        const notionError = error as NotionError;
        
        // Provide more detailed error information
        if (notionError.code === 'validation_error') {
            console.error('Validation error details:', notionError.body);
        }

        throw error;
    }
}

// Function to get a specific PDF by ID
export async function getPdfById(id: string): Promise<PdfPage> {
    try {
        // Get all PDFs first
        const allPdfs: PdfPage[] = await getAllPdfPages();

        // Find the specific PDF by ID
        const pdf = allPdfs.find((pdf) => pdf.id === id);

        if (!pdf) {
            throw new Error(`PDF with ID ${id} not found`);
        }

        return pdf;
    } catch (error) {
        console.error(`Error getting PDF ${id}:`, error);
        throw error;
    }
}