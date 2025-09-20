// Toggle share menu
const shareBtn = document.getElementById('mainShareBtn');
const shareMenu = document.getElementById('shareMenu');
let isActive = false;

shareBtn.addEventListener('click', toggleShare);

function toggleShare() {
  isActive = !isActive;
  shareBtn.classList.toggle('active');
  
  const buttons = shareMenu.querySelectorAll('.social-btn');
  const radius = 140; // distance from center
  const angleStep = (2 * Math.PI) / buttons.length;

  buttons.forEach((btn, i) => {
    const angle = i * angleStep - Math.PI / 2; // start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (isActive) {
      btn.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 80}ms, 
                              opacity 0.5s ease ${i * 80}ms,
                              box-shadow 0.3s ease`;
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = `translate(${x}px, ${y}px) scale(1) translateZ(0)`;
        btn.style.pointerEvents = 'auto';
      }, i * 80);
    } else {
      btn.style.transition = `transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045) ${i * 50}ms, 
                              opacity 0.4s ease ${i * 50}ms,
                              box-shadow 0.3s ease`;
      setTimeout(() => {
        btn.style.opacity = '0';
        btn.style.transform = 'translate(0, 0) scale(0) translateZ(0)';
        btn.style.pointerEvents = 'none';
      }, i * 50);
    }
  });
}

// Copy link functionality
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', copyLink);

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    // Visual feedback for copy
    const originalBg = copyBtn.style.background;
    copyBtn.style.background = 'linear-gradient(to bottom, #10B981, #059669)';
    copyBtn.querySelector('.tooltip').textContent = 'Copied!';
    
    setTimeout(() => {
      copyBtn.style.background = originalBg;
      copyBtn.querySelector('.tooltip').textContent = 'Copy Link';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert("Failed to copy link. Please try again.");
  });
}

// Add click events for social buttons
document.querySelectorAll('.social-btn').forEach(btn => {
  if (btn.id !== 'copyBtn') {
    btn.addEventListener('click', () => {
      const type = btn.classList[1];
      alert(`Sharing via ${type} would happen here!`);
    });
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (isActive && !shareMenu.contains(e.target)) {
    toggleShare();
  }
});

// Add subtle hover effect to main button
shareBtn.addEventListener('mousemove', (e) => {
  const rect = shareBtn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const angleX = (y - centerY) / 10;
  const angleY = (centerX - x) / 10;
  
  if (!isActive) {
    shareBtn.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(5px)`;
  }
});

shareBtn.addEventListener('mouseleave', () => {
  if (!isActive) {
    shareBtn.style.transform = 'translateZ(0)';
  }
});
