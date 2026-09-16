// Function to switch between pages
function navigate(pageId) {
    // Hide all pages by removing the 'active' class
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Show the target page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to handle Light / Dark mode
let isDarkMode = true;

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    
    isDarkMode = !isDarkMode; // Flip the state
    
    if (isDarkMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeBtn.innerText = '☀️ Light Mode';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeBtn.innerText = '🌙 Dark Mode';
    }
}

// Function to populate and open a detailed article/project
function openArticle(title, text, mediaUrl) {
    // Set the text content
    document.getElementById('article-title').innerText = title;
    document.getElementById('article-text').innerText = text;
    
    // Handle the image or GIF
    const mediaElement = document.getElementById('article-media');
    
    // If a media URL was provided in the HTML, show it
    if (mediaUrl !== '') {
        mediaElement.src = mediaUrl;
        mediaElement.style.display = 'block';
    } else {
        // If no image, hide the image tag entirely
        mediaElement.style.display = 'none';
        mediaElement.src = '';
    }
    
    // Navigate to the article details page
    navigate('article-detail');
}

function loadArticles() {
    // Fetch the JSON file the CMS creates
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.querySelector('#articles-list .grid-container');
            articlesContainer.innerHTML = ''; // Clear out the hardcoded examples
            
            // Loop through your real articles and create buttons
            data.items.forEach(article => {
                const btn = document.createElement('button');
                btn.className = 'card';
                
                // If no image is uploaded, use an empty string
                const mediaUrl = article.media ? article.media : '';
                
                btn.onclick = () => openArticle(article.title, article.text, mediaUrl);
                btn.innerHTML = `<h3>${article.title}</h3>`;
                
                articlesContainer.appendChild(btn);
            });
        })
        .catch(err => console.log("No articles published yet!", err));
}

// Run the function when the page loads
loadArticles();