const fs = require('fs');

const newCSS = `

/* ==========================================================================
   FLEET SHOWCASE REDESIGN (PREMIUM CENTERED)
   ========================================================================== */
.fleet-centered-layout {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(180deg, #ffffff, #f7faf8);
  border-radius: 32px;
  padding: 60px 20px;
  overflow: hidden;
}

.fleet-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-heading);
  font-size: clamp(80px, 15vw, 220px);
  font-weight: 800;
  color: #111827;
  opacity: 0.03;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  letter-spacing: 0.1em;
}

.fleet-image-centered {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 10px; /* Reduced bottom margin */
}

.fleet-image-centered img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15)); /* Soft shadow beneath */
  transform: scale(1.25); /* 25% larger to slightly overflow */
}

.fleet-details-centered {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.fleet-spec-pills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 24px auto;
  max-width: 400px;
}

.fleet-spec-pill-premium {
  background: #FFFFFF;
  border: 1px solid #E5E9E4;
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.fleet-btn-wide {
  width: 100%;
  max-width: 240px !important;
  margin: 0 auto;
}

/* Overriding the pill selector */
.fleet-pill-buttons {
  position: relative;
  z-index: 2;
}

.fleet-pill-btn {
  background: #FFFFFF !important;
  border: 1px solid #E5E9E4 !important;
  color: var(--color-text-secondary) !important;
  padding: 12px 28px !important;
  border-radius: 999px !important;
  font-weight: 600 !important;
  box-shadow: none !important;
}

.fleet-pill-btn.active {
  background: var(--color-forest-green) !important;
  color: #FFFFFF !important;
  border-color: var(--color-forest-green) !important;
  box-shadow: 0 6px 16px rgba(23, 107, 70, 0.25) !important;
}
`;

fs.appendFileSync('styles.css', newCSS);
console.log('Appended fleet showcase CSS');
