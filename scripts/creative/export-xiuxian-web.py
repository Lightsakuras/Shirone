"""Export the interactive game's player files. Requires Node, Pillow, fonttools and brotli.
Usage: python scripts/creative/export-xiuxian-web.py PATH_TO_GAME_CHECKOUT
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import re
import shutil
import subprocess

from PIL import Image
from fontTools import subset
from fontTools.ttLib import TTFont


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("game", type=Path)
    source = parser.parse_args().game.resolve()
    output = Path(__file__).resolve().parents[2] / "public/games/xiuxian-interactive"
    inventory = subprocess.check_output(
        ["node", "-e", "process.stdout.write(JSON.stringify(require('./tools/game-files.cjs').collectGameFiles(process.cwd())))"],
        cwd=source, encoding="utf-8",
    )
    files = [file for file in json.loads(inventory) if not file.endswith(".cmd")]
    images = {file for file in files if file.endswith(".png")}
    fonts = {file for file in files if file.endswith(".ttf")}
    characters = set(chr(n) for n in range(32, 127))
    for file in files:
        if Path(file).suffix in {".html", ".css", ".js", ".md", ".txt"}:
            characters.update((source / file).read_text(encoding="utf-8"))
    if any(str(Path(file).with_suffix(".webp")).replace("\\", "/") in files for file in images):
        raise ValueError("A WebP already uses an exported PNG's filename")

    templates = {"assets/art-v120/${id}.png",
                 "assets/art-v120/hehuan-${id==='dual'?'harmony':'siphon'}.png",
                 "assets/art-v160/'+id+'.png"}
    artwork_path = re.compile("|".join(re.escape(path) for path in sorted(images | templates)))

    # The campaign includes authoring references in its data and validation snapshots.
    # Keep the source-relative portion consistent in every exported definition.
    workstation = re.compile(r"[A-Za-z]:/Users/[^/]+/Coze/Drive/修仙小程序/xiuxian-mingyun-lu/")

    def export(file):
        src = source / file
        dest = output / file
        dest.parent.mkdir(parents=True, exist_ok=True)
        if file in images:
            with Image.open(src) as image:
                image.save(dest.with_suffix(".webp"), format="WEBP", quality=90, method=4, exact=True)
        elif file in fonts:
            with TTFont(src) as font:
                subsetter = subset.Subsetter()
                subsetter.populate(text="".join(sorted(characters)))
                subsetter.subset(font)
                font.flavor = "woff2"
                font.save(dest.with_suffix(".woff2"))
        elif src.suffix in {".js", ".html", ".css"}:
            # Includes the templates that build an artwork path from the selected background.
            content = artwork_path.sub(lambda match: match[0][:-4] + ".webp", src.read_text(encoding="utf-8"))
            if src.suffix == ".css":
                for name in fonts:
                    content = content.replace(name, "/games/xiuxian-interactive/" + name[:-4] + ".woff2")
                content = content.replace('format("truetype")', 'format("woff2")')
            dest.write_bytes(workstation.sub("", content).encode("utf-8"))
        else:
            shutil.copyfile(src, dest)

    with ThreadPoolExecutor(max_workers=4) as executor:
        list(executor.map(export, files))
    print(f"Exported {len(files)} player files including {len(images)} converted PNGs")


if __name__ == "__main__":
    main()
