#!/usr/bin/env python3
import re
import sys
import os
import json
import glob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

os.chdir(os.path.dirname(os.path.abspath(sys.argv[0])))


def extract_title(md: str) -> str:
    return re.search(r"""title\s*=\s*(["'])(.*?)\1""", md).group(2)


def extract_content(md: str) -> str:
    return re.match(r"^\n*\+\+\+\n.*\n\+\+\+\n*(.*)", md, re.DOTALL).group(1)


def strip(body: str) -> str:
    # fenced code blocks
    body = re.sub(r"```.*?```", "", body, flags=re.DOTALL)
    # inline code
    body = re.sub(r"`[^`]*`", "", body)
    # headers
    body = re.sub(r"^(#{1,6})\s+", "", body, flags=re.MULTILINE)
    # urls
    body = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", body)
    # images
    body = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", body)
    # empahsis
    body = re.sub(r"(\*\*\*|___|\*\*|__)", "", body)
    body = re.sub(r"(\*|_)", "", body)
    # blockquote
    body = re.sub(r"^\s*>\s?", "", body, flags=re.MULTILINE)
    # hr
    body = re.sub(r"^\s*(?:---|\*\*\*|\+\+\+)\s*$", "", body, flags=re.MULTILINE)
    # whitespace
    body = re.sub(r"\n{2,}", ". ", body)
    body = re.sub(r"\n+", ", ", body)
    body = re.sub(r"\s+", " ", body).strip()
    return body


def chunk(txt: str) -> List[str]:
    w = txt.split(" ")
    n = 5
    lst = []
    step = len(w) // 5
    for i in range(n - 1):
        lst.append(" ".join(w[i * step : (i + 1) * step]))
    lst.append(" ".join(w[step * (n - 1) :]))

    return lst


def rate(txt: str) -> int:
    scores = analyzer.polarity_scores(txt)
    return round((scores["compound"] + 1) / 2 * 100)


analyzer = SentimentIntensityAnalyzer()
sentiments = {}
for fn in glob.glob("./item/*.md"):
    if "_index.md" in fn:
        continue
    with open(fn, "r") as f:
        md = f.read()
        title = extract_title(md)
        body = extract_content(md)
        vals = list(map(rate, chunk(strip(md))))
        direction = "up" if vals[3] < vals[4] else "down"
        print(f"{title}: {direction} {vals}")
        sentiments[title] = {"direction": direction, "vals": vals}

with open("./item_sentiment.json", "w") as f:
    # sorted for efficient git, probably not needed?
    f.write(json.dumps({k: sentiments[k] for k in sorted(sentiments)}, indent=2))
