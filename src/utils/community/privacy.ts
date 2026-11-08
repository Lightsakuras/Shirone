/** View collection is opt-in and respects both browser privacy signals. */
export function shouldTrackCommunityViews(
	enabled: boolean | undefined,
	signals: { doNotTrack?: string | null; globalPrivacyControl?: boolean },
): boolean {
	return (
		enabled === true &&
		signals.doNotTrack !== "1" &&
		signals.doNotTrack !== "yes" &&
		signals.globalPrivacyControl !== true
	);
}
