# -*- coding: utf-8 -*-
"""
@author: moloch

    Copyright 2013


"""

import platform

if platform.system().lower() in ['linux', 'darwin']:

    # === Text Colors ===
    W = "\033[0m"  # default/white
    BLA = "\033[30m"  # black
    R = "\033[31m"  # red
    G = "\033[32m"  # green
    O = "\033[33m"  # orange
    BLU = "\033[34m"  # blue
    P = "\033[35m"  # purple
    C = "\033[36m"  # cyan
    GR = "\033[37m"  # gray

    # === Styles ===
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"

else:

    # Sets all colors to blank strings
    # === Text Colors ===
    W = ""
    BLA = ""
    R = ""
    G = ""
    O = ""
    BLU = ""
    P = ""
    C = ""
    GR = ""

    # === Styles ===
    BOLD = ""
    UNDERLINE = ""

# === Macros ===
INFO = BOLD + C + "[*] " + W
WARN = BOLD + R + "[!] " + W
PROMPT = BOLD + P + "[?] " + W
