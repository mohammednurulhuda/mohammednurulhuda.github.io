// 1. Theme Toggling
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

// 2. Page Templates
const views = {
    home: `
        <h1 class="section-title">Welcome!</h1>
        <p style="font-size: 1.2rem; line-height: 1.6; color: var(--text-soft);">This is a dedicated place for science nerds, especially for lovers of physics!</p>
    `,
    contact: `
        <h1 class="section-title">Contact Me</h1>
        <div class="forum-card" style="max-width: 400px; cursor: default; transform: none;">
            <p>Email: contact@hudafiles.com</p>
            <p>Discord: YourDiscordTag</p>
        </div>
    `,
    works: `
        <h1 class="section-title">My Works</h1>
        <div class="btn-cluster">
            <button class="pixel-btn" onclick="loadArticles()">Refresh Data</button>
        </div>
        <div class="grid" id="content-grid">
            <p style="color: var(--text-soft);">Loading connection to matrix...</p>
        </div>
    `,
    articleDetail: (title, text, mediaUrl) => `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('works')">← Back</button>
        <h1 class="section-title">${title}</h1>
        <div class="forum-card" style="cursor: default; transform: none; padding: 2rem;">
            ${mediaUrl ? `<img src="${mediaUrl}" style="width:100%; max-height:450px; object-fit:cover; border-radius:8px; margin-bottom:1.5rem;">` : ''}
            <div class="article-detail-body">${text}</div>
        </div>
    `
};

// 3. Router logic
function navigate(pageId) {
    const app = document.getElementById('app');
    
    if (pageId === 'home') app.innerHTML = views.home;
    else if (pageId === 'contact') app.innerHTML = views.contact;
    else if (pageId === 'works') {
        app.innerHTML = views.works;
        loadArticles(); // Fetch CMS data when Works tab is opened
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Open specific article logic
function openArticle(title, text, mediaUrl) {
    const app = document.getElementById('app');
    app.innerHTML = views.articleDetail(title, text, mediaUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. Build Cards from Decap CMS data
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('content-grid');
            
            if (data.items && data.items.length > 0) {
                // Map the CMS data into the new Discord card HTML
                grid.innerHTML = data.items.map(item => {
                    // Fallback image if no media was uploaded in CMS
                    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
                    
                    // Escape quotes in text so they don't break the onclick handler
                    const safeText = item.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    const safeTitle = item.title.replace(/'/g, "\\'");
                    
                    return `
                    <div class="forum-card" onclick="openArticle('${safeTitle}', '${safeText}', '${imageUrl}')">
                        <div class="card-meta-top"><span class="card-author">Mohammed Nurul Huda</span> &bull; <span>Author</span></div>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-image-wrapper">
                            <img src="${imageUrl}">
                            <div class="card-tags"><span class="tag">#read</span></div>
                        </div>
                        <div class="card-footer"><span>💬 Read</span><span>👾</span></div>
                    </div>
                    `;
                }).join('');
            } else {
                grid.innerHTML = '<p style="color: var(--text-soft);">No articles published yet.</p>';
            }
        })
        .catch(err => {
            console.log("No articles published yet!", err);
            document.getElementById('content-grid').innerHTML = '<p style="color: var(--text-soft);">No content published yet. Go to /admin/ to add some!</p>';
        });
}

// Load Home page by default
navigate('home');