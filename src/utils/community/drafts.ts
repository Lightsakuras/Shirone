export const localDraftKey = "shirone.community.draft.v1";
/** Cloud drafts may only be restored after authenticated owner identity is known. */
export function draftStorageTarget(
	id: string,
	ownerId?: string,
): { area: "local" | "session"; key: string } | null {
	if (ownerId)
		return { area: "session", key: `shirone.community.owner.${ownerId}` };
	return !id ? { area: "local", key: localDraftKey } : null;
}
export function isLocalDraft(value: unknown): value is Record<string, unknown> {
	return (
		!!value &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		!(value as Record<string, unknown>).id
	);
}
