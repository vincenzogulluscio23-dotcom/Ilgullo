import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

/**
 * Manual, non-destructive export script for Sanity CMS dataset & documents.
 * Usage: npx tsx scripts/exportSanityData.ts
 */

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'va4dfcn6';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-03-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function runSanityBackup() {
  console.log(`[Backup] Starting Sanity dataset backup for Project ID: ${projectId}, Dataset: ${dataset}...`);

  const backupDir = path.join(process.cwd(), 'backup_sanity');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  try {
    const documents = await client.fetch(`*`);
    console.log(`[Backup] Fetched ${documents.length} total Sanity documents.`);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilePath = path.join(backupDir, `sanity_backup_${dataset}_${timestamp}.json`);

    const manifest = {
      projectId,
      dataset,
      exportedAt: new Date().toISOString(),
      documentCount: documents.length,
      documents,
    };

    fs.writeFileSync(backupFilePath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`[Backup] Sanity export completed successfully!`);
    console.log(`[Backup] Saved to: ${backupFilePath}`);
  } catch (error) {
    console.error(`[Backup] Export error:`, error);
  }
}

runSanityBackup();
