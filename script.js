// Global state for items fetched from CMS
let articlesData = [];

// 1. Theme Management
let isDarkMode = true;
function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeBtn.innerText = '☀️ Light Mode';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeBtn.innerText = '🌙 Dark Mode';
    }
}

// 2. Views Setup
const views = {
    home: `
        <div class="home-container">
            <h1 class="pixel-title">WELCOME!</h1>
            <p class="pixel-subtitle">
                A dedicated space for science nerds and lovers of physics!
            </p>
            <div style="margin-top: 1rem;">
                <button class="pixel-btn" onclick="navigate('works')">EXPLORE WORKS ➔</button>
            </div>
            <div class="scroll-indicator">
                {we live stand beside us}
            </div>
        </div>
    `,
    // ... rest of your code stays the same
    works: `
        <h1 class="pixel-title" style="font-size:3rem; margin-bottom: 1rem;">MY WORKS</h1>
        <div class="grid" id="content-grid">
            <p style="color: var(--text-soft); font-family: 'IBM Plex Mono', monospace;">Fetching database entries...</p>
        </div>
    `,
    contact: `
        <h1 class="pixel-title" style="font-size:3rem; margin-bottom: 1.5rem;">CONTACT ME</h1>
        <div class="contact-container">
            <div class="contact-card">
                <p style="font-family:'IBM Plex Mono', monospace; line-height: 1.6; color: var(--text-soft);">
                    Got a question about a physics article or want to collaborate? Reach out via Discord or Facebook below:
                </p>
                <div class="social-links">
                    <a href="https://discord.gg/rZhe8YH48" target="_blank" rel="noopener" class="social-btn discord">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                        JOIN DISCORD SERVER
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61594246478161" target="_blank" rel="noopener" class="social-btn facebook">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        CONNECT ON FACEBOOK
                    </a>
                </div>
                <div style="font-family:'IBM Plex Mono', monospace; font-size:0.9rem; color:var(--text-soft); border-top:1px dashed var(--border); padding-top:1rem;">
                    📧 Direct Email: <span style="color:var(--text);">contact@hudafiles.com</span>
                </div>
            </div>
            
            <div class="profile-box">
                <img src="Author.jpg" alt="Mohammed Nurul Huda" class="profile-img" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop'">
                <h3 style="font-family:'IBM Plex Mono', monospace;">Mohammed Nurul Huda</h3>
                <p style="font-size:0.85rem; color:var(--text-soft); margin-top:4px;">Physics Enthusiast &amp; Developer</p>
            </div>
        </div>
    `
};

// 3. Router
function navigate(pageId) {
    const app = document.getElementById('app');

    // Switch body background class (bg-home, bg-works, or bg-contact)
    document.body.className = `bg-${pageId}`;

    if (pageId === 'home') app.innerHTML = views.home;
    else if (pageId === 'contact') app.innerHTML = views.contact;
    else if (pageId === 'works') {
        app.innerHTML = views.works;
        loadArticles();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Safe Article Opener (Fixed string escaping bug)
function openArticleByIndex(index) {
    const item = articlesData[index];
    if (!item) return;

    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
    const app = document.getElementById('app');

    app.innerHTML = `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('works')">◄ BACK TO WORKS</button>
        <h1 class="pixel-title" style="font-size:2.8rem; margin-bottom: 1rem;">${item.title}</h1>
        <div class="contact-card" style="margin-top:1rem;">
            ${item.media ? `<img src="${imageUrl}" style="width:100%; max-height:400px; object-fit:cover; border-radius:6px; border:2px solid #000;">` : ''}
            <div style="font-size:1.1rem; line-height:1.8; white-space:pre-wrap; color:var(--text);">${item.text}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. Fetch CMS Data & Render Grid
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            articlesData = data.items || [];
            const grid = document.getElementById('content-grid');
            
            if (articlesData.length > 0) {
                grid.innerHTML = articlesData.map((item, index) => {
                    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
                    return `
                    <div class="forum-card" onclick="openArticleByIndex(${index})">
                        <div class="card-meta-top">MOHAMMED NURUL HUDA &bull; ARTICLE</div>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-image-wrapper">
                            <img src="${imageUrl}" alt="${item.title}">
                        </div>
                        <div class="card-footer">
                            <span>READ ARTICLE ➔</span>
                            <span>👾</span>
                        </div>
                    </div>
                    `;
                }).join('');
            } else {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">No articles published yet.</p>';
            }
        })
        .catch(err => {
            console.log("CMS Data Fetch Error:", err);
            const grid = document.getElementById('content-grid');
            if (grid) {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">No articles found in data.json. Add one via /admin/</p>';
            }
        });
}

// Initial navigation load
navigate('home');