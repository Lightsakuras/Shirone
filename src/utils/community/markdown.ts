export interface CommunityBlock {
	kind: "heading" | "paragraph" | "code" | "quote" | "list";
	text: string;
	level?: number;
}
/** A small, intentionally text-only Markdown subset. Raw HTML and links never execute. */
export function communityMarkdown(body: string): CommunityBlock[] {
	const lines = body.replace(/\r\n?/g, "\n").split("\n");
	const blocks: CommunityBlock[] = [];
	let index = 0;
	while (index < lines.length) {
		const line = lines[index];
		if (!line.trim()) {
			index++;
			continue;
		}
		if (/^\s*```/.test(line)) {
			const content: string[] = [];
			index++;
			while (index < lines.length && !/^\s*```\s*$/.test(lines[index]))
				content.push(lines[index++]);
			if (index < lines.length) index++;
			blocks.push({ kind: "code", text: content.join("\n") });
			continue;
		}
		const heading = /^(#{1,6})\s+(.+)$/.exec(line);
		if (heading) {
			blocks.push({
				kind: "heading",
				level: heading[1].length,
				text: heading[2],
			});
			index++;
			continue;
		}
		const kind = /^-\s/.test(line)
			? "list"
			: /^>\s?/.test(line)
				? "quote"
				: "paragraph";
		const content = [line];
		index++;
		while (
			index < lines.length &&
			lines[index].trim() &&
			!/^(?:#{1,6}\s|\s*```)/.test(lines[index])
		) {
			if (kind === "list" && !/^-\s/.test(lines[index])) break;
			if (kind === "quote" && !/^>\s?/.test(lines[index])) break;
			content.push(lines[index++]);
		}
		blocks.push({ kind, text: content.join("\n") });
	}
	return blocks;
}
