import os
import glob
import re

files = glob.glob("*.html")
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Desktop Nav (hero-nav-list and hero-nav-links-light)
    content = re.sub(r'<li class="hero-nav-item"><a href="[^"]*#?contact.*?">Contact</a></li>\s*', '', content)
    content = re.sub(r'<li class="hero-nav-item"><a href="[^"]*#?location.*?">Location</a></li>\s*', '', content)
    content = re.sub(r'<li><a href="[^"]*#?contact.*?">Contact</a></li>\s*', '', content)
    content = re.sub(r'<li><a href="[^"]*#?location.*?">Location</a></li>\s*', '', content)

    # Drawer Nav specific
    content = re.sub(r'<li><a href="[^"]*#?contact.*?" class="drawer-link">Contact</a></li>\s*', '', content)
    content = re.sub(r'<li><a href="[^"]*#?location.*?" class="drawer-link">Location</a></li>\s*', '', content)

    # Insert Destinations if missing (and we assume Packages is there)
    # Sticky Nav
    if '>Destinations</a></li>' not in content:
        # Check for sticky nav
        content = re.sub(r'(<li class="hero-nav-item"><a href="packages\.html".*?>Packages</a></li>)',
                         r'<li class="hero-nav-item"><a href="index.html#destinations">Destinations</a></li>\n          \1',
                         content)
        # Check for drawer nav
        content = re.sub(r'(<li><a href="packages\.html" class="drawer-link".*?>Packages</a></li>)',
                         r'<li><a href="index.html#destinations" class="drawer-link">Destinations</a></li>\n      \1',
                         content)

    # 3. Drawer social icons
    content = re.sub(r'<div class="drawer-social-icons">.*?</div>', r'<div class="drawer-social-icons" style="display: none;"></div>', content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Done")
