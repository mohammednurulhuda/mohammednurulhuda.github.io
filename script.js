// Global state for items fetched from CMS
let articlesData = [];
let projectsData = [];

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
                {we live to stand beside us}
            </div>
        </div>
    `,
    works: `
        <div class="works-container">
            <h1 class="pixel-title">MY WORKS</h1>
            
            <div class="category-grid">
                <div class="category-box" onclick="navigate('projects')">
                    <div class="pixel-cover projects-bg"></div>
                    <h2>Projects</h2>
                </div>

                <div class="category-box" onclick="navigate('articles')">
                    <div class="pixel-cover articles-bg"></div>
                    <h2>Articles</h2>
                </div>
            </div>
        </div>
    `,
    articles: `
        <div class="articles-container">
            <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('works')">◄ BACK TO CATEGORIES</button>
            <h1 class="pixel-title" style="margin-bottom: 1rem;">ARTICLES</h1>
            <div id="content-grid" class="grid"></div>
        </div>
    `,
    projects: `
        <div class="projects-container">
            <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('works')">◄ BACK TO CATEGORIES</button>
            <h1 class="pixel-title" style="margin-bottom: 1rem;">PROJECTS</h1>
            <div id="projects-grid" class="grid"></div>
        </div>
    `,
    contact: `
        <div class="contact-container">
            <h1 class="pixel-title">CONTACT ME</h1>
            
            <div class="contact-layout">
                <div class="contact-card profile-box left-box">
                    <img src="Author.jpg" alt="Mohammed Nurul Huda" class="profile-img">
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.2rem; color: #fff;">Mohammed Nurul Huda</h2>
                    <p style="color: var(--text-soft); font-family: 'IBM Plex Mono', monospace; font-size: 0.9rem;">Physics Enthusiast & Developer</p>
                    
                    <div class="about-me-text">
                        <p><strong>Welcome! I'm Mohammed Nurul Huda.</strong></p>
                        <p>I created this space to document my projects. I am passionate about building things from the ground up—from coding and working with microcontrollers to deep-diving into custom electronics. I believe in staying solid, loyal to my goals, and letting my builds speak for themselves. Take a look around to see my latest work!</p>
                    </div>
                </div>

                <div class="contact-card right-box">
                    <p style="font-family: 'IBM Plex Mono', monospace; color: var(--text-soft); margin-bottom: 1.5rem; line-height: 1.6;">
                        Got a question about a physics article or want to collaborate? Reach out via Discord or Facebook below:
                    </p>
                    
                    <div class="social-links">
                        <button class="social-btn discord">
                            <i class="fab fa-discord"></i> JOIN DISCORD SERVER
                        </button>
                        <button class="social-btn facebook">
                            <i class="fab fa-facebook"></i> CONNECT ON FACEBOOK
                        </button>
                    </div>
                    
                    <div style="font-family: 'IBM Plex Mono', monospace; margin-top: 2rem; color: var(--accent-green); border-top: 1px dashed var(--border); padding-top: 1rem;">
                        ⮑ Direct Email: mohammednurulhuda2010@gmail.com
                    </div>
                </div>
            </div>
        </div>
    `,
};

// 3. Router
function navigate(pageId) {
    const app = document.getElementById('app');

    let bgClass = pageId;
    if (pageId === 'articles' || pageId === 'projects') bgClass = 'works';
    
    document.body.className = `bg-${bgClass}`;

    if (views[pageId]) {
        app.innerHTML = views[pageId];
    }
    
    if (pageId === 'articles') {
        loadArticles();
    } else if (pageId === 'projects') {
        loadProjects();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Safe Article Opener
function openArticleByIndex(index) {
    const item = articlesData[index];
    if (!item) return;

    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
    const app = document.getElementById('app');

    app.innerHTML = `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('articles')">◄ BACK TO ARTICLES</button>
        <h1 class="pixel-title" style="font-size:2.8rem; margin-bottom: 1rem;">${item.title}</h1>
        <div class="contact-card" style="margin-top:1rem;">
            ${item.media ? `<img src="${imageUrl}" style="width:100%; max-height:400px; object-fit:cover; border-radius:6px; border:2px solid #000;">` : ''}
            <div style="font-size:1.1rem; line-height:1.8; white-space:pre-wrap; color:var(--text);">${item.text}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. Safe Project Opener
function openProjectByIndex(index) {
    const item = projectsData[index];
    if (!item) return;

    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
    const app = document.getElementById('app');

    app.innerHTML = `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('projects')">◄ BACK TO PROJECTS</button>
        <h1 class="pixel-title" style="font-size:2.8rem; margin-bottom: 1rem;">${item.title}</h1>
        <div class="contact-card" style="margin-top:1rem;">
            ${item.media ? `<img src="${imageUrl}" style="width:100%; max-height:400px; object-fit:cover; border-radius:6px; border:2px solid #000;">` : ''}
            <div style="font-size:1.1rem; line-height:1.8; white-space:pre-wrap; color:var(--text);">${item.text}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 6. Fetch CMS Data & Render Grids
function loadArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            articlesData = data.items || [];
            const grid = document.getElementById('content-grid');
            
            if (articlesData.length > 0 && grid) {
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
            } else if (grid) {
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

function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data.items || [];
            const grid = document.getElementById('projects-grid');
            
            if (projectsData.length > 0 && grid) {
                grid.innerHTML = projectsData.map((item, index) => {
                    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
                    return `
                    <div class="forum-card" onclick="openProjectByIndex(${index})">
                        <div class="card-meta-top">MOHAMMED NURUL HUDA &bull; PROJECT</div>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-image-wrapper">
                            <img src="${imageUrl}" alt="${item.title}">
                        </div>
                        <div class="card-footer">
                            <span>VIEW PROJECT ➔</span>
                            <span>⚙️</span>
                        </div>
                    </div>
                    `;
                }).join('');
            } else if (grid) {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">No projects published yet.</p>';
            }
        })
        .catch(err => {
            console.log("CMS Data Fetch Error:", err);
            const grid = document.getElementById('projects-grid');
            if (grid) {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">No projects found. Add one via the Admin panel!</p>';
            }
        });
}

// Initial navigation load
navigate('home');

// 7. Scroll Animation for Footer Cubes
document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById('footer-svg');
    const footer = document.querySelector('footer');
    
    if (!svg || !footer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                svg.classList.add('pop-up');
            } else {
                svg.classList.remove('pop-up');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(footer);
});