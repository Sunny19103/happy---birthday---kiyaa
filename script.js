// ========== TOMBOL MULAI ==========
const startBtn = document.getElementById('startButton');
if (startBtn) {
    startBtn.addEventListener('click', function() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        startParticles();
    });
}

// ========== NAVIGASI ==========
let currentPage = 1;

function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${pageNumber}`).classList.add('active');
    currentPage = pageNumber;
}

document.getElementById('next1')?.addEventListener('click', () => showPage(2));
document.getElementById('next2')?.addEventListener('click', () => showPage(3));
document.getElementById('next3')?.addEventListener('click', () => showPage(4));
document.getElementById('next4')?.addEventListener('click', () => showPage(5));

document.getElementById('back2')?.addEventListener('click', () => showPage(1));
document.getElementById('back3')?.addEventListener('click', () => showPage(2));
document.getElementById('back4')?.addEventListener('click', () => showPage(3));
document.getElementById('back5')?.addEventListener('click', () => showPage(4));

// ========== MUSIK ==========
const audio = document.getElementById('birthdaySong');
document.getElementById('playBtn')?.addEventListener('click', () => audio?.play());
document.getElementById('pauseBtn')?.addEventListener('click', () => audio?.pause());

// ========== EFEK KONFETI SAAT KLIK ==========
function createConfetti() {
    const colors = ['#e8c8a0', '#d4b88c', '#c9a06c', '#f0d0a8', '#ffd93d', '#b88c5a'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 8 + 4;
        confetti.style.position = 'fixed';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '1px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], { duration: 1500 + Math.random() * 1000 });
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

// ========== PARTIKEL JATUH (SEDIKIT LEBIH RAMAI) ==========
let particleInterval = null;

function startParticles() {
    if (particleInterval) clearInterval(particleInterval);
    
    // Partikel setiap 350ms (sedikit lebih sering)
    particleInterval = setInterval(() => {
        // Kadang 1, kadang 2 partikel
        const jumlah = Math.random() > 0.6 ? 2 : 1;
        for (let i = 0; i < jumlah; i++) {
            createFallingParticle();
        }
    }, 350);
}

function stopParticles() {
    if (particleInterval) {
        clearInterval(particleInterval);
        particleInterval = null;
    }
}

function createFallingParticle() {
    // WARNA SOFT (tambah sedikit variasi)
    const colors = [
        '#e8c8a0', '#d4b88c', '#c9a06c', '#f0d0a8', 
        '#ffd93d', '#b88c5a', '#e0c8a0', '#ffaa66',
        '#f5e6d3', '#eeddcc'
    ];
    
    // Bentuk (tambah sedikit variasi)
    const shapes = ['●', '○', '✦', '♥', '▪', '●', '○', '●', '✦'];
    
    const particle = document.createElement('div');
    
    // 65% bentuk bulat/kotak, 35% bentuk bintang/hati
    if (Math.random() < 0.65) {
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particle.style.textContent = '';
    } else {
        particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        particle.style.fontSize = (Math.random() * 12 + 10) + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = 'auto';
        particle.style.height = 'auto';
        particle.style.backgroundColor = 'transparent';
    }
    
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-20px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.opacity = Math.random() * 0.6 + 0.3;
    
    document.body.appendChild(particle);
    
    // Animasi jatuh
    const duration = 2500 + Math.random() * 1500;
    const startTime = performance.now();
    const startTop = -20;
    const endTop = window.innerHeight + 50;
    const startLeft = parseFloat(particle.style.left);
    
    function animateParticle(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const top = startTop + (endTop - startTop) * progress;
        const sway = Math.sin(progress * Math.PI * 2.5) * 10 * (1 - progress);
        
        particle.style.top = top + 'px';
        particle.style.left = (startLeft + sway) + 'px';
        particle.style.opacity = 1 - progress;
        
        if (progress < 1) {
            requestAnimationFrame(animateParticle);
        } else {
            particle.remove();
        }
    }
    
    requestAnimationFrame(animateParticle);
}

// ========== EFEK KLIK DI MEMORY CARDS ==========
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
        createConfetti();
    });
});

// Mulai partikel
startParticles();

console.log('🎂 Happy Birthday Kiyaa! 🎂');