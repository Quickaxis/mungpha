const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

const navItems = [
    { link: 'index.html', name: 'Home' },
    { link: 'about.html', name: 'About' },
    { link: 'packages.html', name: 'Packages' },
    { link: 'experiences.html', name: 'Experiences' },
    { link: 'services.html', name: 'Services' },
    { link: 'privacy-policy.html', name: 'Privacy Policy' }
];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getActiveItem(originalHtml) {
    let activeItem = null;
    for (const item of navItems) {
        const regex1 = new RegExp('<a[^>]*href=["\']' + escapeRegExp(item.link) + '["\'][^>]*class=["\'][^"\']*active[^"\']*["\']');
        const regex2 = new RegExp('<a[^>]*class=["\'][^"\']*active[^"\']*["\'][^>]*href=["\']' + escapeRegExp(item.link) + '["\']');
        if (regex1.test(originalHtml) || regex2.test(originalHtml)) {
            activeItem = item.link;
            break;
        }
    }
    return activeItem;
}

function buildHeroNav(originalHtml) {
    const activeItem = getActiveItem(originalHtml);
    let html = '<ul class="hero-nav-list">\n';
    for (const item of navItems) {
        const activeStr = item.link === activeItem ? ' class="active"' : '';
        html += `          <li class="hero-nav-item"><a href="${item.link}"${activeStr}>${item.name}</a></li>\n`;
    }
    html += '        </ul>';
    return html;
}

function buildHeroNavLight(originalHtml) {
    const activeItem = getActiveItem(originalHtml);
    let html = '<ul class="hero-nav-links-light">\n';
    for (const item of navItems) {
        const activeStr = item.link === activeItem ? ' class="active"' : '';
        html += `        <li><a href="${item.link}"${activeStr}>${item.name}</a></li>\n`;
    }
    html += '      </ul>';
    return html;
}

function buildDrawerNav(originalHtml) {
    let html = '<ul class="drawer-nav-links">\n';
    for (const item of navItems) {
        html += `      <li><a href="${item.link}" class="drawer-link">${item.name}</a></li>\n`;
    }
    html += '    </ul>';
    return html;
}

for (const f of files) {
    const filePath = path.join(__dirname, f);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Hero Nav List
    const heroNavRegex = /<ul class="hero-nav-list">[\s\S]*?<\/ul>/;
    const heroNavMatch = content.match(heroNavRegex);
    if (heroNavMatch) {
        const original = heroNavMatch[0];
        const newNav = buildHeroNav(original);
        content = content.replace(original, newNav);
    }
    
    // Hero Nav Light
    const lightNavRegex = /<ul class="hero-nav-links-light">[\s\S]*?<\/ul>/;
    const lightNavMatch = content.match(lightNavRegex);
    if (lightNavMatch) {
        const original = lightNavMatch[0];
        const newNav = buildHeroNavLight(original);
        content = content.replace(original, newNav);
    }
    
    // Drawer Nav List
    const drawerNavRegex = /<ul class="drawer-nav-links">[\s\S]*?<\/ul>/;
    const drawerNavMatch = content.match(drawerNavRegex);
    if (drawerNavMatch) {
        const original = drawerNavMatch[0];
        const newNav = buildDrawerNav(original);
        content = content.replace(original, newNav);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
}

console.log("Nav update completed successfully.");
