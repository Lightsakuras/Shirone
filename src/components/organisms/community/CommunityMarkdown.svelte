<script lang="ts">
import { communityMarkdown } from "@/utils/community/markdown";

let { body = "" }: { body: string } = $props();
const blocks = $derived(communityMarkdown(body));
</script>
<div class="community-prose">
	{#each blocks as block}
		{#if block.kind === "heading" && (block.level || 1) <= 2}<h2>{block.text}</h2>
		{:else if block.kind === "heading"}<h3>{block.text}</h3>
		{:else if block.kind === "code"}<pre><code>{block.text}</code></pre>
		{:else if block.kind === "quote"}<blockquote>{block.text.replace(/^>\s?/gm, "")}</blockquote>
		{:else if block.kind === "list"}<ul>{#each block.text.split("\n") as line}<li>{line.replace(/^-\s/, "")}</li>{/each}</ul>
		{:else}<p>{block.text}</p>{/if}
	{/each}
</div>
