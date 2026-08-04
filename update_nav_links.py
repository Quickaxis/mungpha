import os
import glob
import re

files = glob.glob("*.html")

nav_items = [
    ("index.html", "Home"),
    ("about.html", "About"),
    ("packages.html", "Packages"),
    ("experiences.html", "Experiences"),
    ("services.html", "Services"),
    ("privacy-policy.html", "Privacy Policy")
]

def build_hero_nav(original_html):
    active_item = None
    for link, name in nav_items:
        # Match class="active" or class="... active ..." on the a tag
        if re.search(r'<a[^>]*href=["\']' + re.escape(link) + r'["\'][^>]*class=["\'][^"\']*active[^"\']*["\']', original_html) or \
           re.search(r'<a[^>]*class=["\'][^"\']*active[^"\']*["\'][^>]*href=["\']' + re.escape(link) + r'["\']', original_html):
            active_item = link
            break
            
    html = '<ul class="hero-nav-list">\n'
    for link, name in nav_items:
        active_str = ' class="active"' if link == active_item else ''
        html += f'          <li class="hero-nav-item"><a href="{link}"{active_str}>{name}</a></li>\n'
    html += '        </ul>'
    return html

def build_hero_nav_light(original_html):
    active_item = None
    for link, name in nav_items:
        if re.search(r'<a[^>]*href=["\']' + re.escape(link) + r'["\'][^>]*class=["\'][^"\']*active[^"\']*["\']', original_html) or \
           re.search(r'<a[^>]*class=["\'][^"\']*active[^"\']*["\'][^>]*href=["\']' + re.escape(link) + r'["\']', original_html):
            active_item = link
            break
            
    html = '<ul class="hero-nav-links-light">\n'
    for link, name in nav_items:
        active_str = ' class="active"' if link == active_item else ''
        html += f'        <li><a href="{link}"{active_str}>{name}</a></li>\n'
    html += '      </ul>'
    return html

def build_drawer_nav(original_html):
    html = '<ul class="drawer-nav-links">\n'
    for link, name in nav_items:
        html += f'      <li><a href="{link}" class="drawer-link">{name}</a></li>\n'
    html += '    </ul>'
    return html

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Hero Nav List
    hero_nav_match = re.search(r'<ul class="hero-nav-list">.*?</ul>', content, flags=re.DOTALL)
    if hero_nav_match:
        original = hero_nav_match.group(0)
        new_nav = build_hero_nav(original)
        content = content.replace(original, new_nav)
        
    # Hero Nav Light
    light_nav_match = re.search(r'<ul class="hero-nav-links-light">.*?</ul>', content, flags=re.DOTALL)
    if light_nav_match:
        original = light_nav_match.group(0)
        new_nav = build_hero_nav_light(original)
        content = content.replace(original, new_nav)
        
    # Drawer Nav List
    drawer_nav_match = re.search(r'<ul class="drawer-nav-links">.*?</ul>', content, flags=re.DOTALL)
    if drawer_nav_match:
        original = drawer_nav_match.group(0)
        new_nav = build_drawer_nav(original)
        content = content.replace(original, new_nav)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Nav update completed successfully.")
