import type { CommunityConfig } from "@/types/communityConfig";
import { accessToken } from "./auth";

export interface CommunityPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	body: string;
	status: "draft" | "published";
	publishedAt?: string;
	updatedAt?: string;
}
export interface CommunityComment {
	id: string;
	body: string;
	displayName?: string;
	createdAt?: string;
	status?: string;
	target?: string;
}
export interface CommunityMember {
	commentPagination?: { hasMore?: boolean };
	bookmarkPagination?: { hasMore?: boolean };
	user: { id: string; displayName: string; bio: string; isOwner: boolean };
	bookmarks: { target: string; title?: string }[];
	comments: CommunityComment[];
}
export interface Reactions {
	likes: number;
	liked: boolean;
	bookmarked: boolean;
}
export class CommunityError extends Error {
	constructor(
		public code: string,
		public status = 0,
	) {
		super(code);
	}
}

/** Per-island client: abort on unmount/navigation, 8s timeout, deduplicated reads. */
export class CommunityClient {
	private controller = new AbortController();
	private pending = new Map<string, Promise<unknown>>();
	private submissions = new Map<string, string>();
	constructor(
		private config: CommunityConfig,
		private base: string,
	) {}
	destroy(): void {
		this.controller.abort();
		this.pending.clear();
	}
	async request<T>(path: string, method = "GET", data?: unknown): Promise<T> {
		if (method === "GET" && this.pending.has(path))
			return this.pending.get(path) as Promise<T>;
		const task = this.fetch<T>(path, method, data);
		if (method === "GET") this.pending.set(path, task);
		try {
			return await task;
		} finally {
			this.pending.delete(path);
		}
	}
	private async fetch<T>(
		path: string,
		method: string,
		data?: unknown,
	): Promise<T> {
		const token = await accessToken(this.config, this.base);
		const submission =
			method === "POST" && (path === "/comments" || path === "/admin/posts")
				? `${path}:${JSON.stringify(data)}`
				: "";
		if (submission && !this.submissions.has(submission))
			this.submissions.set(submission, crypto.randomUUID());
		const idempotencyKey = this.submissions.get(submission);
		const response = await fetch(
			`${this.config.apiUrl.replace(/\/+$/, "")}/v1${path}`,
			{
				method,
				credentials: "omit",
				referrerPolicy: "no-referrer",
				headers: {
					Accept: "application/json",
					...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
					...(data ? { "Content-Type": "application/json" } : {}),
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: data === undefined ? undefined : JSON.stringify(data),
				signal: AbortSignal.any([
					this.controller.signal,
					AbortSignal.timeout(8000),
				]),
			},
		);
		if (!response.headers.get("content-type")?.includes("application/json"))
			throw new CommunityError("INVALID_RESPONSE", response.status);
		const reader = response.body?.getReader();
		if (!reader) throw new CommunityError("INVALID_RESPONSE");
		const chunks: Uint8Array[] = [];
		let bytes = 0;
		while (true) {
			const part = await reader.read();
			if (part.done) break;
			bytes += part.value.byteLength;
			if (bytes > 524288) {
				await reader.cancel();
				throw new CommunityError("RESPONSE_TOO_LARGE");
			}
			chunks.push(part.value);
		}
		const all = new Uint8Array(bytes);
		let offset = 0;
		for (const chunk of chunks) {
			all.set(chunk, offset);
			offset += chunk.length;
		}
		const value = JSON.parse(new TextDecoder().decode(all));
		if (!response.ok)
			throw new CommunityError(
				typeof value?.error?.code === "string"
					? value.error.code
					: "REQUEST_FAILED",
				response.status,
			);
		if (!value || typeof value !== "object" || Array.isArray(value))
			throw new CommunityError("INVALID_RESPONSE");
		// A confirmed response completes this attempt; a later identical submission is new.
		if (submission) this.submissions.delete(submission);
		return value as T;
	}
}
export { cleanComments, cleanPosts } from "./data";
