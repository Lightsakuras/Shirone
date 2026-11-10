/** Reader runtime owns browser-only progress, with per-navigation cleanup.
 * No account/server data is stored; entries are scoped to the visible series.
 * Resume is explicit rather than unexpectedly scrolling on page entry.
 */
let dispose: (() => void) | undefined;
// A page choice made while Swup restores scroll must win after that restoration.
let navigationScrolling = false;
let flushPendingPage: (() => void) | undefined;
document.addEventListener("swup:scroll:start", () => {
	navigationScrolling = true;
});
document.addEventListener("swup:scroll:end", () => {
	navigationScrolling = false;
	flushPendingPage?.();
});
document.addEventListener("swup:visit:end", () => {
	flushPendingPage?.();
});
function initReader(): void {
	dispose?.();
	flushPendingPage = undefined;
	const reader = document.querySelector<HTMLElement>("[data-comic-reader]");
	if (!reader) return;
	const pages = Array.from(
		reader.querySelectorAll<HTMLElement>(".comic-reader figure"),
	);
	const select = reader.querySelector<HTMLSelectElement>("[data-comic-select]");
	const tools = reader.querySelector<HTMLElement>("[data-comic-tools]");
	const previous = reader.querySelector<HTMLButtonElement>("[data-comic-prev]");
	const next = reader.querySelector<HTMLButtonElement>("[data-comic-next]");
	const resume = reader.querySelector<HTMLAnchorElement>("[data-comic-resume]");
	if (!pages.length || !select || !tools || !previous || !next || !resume)
		return;
	const key = `sakura-reader-v1:${reader.dataset.comicReader}`;
	let current = 0,
		frame = 0,
		hasUserScroll = false;
	const save = (page: number) => {
		try {
			localStorage.setItem(key, String(page));
		} catch {}
	};
	try {
		const saved = Number(localStorage.getItem(key));
		if (Number.isInteger(saved) && saved > 1 && saved <= pages.length) {
			resume.href = `#page-${saved}`;
			resume.hidden = false;
		}
	} catch {}
	tools.hidden = false;
	const update = () => {
		frame = 0;
		const checkpoint = Math.max(
			Math.min(innerHeight * 0.35, 240),
			parseFloat(getComputedStyle(pages[0]).scrollMarginTop) + 2,
		);
		let active = 0;
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].getBoundingClientRect().top <= checkpoint) active = i;
			else break;
		}
		current = active;
		select.value = String(active + 1);
		previous.disabled = active === 0;
		next.disabled = active === pages.length - 1;
		reader.querySelectorAll(".comic-page-index a").forEach((a, i) => {
			if (i === active) a.setAttribute("aria-current", "page");
			else a.removeAttribute("aria-current");
		});
		// Browser scroll restoration/image layout must never overwrite a bookmark.
		if (
			hasUserScroll &&
			pages[0].getBoundingClientRect().top < innerHeight * 0.75
		)
			save(active + 1);
	};
	const onScroll = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};
	const applyPendingPage = () => {
		if (
			navigationScrolling ||
			document.documentElement.classList.contains("is-changing")
		)
			return;
		const number = Number(reader.dataset.pendingComicPage);
		if (!Number.isInteger(number) || number < 1 || number > pages.length)
			return;
		delete reader.dataset.pendingComicPage;
		// @swup/astro 1.8 currently uses ScrollPlugin 3 / Scrl. A history
		// restoration may outlive visit:end; cancel its RAF before an explicit jump.
		// ScrollPlugin 4 uses native scrolling, which the instant jump replaces.
		const plugin = window.swup?.findPlugin("SwupScrollPlugin") as
			| { scrl?: { _raf: number | null; options?: { onCancel?: () => void } } }
			| undefined;
		if (plugin?.scrl?._raf != null) {
			cancelAnimationFrame(plugin.scrl._raf);
			plugin.scrl._raf = null;
			plugin.scrl.options?.onCancel?.();
		}
		// A page command is an exact jump, not a second smooth-scroll animation
		// competing with Swup's restored position or the focused page selector.
		pages[number - 1].scrollIntoView({ block: "start", behavior: "instant" });
	};
	flushPendingPage = applyPendingPage;
	const go = (page: number) => {
		const index = Math.max(0, Math.min(pages.length - 1, page));
		hasUserScroll = false;
		save(index + 1);
		history.replaceState(history.state, "", `#page-${index + 1}`);
		reader.dataset.pendingComicPage = String(index + 1);
		applyPendingPage();
	};
	const prevClick = () => go(current - 1),
		nextClick = () => go(current + 1),
		selectChange = () => go(Number(select.value) - 1);
	const userScroll = () => {
		hasUserScroll = true;
	};
	const keyboardScroll = (event: KeyboardEvent) => {
		if (
			[
				"ArrowDown",
				"ArrowUp",
				"PageDown",
				"PageUp",
				"Home",
				"End",
				" ",
			].includes(event.key) &&
			!["INPUT", "SELECT", "TEXTAREA"].includes(
				(event.target as HTMLElement)?.tagName,
			)
		)
			hasUserScroll = true;
	};
	const anchorClick = (event: MouseEvent) => {
		const a = (event.target as Element).closest<HTMLAnchorElement>(
			".comic-page-index a,[data-comic-resume]",
		);
		if (a) {
			const number = Number(a.hash.replace("#page-", ""));
			if (number >= 1 && number <= pages.length) {
				event.preventDefault();
				event.stopPropagation();
				go(number - 1);
			}
		}
	};
	addEventListener("wheel", userScroll, { passive: true });
	addEventListener("touchmove", userScroll, { passive: true });
	addEventListener("keydown", keyboardScroll);
	reader.addEventListener("click", anchorClick);
	previous.addEventListener("click", prevClick);
	next.addEventListener("click", nextClick);
	select.addEventListener("change", selectChange);
	addEventListener("scroll", onScroll, { passive: true });
	addEventListener("resize", onScroll);
	update();
	applyPendingPage();
	dispose = () => {
		removeEventListener("wheel", userScroll);
		removeEventListener("touchmove", userScroll);
		removeEventListener("keydown", keyboardScroll);
		reader.removeEventListener("click", anchorClick);
		cancelAnimationFrame(frame);
		removeEventListener("scroll", onScroll);
		removeEventListener("resize", onScroll);
		previous.removeEventListener("click", prevClick);
		next.removeEventListener("click", nextClick);
		select.removeEventListener("change", selectChange);
	};
}
initReader();
document.addEventListener("DOMContentLoaded", initReader);
document.addEventListener("swup:page:view", initReader);
document.addEventListener("astro:page-load", initReader);
