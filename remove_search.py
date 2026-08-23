import os
import glob
import re

directory = r"C:\Users\karan\Downloads\clg_management\frontend\src\pages\professor"
files = glob.glob(os.path.join(directory, "*.jsx"))

pattern = re.compile(r'\s*<div className="search-box">\s*<input placeholder="Search" />\s*<Search size=\{20\} />\s*</div>')

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    if pattern.search(content):
        content = pattern.sub("", content)
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Removed search box from {f}")
