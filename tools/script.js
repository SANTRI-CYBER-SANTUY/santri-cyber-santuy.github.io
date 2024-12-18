document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle dengan animasi
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('visible');
    });

    // Tutup menu ketika klik di luar menu
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('visible');
            menuToggle.classList.remove('active');
        }
    });

    // Toggle Submenu dengan animasi smooth
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.nextElementSibling && item.nextElementSibling.classList.contains('submenu')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                const isActive = submenu.classList.contains('active');
                
                // Tutup submenu lain yang terbuka
                document.querySelectorAll('.submenu.active').forEach(sub => {
                    if (sub !== submenu) {
                        sub.classList.remove('active');
                    }
                });

                submenu.classList.toggle('active');
                
                // Rotasi icon jika ada
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(90deg)';
                }
            });
        }
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
});

// IP Address fetching with retry
async function fetchIPAddress(retries = 3) {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ip-address').textContent = data.ip;
    } catch (error) {
        if (retries > 0) {
            setTimeout(() => fetchIPAddress(retries - 1), 1000);
        } else {
            document.getElementById('ip-address').textContent = 'Unable to fetch IP';
        }
    }
}

fetchIPAddress();
