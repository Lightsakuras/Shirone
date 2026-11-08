import { isCommunityUrl } from "@/utils/community/urls";

export { isCommunityUrl } from "@/utils/community/urls";

import type { CommunityConfig } from "@/types/communityConfig";
import { withUserConfig } from "@/utils/config-overlay";

export const communityConfig: CommunityConfig = withUserConfig("community", {
	// Production appearance release: cloud API and identity service are not configured yet.
	enable: false,
	apiUrl: "",
	trackViews: false,
	auth: { issuer: "", clientId: "", scope: "openid profile" },
});

export function resolveCommunityOptions(
	config: CommunityConfig = communityConfig,
): CommunityConfig | null {
	if (!config.enable || !isCommunityUrl(config.apiUrl)) return null;
	return { ...config, apiUrl: config.apiUrl.replace(/\/+$/, "") };
}
