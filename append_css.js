const fs = require('fs');

const newCSS = `

/* ==========================================================================
   MASSIVE MOBILE REDESIGN (XPLORE XPERIENCE STYLE)
   ========================================================================== */
@media (max-width: 768px) {
  /* 1. Reduce vertical spacing by 35-40% */
  .section { padding: 45px 0 !important; }
  
  /* 2. Typography */
  h2, .heading-section-60 { 
    font-size: 34px !important; 
    line-height: 1.2 !important; 
    margin-bottom: 12px !important; 
  }
  h3, h4, .heading-card-36, .heading-title-48, .compact-title { 
    font-size: 22px !important; 
    line-height: 1.3 !important; 
    margin-bottom: 6px !important;
  }
  p, .text-muted, .editorial-text-block p, .compact-desc { 
    font-size: 15px !important; 
    line-height: 1.5 !important; 
    margin: 0 !important;
  }
  
  /* 3. Standardize Cards */
  .glass-floating-card, .dest-card, .booking-step-card, .editorial-row-card {
    background: #FFFFFF !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
    border: 1px solid #E5E9E4 !important;
    padding: 20px !important;
  }

  /* Reduce gap in grids */
  .booking-steps-grid {
    gap: 16px !important;
  }
  
  /* 4. Compact Feature Classes (for new HTML structures) */
  .compact-hz-card {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 16px !important;
    height: auto !important;
    min-height: 100px !important;
    max-height: 140px !important;
    padding: 16px !important;
    text-align: left !important;
    background: #FFFFFF !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
    border: 1px solid #E5E9E4 !important;
  }
  .compact-hz-card i {
    flex-shrink: 0;
    width: 32px !important;
    height: 32px !important;
  }
  .compact-vt-card {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
    height: auto !important;
    min-height: 110px !important;
    max-height: 180px !important;
    padding: 20px !important;
    text-align: left !important;
    background: #FFFFFF !important;
    border-radius: 20px !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
    border: 1px solid #E5E9E4 !important;
  }
  .compact-vt-card i {
    width: 32px !important;
    height: 32px !important;
  }
}
`;

fs.appendFileSync('styles.css', newCSS);
console.log('Appended mobile redesign CSS to styles.css');
