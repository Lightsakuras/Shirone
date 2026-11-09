/* Optional, dependency-free persistent-shell runtime. Injected only when enabled. */
(() => {
	const root = document.documentElement;
	const defaultMode =
		document.currentScript?.dataset.visualStyleDefault || "sakura";
	const modes = ["sakura", "journal", "atelier", "starlit"];
	const key = "shirone-visual-style";
	const readKey = (name) => {
		try {
			return localStorage.getItem(name);
		} catch {
			return null;
		}
	};
	const read = () => readKey(key);
	const colorKey = "shirone-visual-color";
	const motionKey = "shirone-visual-motion";
	const syncMotion = (paused) => {
		root.dataset.visualMotion = paused ? "paused" : "running";
		document.querySelectorAll("[data-visual-flow-pause]").forEach((input) => {
			input.checked = paused;
		});
	};
	let flowObserver;
	const observeFlow = () => {
		flowObserver?.disconnect();
		root.dataset.visualFlowVisible = "true";
		if (typeof IntersectionObserver !== "undefined") {
			flowObserver = new IntersectionObserver((entries) => {
				root.dataset.visualFlowVisible = String(
					entries.some((entry) => entry.isIntersecting),
				);
			});
			const flow = document.querySelector(".editorial-home");
			if (flow) flowObserver.observe(flow);
		}
	};
	const paletteSignature = () =>
		["hue", "mc-style", "mc-spec"].map(readKey).join("|");
	let signatureBeforeSettings = paletteSignature();
	const syncColor = (color) => {
		root.dataset.visualColor = color === "personal" ? "personal" : "curated";
		document.querySelectorAll("button[data-visual-color]").forEach((button) => {
			button.setAttribute(
				"aria-pressed",
				String(button.dataset.visualColor === root.dataset.visualColor),
			);
		});
	};
	const chooseColor = (color) => {
		syncColor(color);
		try {
			localStorage.setItem(colorKey, root.dataset.visualColor);
		} catch {
			/* Session-only fallback. */
		}
	};
	const sync = (mode) => {
		root.dataset.visualStyle = modes.includes(mode) ? mode : defaultMode;
		document.querySelectorAll("button[data-visual-style]").forEach((button) => {
			button.setAttribute(
				"aria-pressed",
				String(button.dataset.visualStyle === root.dataset.visualStyle && (!button.dataset.creativeEdition || button.dataset.creativeEdition === root.dataset.creativeEdition)),
			);
		});
	};
	if (window.__shironeVisualStyleBound) {
		sync(root.dataset.visualStyle);
		syncColor(root.dataset.visualColor);
		return;
	}
	syncMotion(readKey(motionKey) === "paused");
	sync(read());
	const storedColor = readKey(colorKey);
	// Existing explicit color settings win on first adoption. Save only our own
	// independent choice before settings hydration persists its default values.
	chooseColor(
		storedColor === "personal" || storedColor === "curated"
			? storedColor
			: ["hue", "mc-style", "mc-spec"].some((name) => readKey(name) !== null)
				? "personal"
				: "curated",
	);
	window.__shironeVisualStyleBound = true;
	const close = () =>
		document
			.querySelectorAll("[data-visual-style-picker][open]")
			.forEach((picker) => {
				picker.removeAttribute("open");
			});
	document.addEventListener(
		"DOMContentLoaded",
		() => {
			sync(root.dataset.visualStyle);
			syncColor(root.dataset.visualColor);
			syncMotion(root.dataset.visualMotion === "paused");
			observeFlow();
		},
		{ once: true },
	);
	document.addEventListener("click", (event) => {
		if (!(event.target instanceof Element)) return;
		if (event.target.closest("#display-settings-switch"))
			signatureBeforeSettings = paletteSignature();
		const colorButton = event.target.closest("button[data-visual-color]");
		if (colorButton) {
			chooseColor(colorButton.dataset.visualColor);
			return;
		}
		const button = event.target.closest(
			"button[data-visual-style], button[data-visual-style-reset]",
		);
		if (button) {
			const reset = button.hasAttribute("data-visual-style-reset");
			const mode = reset ? defaultMode : button.dataset.visualStyle;
			if (!modes.includes(mode)) return;
			try {
				reset ? localStorage.removeItem(key) : localStorage.setItem(key, mode);
			} catch {
				/* Private mode: selection still works for this session. */
			}
			sync(mode);
			window.dispatchEvent(new Event("resize"));
			document.dispatchEvent(
				new CustomEvent("visual-style:change", { detail: { mode } }),
			);
		} else if (!event.target.closest("[data-visual-style-picker]")) close();
	});
	// If visitors deliberately change the existing hue/style/spec controls, show
	// that choice immediately instead of leaving a curated overlay in its way.
	const honorPersonalColorEdit = (event) => {
		if (
			!(event.target instanceof Element) ||
			!event.target.closest("#display-setting")
		)
			return;
		setTimeout(() => {
			const next = paletteSignature();
			if (next !== signatureBeforeSettings) chooseColor("personal");
			signatureBeforeSettings = next;
		}, 0);
	};
	for (const type of ["input", "change", "click"])
		document.addEventListener(type, honorPersonalColorEdit);
	document.addEventListener("change", (event) => {
		if (!(event.target instanceof Element)) return;
		const input = event.target.closest("[data-visual-flow-pause]");
		if (!input) return;
		syncMotion(input.checked);
		try {
			localStorage.setItem(motionKey, root.dataset.visualMotion);
		} catch {
			/* Session only. */
		}
	});
	document.addEventListener("visibilitychange", () => {
		root.dataset.visualPageHidden = String(document.hidden);
	});
	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape") return;
		const open = document.querySelector("[data-visual-style-picker][open]");
		if (open) {
			close();
			open.querySelector("summary")?.focus();
		}
	});
	window.addEventListener("storage", (event) => {
		if (event.key === motionKey || event.key === null)
			syncMotion(readKey(motionKey) === "paused");
		if (event.key === key || event.key === null) sync(read());
		if (event.key === colorKey || event.key === null)
			syncColor(readKey(colorKey));
	});
	window.addEventListener("popstate", close);
	// The picker and root live outside #swup-container; delegated handlers survive replacement.
	document.addEventListener("swup:page:view", () => {
		close();
		syncMotion(root.dataset.visualMotion === "paused");
		observeFlow();
		sync(root.dataset.visualStyle);
		syncColor(root.dataset.visualColor);
	});
})();
