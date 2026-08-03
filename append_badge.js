const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const badgeCSS = 
/* COMING SOON BADGE FOR PACKAGES */
.package-coming-soon-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: var(--color-forest-green);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 12px;
  border-radius: 999px;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  font-family: var(--font-body);
}

.premium-package-img-overlay-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
  z-index: 1;
}
;

if (!css.includes('.package-coming-soon-badge')) {
    css += '\n' + badgeCSS;
    fs.writeFileSync('styles.css', css, 'utf8');
    console.log("CSS added.");
} else {
    console.log("CSS already exists.");
}
