/** Pagefind can leak its internal end-weight sentinel into extracted title metadata.
 * Apply only to Pagefind titles, never to Markdown, excerpts, or remote article data.
 * Preserve punctuation and every non-sentinel title verbatim.
 */
export function cleanPagefindTitle(title: string): string {
	const sentinel = "___END_PAGEFIND_WEIGHT___";
	if (!title.includes(sentinel)) return title;
	return title.replaceAll(sentinel, "").trimEnd();
}
