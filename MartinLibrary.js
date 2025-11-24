// ------------------------------
// Hamburger Menu
// ------------------------------
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

const toggleMenu = () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
};

// Toggle menu on hamburger click
hamMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (offScreenMenu.classList.contains('active') && !offScreenMenu.contains(e.target)) {
        offScreenMenu.classList.remove('active');
        hamMenu.classList.remove('active');
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && offScreenMenu.classList.contains('active')) {
        offScreenMenu.classList.remove('active');
        hamMenu.classList.remove('active');
    }
});

// ------------------------------
// Scroll-to-top Button
// ------------------------------
const scrollBtn = document.getElementById('scrollTopBtn');

const toggleScrollBtn = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    scrollBtn.style.display = scrollY > 2000 ? 'block' : 'none';
};

// Optimize scroll performance
window.addEventListener('scroll', () => {
    window.requestAnimationFrame(toggleScrollBtn);
});

// Smooth scroll to top
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ------------------------------
// Share Button
// ------------------------------
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
        try {
            await navigator.share({ title, url });
            console.log('Page shared successfully');
        } catch (err) {
            console.error('Error sharing:', err);
        }
    } else if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } catch (err) {
            alert('Unable to copy link.');
        }
    } else {
        // Fallback for older browsers
        prompt('Copy this link:', url);
    }
});
