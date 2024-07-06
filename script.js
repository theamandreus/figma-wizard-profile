const CLIENT_ID = 'TfsazAvwdy1vWqWRecR5vS'; // Replace with your actual Figma Client ID

document.addEventListener('DOMContentLoaded', (event) => {
    checkFigmaAuth();
    document.getElementById('connectFigma').addEventListener('click', connectFigma);
    document.getElementById('exportProfile').addEventListener('click', exportProfile);
});

function connectFigma() {
    const redirectUri = 'https://theamandreus.github.io/figma-wizard-profile/callback.html';
    const scope = 'files:read';
    const state = Math.random().toString(36).substring(7);
    
    localStorage.setItem('figmaAuthState', state);
    
    const authUrl = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&response_type=code`;
    
    window.location.href = authUrl;
}

function checkFigmaAuth() {
    const code = localStorage.getItem('figmaAuthCode');
    const state = localStorage.getItem('figmaAuthState');
    
    if (code && state) {
        localStorage.removeItem('figmaAuthCode');
        localStorage.removeItem('figmaAuthState');
        fetchFigmaData(code);
    }
}

async function fetchFigmaData(code) {
    try {
        // Simulating Figma data fetch
        const stats = {
            screens: Math.floor(Math.random() * 2000) + 500,
            pixels: Math.floor(Math.random() * 1000000000) + 100000000,
            layers: Math.floor(Math.random() * 100000) + 10000
        };
    
        updateProfile(stats);
        document.getElementById('landing').classList.add('hidden');
        document.getElementById('profile').classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching Figma data:', error);
        alert('Failed to fetch Figma data. Please try again.');
    }
}

function updateProfile(stats) {
    const statsHtml = `
        <div class="stat">
            <i data-lucide="monitor" class="stat-icon text-blue-500"></i>
            <span class="stat-value">${stats.screens}</span>
            <span class="stat-label">Screens Conjured</span>
        </div>
        <div class="stat">
            <i data-lucide="square" class="stat-icon text-green-500"></i>
            <span class="stat-value">${(stats.pixels / 1000000).toFixed(1)}M</span>
            <span class="stat-label">Pixels Brought to Life</span>
        </div>
        <div class="stat">
            <i data-lucide="layers" class="stat-icon text-purple-500"></i>
            <span class="stat-value">${stats.layers}</span>
            <span class="stat-label">Layers of Magic</span>
        </div>
    `;

    document.getElementById('stats').innerHTML = statsHtml;
    lucide.createIcons();

    const originalityScore = 85;
    document.querySelector('#originality .progress').style.width = `${originalityScore}%`;
    document.querySelector('#originality .score').textContent = `${originalityScore}%`;

    const ctx = document.getElementById('designJourney').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2011', '2015', '2020', '2023'],
            datasets: [{
                label: 'Screens per Year',
                data: [50, 200, 500, 1000],
                backgroundColor: '#8884d8',
                borderColor: '#8884d8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function exportProfile() {
    html2canvas(document.querySelector(".card")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'figma_wizard_profile.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function shareProfile(platform) {
    const message = `Check out my Figma Wizard Profile! #FigmaWizard #DesignLife`;
    let url;
    switch(platform) {
        case 'linkedin':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
            break;
        case 'instagram':
            alert('To share on Instagram, save the image and post it to your story or feed!');
            return;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
            break;
    }
    if (url) window.open(url, '_blank');
}