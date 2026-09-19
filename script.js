let articlesData = [];
let projectsData = [];

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
                    
                    <div class="profile-img-wrapper">
                        <img src="Author.jpg" alt="Mohammed Nurul Huda" class="profile-img">
                        <img src="Frame.png" alt="Profile Frame" class="profile-frame">
                    </div>
                    
                    <h2 style="font-size: 1.8rem; margin-bottom: 0.2rem; color: var(--text);">Mohammed Nurul Huda</h2>
                    <p style="color: var(--text-soft); font-family: 'IBM Plex Mono', monospace; font-size: 0.9rem;">Physics Enthusiast & Hardware Builder</p>
                    
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
                        <a href="https://discord.gg/BNb8aCbydF" target="_blank" rel="noopener noreferrer" class="social-btn discord">
                            <i class="fab fa-discord"></i> JOIN DISCORD SERVER
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61594246478161" target="_blank" rel="noopener noreferrer" class="social-btn facebook">
                            <i class="fab fa-facebook"></i> CONNECT ON FACEBOOK
                        </a>
                    </div>
                    
                    <div style="font-family: 'IBM Plex Mono', monospace; margin-top: 2rem; color: var(--accent-green); border-top: 1px dashed var(--border); padding-top: 1rem;">
                        ⮑ Direct Email: mohammednurulhuda2010@gmail.com
                    </div>

                    <!-- NEW CUSTOM NEWSLETTER BOX -->
                    <div class="newsletter-box" style="margin-top: 2rem; padding: 1.25rem; border: 2px dashed var(--accent-green); border-radius: 8px; background: var(--surface-hover);">
                        <h3 style="font-family: 'VT323', monospace; font-size: 1.8rem; margin-bottom: 0.25rem; color: var(--accent-green);">SUBSCRIBE</h3>
                        <p style="font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; color: var(--text-soft); margin-bottom: 1rem; line-height: 1.4;">
                            register your email to get notified when new article arrives!!
                        </p>
                        <form action="https://bb75c4fe.sibforms.com/serve/MUIFAL62nkttAkI_5jlOqsMh6jOgjh6DthkPB7Son6FeIeZsW5Ir7sJstFxwZjI_LLn-ZcucqkFJ2IJdfzBU7nyihwRztEUP7Zs952B-IoPJw1FEgTsU_MVm4aATac8hd-7NQss4TXO-rVJ5Rr-GACP3Fqr_ZCEL9gT4wtZlLUXIxn7kvJLNpu-rW5MmxL9leWhX_HGmr5Ro9dRaZw==" method="POST" target="_blank" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <input type="email" name="EMAIL" placeholder="Enter your email..." required style="flex: 1; min-width: 160px; padding: 10px; background: var(--bg-dark); border: 1px solid var(--border); color: var(--text); font-family: 'IBM Plex Mono', monospace; border-radius: 4px;">
                            <button type="submit" class="pixel-btn">REGISTER ➔</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
};

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

