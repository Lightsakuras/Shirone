import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validateStaticFeed } from '../src/feeds.mjs';
const input = process.argv[2] || fileURLToPath(new URL('../../dist/community-static-feed.json',import.meta.url));
const output = process.argv[3] || new URL('../src/static-feed.mjs',import.meta.url);
// Invalidate first: an interrupted/failed build must never leave an older public snapshot deployable.
await writeFile(output,'// Static feed preparation incomplete; rebuild before deployment.\nexport default null;\n');
if (process.argv[2] === '--invalidate') {
  console.log('Invalidated previous static feed snapshot.');
  process.exit(0);
}
try {
  const bytes = await readFile(input);
  if (bytes.byteLength > 2 * 1024 * 1024) throw new Error('Public feed snapshot exceeds 2 MiB');
  const manifest = validateStaticFeed(JSON.parse(bytes.toString('utf8')));
  await writeFile(output,`// Generated from the public static build; no drafts, encrypted content, or article bodies.\nexport default ${JSON.stringify(manifest,null,2)};\n`);
  console.log(`Prepared ${manifest.posts.length} public static feed summaries.`);
} catch (error) {
  console.error(`Static feed preparation failed: ${error.message}`);
  process.exitCode = 1;
}
