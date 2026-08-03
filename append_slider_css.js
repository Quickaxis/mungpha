const fs = require('fs');

const newCSS = `

/* ==========================================================================
   FLEET SLIDER REDESIGN
   ========================================================================== */
.fleet-slider-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fleet-arrow-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #E5E9E4;
  color: var(--color-forest-green);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.fleet-arrow-btn:hover {
  background: var(--color-forest-green);
  color: #fff;
  transform: translateY(-50%) scale(1.05);
  border-color: var(--color-forest-green);
}

.fleet-arrow-btn.left {
  left: -20px;
}

.fleet-arrow-btn.right {
  right: -20px;
}

/* Dots */
.fleet-dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.fleet-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #E7EAE5;
  border: 1px solid #D1D5CB;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fleet-dot.active {
  background: var(--color-forest-green);
  border-color: var(--color-forest-green);
  transform: scale(1.2);
}

/* Animations */
.fleet-fading-out {
  opacity: 0 !important;
  transform: translateX(-20px) !important;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out !important;
}

.fleet-fading-in {
  opacity: 1 !important;
  transform: translateX(0) !important;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out !important;
}

.fleet-element {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

/* Fixed height for details to prevent jumping */
.fleet-details-centered {
  min-height: 420px;
}

@media (max-width: 768px) {
  .fleet-arrow-btn {
    width: 40px;
    height: 40px;
  }
  .fleet-arrow-btn.left {
    left: 10px;
  }
  .fleet-arrow-btn.right {
    right: 10px;
  }
  .fleet-details-centered {
    min-height: 460px; /* Taller on mobile to account for wrapping text */
  }
}
`;

fs.appendFileSync('styles.css', newCSS);
console.log('Appended slider CSS');
