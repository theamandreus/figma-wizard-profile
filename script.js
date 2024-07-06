document.getElementById('connectFigma').addEventListener('click', connectFigma);
document.getElementById('exportProfile').addEventListener('click', exportProfile);
document.getElementById('shareProfile').addEventListener('click', shareProfile);

function connectFigma() {
    // In a real app, this would redirect to Figma OAuth
    // For now, we'll just show the profile
    document.getElementById('profile').style.display = 'block';
    updateProfile();
}

function updateProfile() {
    // This would normally fetch data from Figma API
    // For now, we'll use dummy data
    const stats = {
        screens: 1750,
        pixels: 840000000,
        layers: 52500
    };

    const statsHtml = `
        <div class="stat">
            <h4>Screens Conjured</h4>
            <p>${stats.screens}</p>
        </div>
        <div class="stat">
            <h4>Pixels Brought to Life</h4>
            <p>${(stats.pixels / 1000000).toFixed(1)}M</p>
        </div>
        <div class="stat">
            <h4>Layers of Magic</h4>
            <p>${stats.layers}</p>
        </div>
    `;

    document.getElementById('stats').innerHTML = statsHtml;

    const ctx = document.createElement('canvas');
    document.getElementById('chart').appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2011', '2015', '2020', '2023'],
            datasets: [{
                label: 'Screens per Year',
                data: [50, 200, 500, 1000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        }
    });
}

function exportProfile() {
    const profile = `
VIVEK KRISHNA's Figma Superpowers
---------------------------------
Known in the design universe as: "amandreus"
Wielding the mighty Figma since: 2011
Screens conjured: 1750
Pixels brought to life: 840.0M
Layers of magic: 52500

Created by the Pixel Wizard, amandreus
Disclaimer: No pixels were harmed in the making of this profile.
    `;

    const blob = new Blob([profile], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amandreus_figma_superpowers.txt';
    a.click();
}

function shareProfile() {
    const message = `Check out my Figma superpowers! 1750 screens, 840.0M pixels, and 52500 layers of pure design magic! #FigmaWizard #DesignLife`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
}