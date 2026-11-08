import { cleanPublicPostPage, type PublicPostPage } from "./public-data";
import { isCommunityUrl } from "./urls";
/** Anonymous, public-only reads: never loads auth, sends cookies, or attaches bearer tokens. */
export class CommunityPublicClient {
	private pending = new Map<
		string,
		{ promise: Promise<PublicPostPage>; signal?: AbortSignal }
	>();
	constructor(private apiUrl: string) {}
	async list(
		kind: "posts" | "search",
		query = "",
		offset = 0,
		signal?: AbortSignal,
	): Promise<PublicPostPage> {
		if (!isCommunityUrl(this.apiUrl)) throw new Error("UNCONFIGURED");
		const params = new URLSearchParams({
			limit: "20",
			offset: String(Math.max(0, offset)),
		});
		if (kind === "search") params.set("q", query.trim().slice(0, 120));
		const path = `${this.apiUrl.replace(/\/+$/, "")}/v1/${kind}?${params}`;
		const existing = this.pending.get(path);
		if (existing && !existing.signal?.aborted) return existing.promise;
		const pending = this.read(path, signal);
		this.pending.set(path, { promise: pending, signal });
		try {
			return await pending;
		} finally {
			if (this.pending.get(path)?.promise === pending)
				this.pending.delete(path);
		}
	}
	private async read(
		path: string,
		signal?: AbortSignal,
	): Promise<PublicPostPage> {
		const response = await fetch(path, {
			credentials: "omit",
			referrerPolicy: "no-referrer",
			headers: { Accept: "application/json" },
			signal: AbortSignal.any([
				AbortSignal.timeout(8000),
				...(signal ? [signal] : []),
			]),
		});
		if (
			!response.ok ||
			!response.headers.get("content-type")?.includes("application/json")
		)
			throw new Error("PUBLIC_SERVICE_UNAVAILABLE");
		const reader = response.body?.getReader();
		if (!reader) throw new Error("INVALID_RESPONSE");
		const chunks: Uint8Array[] = [];
		let size = 0;
		while (true) {
			const chunk = await reader.read();
			if (chunk.done) break;
			size += chunk.value.byteLength;
			if (size > 524288) {
				await reader.cancel();
				throw new Error("RESPONSE_TOO_LARGE");
			}
			chunks.push(chunk.value);
		}
		const bytes = new Uint8Array(size);
		let position = 0;
		for (const chunk of chunks) {
			bytes.set(chunk, position);
			position += chunk.length;
		}
		return cleanPublicPostPage(JSON.parse(new TextDecoder().decode(bytes)));
	}
}
