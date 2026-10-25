"""Install fictional demo data into a fresh checkout without replacing local records."""

from pathlib import Path
import shutil
import sys


ROOT = Path(__file__).resolve().parents[1]
FILES = ("countries.js", "transparency.js", "leru-members.js", "source-registry.csv")


def main():
    sources = [ROOT / "examples" / "data" / name for name in FILES]
    targets = [ROOT / "data" / name for name in FILES]
    if any(not source.is_file() for source in sources):
        print("Synthetic setup files are incomplete; nothing was copied.", file=sys.stderr)
        return 1
    if any(target.exists() or target.is_symlink() for target in targets):
        print("Existing data found; use a separate fresh checkout. Nothing was copied.", file=sys.stderr)
        return 1
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
    for source, target in zip(sources, targets):
        # Exclusive creation also protects records if another process creates a file.
        with source.open("rb") as incoming, target.open("xb") as outgoing:
            shutil.copyfileobj(incoming, outgoing)
    print("Installed four fictional demo files. These are not research findings.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