function openArticleByIndex(index) {
    const item = articlesData[index];
    if (!item) return;

    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
    const app = document.getElementById('app');
    const formattedContent = typeof marked !== 'undefined' ? marked.parse(item.text) : item.text;

    app.innerHTML = `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('articles')">◄ BACK TO ARTICLES</button>
        <h1 class="pixel-title" style="font-size:2.8rem; margin-bottom: 1rem;">${item.title}</h1>
        <div class="contact-card markdown-body" style="margin-top:1rem;">
            ${item.media ? `<img src="${imageUrl}" style="width:100%; max-height:400px; object-fit:cover; border-radius:6px; border:2px solid #000;">` : ''}
            <div style="font-size:1.1rem; line-height:1.8; color:var(--text);">${formattedContent}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openProjectByIndex(index) {
    const item = projectsData[index];
    if (!item) return;

    const imageUrl = item.media ? item.media : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop';
    const app = document.getElementById('app');
    const formattedContent = typeof marked !== 'undefined' ? marked.parse(item.text) : item.text;

    app.innerHTML = `
        <button class="pixel-btn" style="margin-bottom: 2rem;" onclick="navigate('projects')">◄ BACK TO PROJECTS</button>
        <h1 class="pixel-title" style="font-size:2.8rem; margin-bottom: 1rem;">${item.title}</h1>
        <div class="contact-card markdown-body" style="margin-top:1rem;">
            ${item.media ? `<img src="${imageUrl}" style="width:100%; max-height:400px; object-fit:cover; border-radius:6px; border:2px solid #000;">` : ''}
            <div style="font-size:1.1rem; line-height:1.8; color:var(--text);">${formattedContent}</div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">[ SYSTEM MESSAGE: NO ARTICLES PUBLISHED YET ]</p>';
            }
        })
        .catch(err => {
            const grid = document.getElementById('content-grid');
            if (grid) {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">[ SYSTEM MESSAGE: DATA FILE NOT FOUND ]</p>';
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
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">[ SYSTEM MESSAGE: PROJECTS COMING SOON ]</p>';
            }
        })
        .catch(err => {
            const grid = document.getElementById('projects-grid');
            if (grid) {
                grid.innerHTML = '<p style="color: var(--text-soft); font-family: \'IBM Plex Mono\', monospace;">[ SYSTEM MESSAGE: DATABASE INITIALIZING... ]</p>';
            }
        });
}

navigate('home');

