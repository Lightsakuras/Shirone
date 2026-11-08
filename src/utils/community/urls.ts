/** 只允许 HTTPS 或 loopback 开发地址，不接受凭据、查询串、片段。 */
export function isCommunityUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return (
			!url.username &&
			!url.password &&
			!url.search &&
			!url.hash &&
			(url.protocol === "https:" ||
				(url.protocol === "http:" &&
					["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)))
		);
	} catch {
		return false;
	}
}
