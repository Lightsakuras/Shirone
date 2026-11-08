import type { UserManager } from "oidc-client-ts";
import { isCommunityUrl } from "@/config/communityConfig";
import type { CommunityConfig } from "@/types/communityConfig";

let manager: UserManager | undefined;
/** SDK is loaded only after an enabled island needs authentication. Tokens stay tab-scoped. */
export async function authManager(
	config: CommunityConfig,
	base: string,
): Promise<UserManager> {
	if (!isCommunityUrl(config.auth.issuer) || !config.auth.clientId)
		throw new Error("AUTH_UNCONFIGURED");
	if (!manager) {
		const { UserManager, WebStorageStateStore } = await import(
			"oidc-client-ts"
		);
		manager = new UserManager({
			authority: config.auth.issuer,
			client_id: config.auth.clientId,
			redirect_uri: new URL(`${base}auth/callback/`, location.origin).href,
			post_logout_redirect_uri: new URL(`${base}community/`, location.origin)
				.href,
			response_type: "code",
			requestTimeoutInSeconds: 8,
			scope: config.auth.scope || "openid profile",
			userStore: new WebStorageStateStore({ store: sessionStorage }),
			stateStore: new WebStorageStateStore({ store: sessionStorage }),
			automaticSilentRenew: false,
			monitorSession: false,
			loadUserInfo: false,
			extraQueryParams: config.auth.audience
				? { audience: config.auth.audience }
				: {},
		});
	}
	return manager;
}
export async function accessToken(
	config: CommunityConfig,
	base: string,
): Promise<string | undefined> {
	if (!isCommunityUrl(config.auth.issuer) || !config.auth.clientId)
		return undefined;
	const user = await (await authManager(config, base)).getUser();
	return user && !user.expired ? user.access_token : undefined;
}
export async function login(
	config: CommunityConfig,
	base: string,
): Promise<void> {
	await (await authManager(config, base)).signinRedirect({
		state: { returnTo: location.pathname + location.search },
	});
}
export async function logout(
	config: CommunityConfig,
	base: string,
): Promise<void> {
	const auth = await authManager(config, base);
	// Always remove local tokens, including providers without end-session support.
	await auth.removeUser();
}
export async function completeLogin(
	config: CommunityConfig,
	base: string,
): Promise<void> {
	const user = await (await authManager(config, base)).signinRedirectCallback();
	const state = user.state as { returnTo?: string } | undefined;
	const target = state?.returnTo;
	// Return only to this origin; no callback data remains in browser history.
	const safe =
		target?.startsWith(base) &&
		!target.startsWith("//") &&
		!target.includes("\\")
			? target
			: `${base}space/`;
	location.replace(safe);
}
