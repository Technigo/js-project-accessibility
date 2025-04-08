function initAccordion() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  const buttons = accordion.querySelectorAll('.accordion-button');

  buttons.forEach((button, index) => {
    const targetId = button.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);

    // Säkerställ att panelens höjd är noll från början
    if (targetPanel) {
      targetPanel.style.maxHeight = '0';
    }

    // Hantera klick
    button.addEventListener('click', () => {
      togglePanel(button, targetPanel);
    });

    // Hantera tangentbord
    button.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          buttons[(index + 1) % buttons.length].focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          buttons[(index - 1 + buttons.length) % buttons.length].focus();
          break;
        case 'Home':
          event.preventDefault();
          buttons[0].focus();
          break;
        case 'End':
          event.preventDefault();
          buttons[buttons.length - 1].focus();
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          togglePanel(button, targetPanel);
          break;
      }
    });
  });

  function togglePanel(button, panel) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Stäng alla andra först
    buttons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const otherPanel = document.getElementById(btn.getAttribute('aria-controls'));
      if (otherPanel) {
        otherPanel.style.maxHeight = '0';
        otherPanel.hidden = true;
      }
    });

    // Öppna om den var stängd
    if (!isExpanded && panel) {
      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
}

document.addEventListener('DOMContentLoaded', initAccordion);
