#!/usr/bin/env python3
# 'play' a snake game that exports itself as a series of images
# used for creating a badge on theokrueger.dev/micro
from enum import Enum
import random
from datetime import datetime
from PIL import Image

random.seed(datetime.now().timestamp())


class E(Enum):
    N = (" ", "#eee8aaff")
    S = ("░", "#cd69c9ff")
    F = ("*", "#ff0000ff")


# row, col
GAME_DIMS = (4, 8)
IMG_DIMS = (15, 80)
GAME_OFFSET = (3, 3)
GAME_SCALE = 2

field = [[E.N] * GAME_DIMS[1] for _ in range(GAME_DIMS[0])]
pos = (2, 0)
tails = [(2, 7)]
field[pos[0]][pos[1]] = E.S
for p in tails:
    field[p[0]][p[1]] = E.S
alive = True
score = 1
steps = 0


def fp(
    np=None,  # (int,int)
    nv=None,  # E
) -> (int, int):
    q = pos

    if not np is None:
        q = np

    if not nv is None:
        field[q[0]][q[1]] = nv

    return field[q[0]][q[1]]


def wrap(n: int, m: int) -> int:
    if n < 0:
        return m + n
    if n >= m:
        return n - m
    return n


def print_field():
    print("/" + "-" * GAME_DIMS[1] + "\\")
    for r in field:
        print("|", end="")
        for c in r:
            print(c.value[0], end="")
        print("|")
    print("\\" + "-" * GAME_DIMS[1] + "/")
    print("turn:", steps, "score:", score)


def spawn_food():
    while True:
        r = random.randint(0, GAME_DIMS[0] - 1)
        c = random.randint(0, GAME_DIMS[1] - 1)
        if field[r][c] == E.N:
            field[r][c] = E.F
            return


dirs = ["l", "r", "u", "d"]
opp = ["r", "l", "d", "u"]
tfs = [(0, -1), (0, 1), (-1, 0), (1, 0)]
opp_last_dir = ""


def step():
    global alive, pos, score, opp_last_dir, steps
    print_field()
    d = ""
    while not d in dirs or d == opp_last_dir:
        d = input("enter u/d/l/r: ")
    opp_last_dir = opp[dirs.index(d)]
    tf = tfs[dirs.index(d)]
    np = (wrap(pos[0] + tf[0], GAME_DIMS[0]), wrap(pos[1] + tf[1], GAME_DIMS[1]))
    tails.append(pos)
    ns = fp(np=np)
    if ns == E.F:
        score += 1
        spawn_food()
    elif ns == E.S:
        alive = False
        print("you died")
        print("score:", score)
    else:
        t = tails.pop(0)
        field[t[0]][t[1]] = E.N

    pos = np
    fp(nv=E.S)
    steps += 1


def hex_to_rgba(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4, 6))


def field_to_png():
    img = Image.new("RGBA", (IMG_DIMS[1], IMG_DIMS[0]), hex_to_rgba("#00000000"))
    for r in range(GAME_DIMS[0]):
        for c in range(GAME_DIMS[1]):
            cell = field[r][c]
            color = hex_to_rgba(cell.value[1])
            for x in range(GAME_SCALE):
                for y in range(GAME_SCALE):
                    img.putpixel(
                        (
                            (GAME_OFFSET[1] + c * (GAME_SCALE - 1)) + c + x,
                            (GAME_OFFSET[0] + r * (GAME_SCALE - 1)) + r + y,
                        ),
                        color,
                    )
    img.save("field-" + str(steps) + ".png")


field[2][5] = E.F
field_to_png()
while alive:
    step()
    field_to_png()