// =========================================================
// ADVANCED PHYSICS ENGINE: AIRCRAFT FLIGHT & CLOUD SIMULATOR
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    // Footer cube scroll reveal animation
    const svg = document.getElementById('footer-svg');
    const footer = document.querySelector('footer');
    if (svg && footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) svg.classList.add('pop-up');
                else svg.classList.remove('pop-up');
            });
        }, { threshold: 0.1 });
        observer.observe(footer);
    }

    const canvas = document.getElementById('skyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = footer.clientWidth);
    let height = (canvas.height = footer.clientHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = footer.clientWidth;
        height = canvas.height = footer.clientHeight;
    });

    let mouse = { x: -1000, y: -1000, active: false };
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    // Cloud Class: Forward-moving pixelated atmosphere
    class Cloud {
        constructor() {
            this.reset(true);
        }
        reset(randomX = false) {
            this.x = randomX ? Math.random() * width : -120;
            this.y = Math.random() * (height - 60);
            this.speed = 0.3 + Math.random() * 0.4;
            this.scale = 0.6 + Math.random() * 0.6;
            this.opacity = 0.25 + Math.random() * 0.25;
        }
        update() {
            this.x += this.speed;
            if (this.x > width + 150) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.translate(this.x, this.y);
            ctx.scale(this.scale, this.scale);
            ctx.beginPath();
            ctx.arc(20, 20, 20, 0, Math.PI * 2);
            ctx.arc(40, 15, 25, 0, Math.PI * 2);
            ctx.arc(70, 20, 20, 0, Math.PI * 2);
            ctx.arc(45, 30, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Aircraft Physics Class with Anti-Collision & Velocity Steering
    class Aircraft {
        constructor(type, color, size, baseXSpeed, baseYSpeed) {
            this.type = type;
            this.color = color;
            this.size = size;
            this.radius = size;
            this.x = Math.random() * width;
            this.y = 20 + Math.random() * (height - 70);
            this.vx = baseXSpeed;
            this.vy = baseYSpeed;
            this.baseXSpeed = baseXSpeed;
            this.baseYSpeed = baseYSpeed;
            this.angle = 0;
        }

        update(aircraftList) {
            // 1. Repulsion from Mouse Cursor (Physics Dodge)
            if (mouse.active) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 90 && dist > 0) {
                    let force = (90 - dist) / 90;
                    this.vx += (dx / dist) * force * 0.8;
                    this.vy += (dy / dist) * force * 0.8;
                }
            }

            // 2. Inter-Vehicle Collision Avoidance (Self-Steering Avoidance)
            aircraftList.forEach(other => {
                if (other === this) return;
                let dx = this.x - other.x;
                let dy = this.y - other.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let minDist = this.radius + other.radius + 35;

                if (dist < minDist && dist > 0) {
                    let pushForce = (minDist - dist) / minDist;
                    this.vx += (dx / dist) * pushForce * 0.4;
                    this.vy += (dy / dist) * pushForce * 0.4;
                }
            });

            // 3. Return to Cruise Velocity (Damping)
            this.vx += (this.baseXSpeed - this.vx) * 0.03;
            if (this.type === 'rocket') {
                this.vy += (-1.2 - this.vy) * 0.03; // Rocket ascends to galaxy
            } else {
                this.vy += (this.baseYSpeed - this.vy) * 0.03;
            }

            // 4. Update Position
            this.x += this.vx;
            this.y += this.vy;

            // 5. Wrap / Bound Constraints
            if (this.type === 'rocket') {
                if (this.y < -40 || this.x > width + 50) {
                    this.x = Math.random() * (width * 0.5);
                    this.y = height + 30;
                }
            } else {
                if (this.x > width + 40) this.x = -40;
                if (this.x < -40) this.x = width + 40;
                if (this.y < 15) { this.y = 15; this.vy *= -0.5; }
                if (this.y > height - 40) { this.y = height - 40; this.vy *= -0.5; }
            }

            // Calculate rotation angle matching direction vector (Prevents backwards flying)
            this.angle = Math.atan2(this.vy, this.vx);
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);

            if (this.type === 'plane') {
                ctx.rotate(this.angle);
                ctx.fillStyle = this.color;
                // Forward facing jet wing design
                ctx.beginPath();
                ctx.moveTo(12, 0);
                ctx.lineTo(-12, -10);
                ctx.lineTo(-6, 0);
                ctx.lineTo(-12, 10);
                ctx.closePath();
                ctx.fill();
            } else if (this.type === 'rocket') {
                ctx.rotate(this.angle + Math.PI / 2);
                ctx.fillStyle = this.color;
                // Rocket body & galaxy thruster flame
                ctx.fillRect(-4, -10, 8, 18);
                ctx.beginPath();
                ctx.arc(0, -10, 4, Math.PI, 0);
                ctx.fill();
                // Thruster particle flame
                ctx.fillStyle = '#ff9f43';
                ctx.beginPath();
                ctx.moveTo(-3, 8);
                ctx.lineTo(0, 16 + Math.random() * 6);
                ctx.lineTo(3, 8);
                ctx.closePath();
                ctx.fill();
            } else if (this.type === 'ufo') {
                // Alien UFO saucer with light glow
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#54a0ff';
                ctx.beginPath();
                ctx.arc(0, -3, 6, Math.PI, 0);
                ctx.fill();
            } else if (this.type === 'balloon') {
                // Hot Air Balloon with basket
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(0, -5, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#795548';
                ctx.fillRect(-3, 8, 6, 5);
            } else if (this.type === 'drone') {
                // Quadcopter Drone with spinning blades
                ctx.rotate(this.angle * 0.2);
                ctx.fillStyle = this.color;
                ctx.fillRect(-8, -2, 16, 4);
                ctx.fillRect(-2, -8, 4, 16);
                ctx.fillStyle = '#ffffff';
                ctx.arc(-8, -8, 4, 0, Math.PI * 2);
                ctx.arc(8, 8, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    const clouds = Array.from({ length: 6 }, () => new Cloud());
    const fleet = [
        new Aircraft('plane', '#2ed573', 14, 1.8, 0.1),
        new Aircraft('rocket', '#ff4757', 12, 1.2, -1.2),
        new Aircraft('ufo', '#a29bfe', 15, 0.9, 0.2),
        new Aircraft('balloon', '#ffa502', 12, 0.4, -0.1),
        new Aircraft('drone', '#1e90ff', 10, 1.4, -0.3)
    ];

    function render() {
        ctx.clearRect(0, 0, width, height);

        clouds.forEach(cloud => {
            cloud.update();
            cloud.draw();
        });

        fleet.forEach(craft => {
            craft.update(fleet);
            craft.draw();
        });

        requestAnimationFrame(render);
    }
    render();
});