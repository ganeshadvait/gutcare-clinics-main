"""Turn the Astro build (dist/) into standalone HTML pages that open straight from disk.

Root-relative URLs ("/_astro/x.css", "/about-gut-care/") don't resolve over file://, so each page's
links and asset paths are rewritten relative to that page, and folder links point at index.html.

Usage (from the project root, after `npm run build`):
    python scripts/make-portable.py dist html-pages
"""
import re
import shutil
import sys
from pathlib import Path

src, out = Path(sys.argv[1]), Path(sys.argv[2])
if out.exists():
    shutil.rmtree(out)
shutil.copytree(src, out)


def localise(url: str, prefix: str) -> str:
    """Rewrite one root-relative URL for a page that sits `prefix` (e.g. '../') below the site root."""
    if not url.startswith('/') or url.startswith('//'):
        return url
    path, sep, rest = re.match(r'([^?#]*)([?#]?)(.*)', url).groups()
    last = path.rsplit('/', 1)[-1]
    if '.' not in last:  # a page (folder) link -> its index.html
        path = path.rstrip('/') + '/index.html'
    return prefix + path.lstrip('/') + sep + rest


for page in out.rglob('*.html'):
    depth = len(page.relative_to(out).parts) - 1
    prefix = '../' * depth
    html = page.read_text(encoding='utf-8')
    html = re.sub(r'\b(href|src)="(/[^"]*)"', lambda m: f'{m[1]}="{localise(m[2], prefix)}"', html)
    html = re.sub(
        r'\bsrcset="([^"]*)"',
        lambda m: 'srcset="' + ', '.join(
            ' '.join([localise(part.split()[0], prefix), *part.split()[1:]]) for part in m[1].split(', ')
        ) + '"',
        html,
    )
    page.write_text(html, encoding='utf-8')

print(f'{sum(1 for _ in out.rglob("*.html"))} pages written to {out}')
