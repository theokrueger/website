#!/usr/bin/env python3
# create some firework effects
# used for creating a badge on theokrueger.dev/micro
from enum import Enum
import random
from dataclasses import dataclass
from datetime import datetime
from PIL import Image

random.seed(datetime.now().timestamp())

COLORS = ["#bfba50ff", "#938f3cff", "#bfba50ff", "#bfba50ff", "#938f3cff"]

N_FIREWORKS = 8
N_FRAMES = 200
FIREWORK_CHANCE = 0.4

# row, col
CANVAS_DIMS = (12, 52)
IMG_DIMS = (31, 88)
CANVAS_OFFSET = (5, 28)

works = [None] * N_FIREWORKS
frames = 0

FW_FRAMES = [
    [
        "     ",
        "     ",
        "  *  ",
        "     ",
        "     ",
    ],
    [
        "     ",
        "  *  ",
        " * * ",
        "  *  ",
        "     ",
    ],
    [
        "  *  ",
        "  *  ",
        "** **",
        "  *  ",
        "  *  ",
    ],
    [
        "  *  ",
        "     ",
        "*   *",
        "     ",
        "  *  ",
    ],
]
N_FW_FRAMES = len(FW_FRAMES)


@dataclass
class Firework:
    frame: int
    offset: (int, int)
    color: string

    def new(r, c) -> self:
        return Firework(0, (r, c), random.choice(COLORS))

    def pixels(self) -> [(int, int)]:
        fr = FW_FRAMES[self.frame]
        px = []
        for r in range(len(fr)):
            for c in range(len(fr[r])):
                if fr[r][c] == "*":
                    px.append((r + self.offset[0] - 2, c + self.offset[1] - 2))
        return px

    def advance(self) -> bool:
        self.frame += 1
        return self.frame >= N_FW_FRAMES


def frame():
    global frames
    for i in range(N_FIREWORKS):
        if works[i] != None and works[i].advance() == True:
            works[i] = None

    while random.random() < FIREWORK_CHANCE:
        for i in range(N_FIREWORKS):
            if works[i] == None:
                while True:
                    r_o = random.randint(2, CANVAS_DIMS[0] - 3) + CANVAS_OFFSET[0]
                    c_o = random.randint(2, CANVAS_DIMS[1] - 3) + CANVAS_OFFSET[1]

                    cont = False
                    for w in works:
                        if w != None:
                            tr, tc = w.offset
                            if not (
                                (r_o < tr - 4 or r_o > tr + 5)
                                or (c_o < tc - 4 or c_o > tc + 5)
                            ):
                                cont = True
                                break
                    if cont:
                        continue

                    works[i] = Firework.new(r_o, c_o)
                    break
                break

    print("frame", frames, "done")
    frames += 1


def hex_to_rgba(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4, 6))


def canvas_to_png():
    img = Image.open("./base.png")
    for w in works:
        if w == None:
            continue

        for r, c in w.pixels():
            color = hex_to_rgba(w.color)
            img.putpixel((c, r), color)

    img.save("canvas-" + str(frames) + ".png")


for _ in range(N_FRAMES):
    frame()
    canvas_to_png()
