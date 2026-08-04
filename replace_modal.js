const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\chitr\\Downloads\\my websites\\Mungphai';
const old_pattern = /<!-- BOOKING MODAL -->[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/g;
const new_modal = `<!-- BOOKING MODAL -->
  <div id="bookingModal" class="contact-modal-overlay">
    <div class="contact-modal-glass">
      <button id="modalClose" class="contact-modal-close" aria-label="Close modal">&times;</button>
      
      <h3 class="contact-modal-title">Book This Package</h3>
      <p class="contact-modal-subtitle">Choose your preferred way to connect with us.</p>
      
      <div class="contact-modal-cards-container">
        <!-- WhatsApp Card -->
        <div class="contact-modal-action-card">
          <div class="contact-modal-icon-wrapper">
            <i data-lucide="message-circle" style="width: 32px; height: 32px; color: #22c55e;"></i>
          </div>
          <h4 class="contact-modal-action-title">Book via WhatsApp</h4>
          <p class="contact-modal-action-desc">
            Chat with our travel team and receive an instant quotation.
          </p>
          <a href="#" target="_blank" id="modalWhatsappBtn" class="btn-contact-primary">
            <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i> Open WhatsApp
          </a>
        </div>
        
        <!-- Call Us Card -->
        <div class="contact-modal-action-card">
          <div class="contact-modal-icon-wrapper">
            <i data-lucide="phone" style="width: 32px; height: 32px; color: #22c55e;"></i>
          </div>
          <h4 class="contact-modal-action-title">Call Our Team</h4>
          <p class="contact-modal-action-desc">
            Speak directly with our travel expert.
          </p>
          <a href="tel:+918822918687" class="btn-contact-outline">
            <i data-lucide="phone" style="width: 18px; height: 18px;"></i> Call Now
          </a>
        </div>
      </div>
    </div>
  </div>`;

fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('<!-- BOOKING MODAL -->')) {
    const updatedContent = content.replace(old_pattern, new_modal);
    if (content !== updatedContent) {
      fs.writeFileSync(p, updatedContent);
      console.log('Updated ' + f);
    }
  }
});
