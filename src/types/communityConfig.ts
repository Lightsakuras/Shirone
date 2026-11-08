/** 可选社区服务；所有字段均为公开客户端配置，禁止放入密钥。 */
export interface CommunityConfig {
	/** 默认关闭；不输出组件、不加载客户端依赖。 */
	enable: boolean;
	/** Worker 根地址（HTTPS，不含 /v1）；本地开发可用 localhost。 */
	apiUrl: string;
	/** 聚合浏览量采集：默认关闭，尊重 DNT / GPC。 */
	trackViews?: boolean;
	/** OIDC 公开客户端配置；不设置 client secret。 */
	auth: {
		issuer: string;
		clientId: string;
		scope: string;
		/** 可选 API audience，必须与 Worker 验证配置一致。 */
		audience?: string;
	};
}
export type CommunityMode =
	| "feed"
	| "reader"
	| "guestbook"
	| "space"
	| "admin"
	| "callback"
	| "post";
