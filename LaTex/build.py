#!/usr/bin/env python3
"""Generate main.tex (EN) and main_de.tex (DE) from one template + per-language JSON.

Single source of truth:
  - layout  -> template.tex.j2   (shared; small {% if lang == 'de' %} blocks)
  - content -> cv.en.json / cv.de.json

Run:  python build.py            (paths are resolved relative to this file, so
                                   it works both locally and in CI)

The generated main.tex / main_de.tex are build artifacts (git-ignored); the
LaTeX compile step consumes them exactly as before.
"""
import json
from pathlib import Path

import jinja2

HERE = Path(__file__).resolve().parent

# LaTeX special characters that must be escaped in free text. Order-independent
# because we translate character-by-character in a single pass (so the backslash
# replacement never re-processes backslashes it just introduced).
LATEX_SPECIALS = {
    "\\": r"\textbackslash{}",
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
}


def tex_escape(value):
    """Escape LaTeX specials so JSON can hold plain, human-readable text."""
    if value is None:
        return ""
    return "".join(LATEX_SPECIALS.get(ch, ch) for ch in str(value))


def pipe_enspace(value):
    """EN header separates inline items with \\enspace around the pipe."""
    return str(value).replace(" | ", r" \enspace|\enspace ")


# LaTeX-friendly delimiters: '{{' and '%' collide badly with LaTeX, so use
# \VAR{ } / \BLOCK{ } / \#{ } which never appear literally in this template.
env = jinja2.Environment(
    block_start_string=r"\BLOCK{",
    block_end_string="}",
    variable_start_string=r"\VAR{",
    variable_end_string="}",
    comment_start_string=r"\#{",
    comment_end_string="}",
    trim_blocks=True,
    lstrip_blocks=True,
    autoescape=False,
    keep_trailing_newline=True,
    loader=jinja2.FileSystemLoader(str(HERE)),
)
env.filters["tex"] = tex_escape
env.filters["pipe_enspace"] = pipe_enspace

TEMPLATE = "template.tex.j2"
OUTPUTS = {"cv.en.json": "main.tex", "cv.de.json": "main_de.tex"}


def main():
    template = env.get_template(TEMPLATE)
    for data_file, out_file in OUTPUTS.items():
        data = json.loads((HERE / data_file).read_text(encoding="utf-8"))
        rendered = template.render(**data)
        (HERE / out_file).write_text(rendered, encoding="utf-8")
        print(f"  {data_file}  ->  {out_file}")


if __name__ == "__main__":
    print("Generating CV LaTeX from JSON:")
    main()
    print("Done.")
