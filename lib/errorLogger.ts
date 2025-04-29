// lib/errorLogger.ts
import fs from 'fs';
import path from 'path';

export function logError(source: string, error: any): void {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stackTrace = error instanceof Error ? error.stack : 'No stack trace available';
  
  const logEntry = `[${timestamp}] [${source}] ERROR: ${errorMessage}\n${stackTrace}\n\n`;
  
  try {
    const logDir = path.join(process.cwd(), 'logs');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logPath = path.join(logDir, 'error.log');
    fs.appendFileSync(logPath, logEntry);
  } catch (logError) {
    console.error('Failed to write to error log:', logError);
    console.error('Original error:', errorMessage);
  }
}