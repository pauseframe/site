document.addEventListener('DOMContentLoaded', () => {

    const trigger = document.getElementById('toggle-trigger');
    const gifOne = "floating.gif"; 
    const gifTwo = "bfloating.gif";
    let isOriginal = true;

    if (trigger) {
        trigger.addEventListener('click', () => {
            document.body.classList.toggle('inverted');
            if (isOriginal) {
                trigger.src = gifTwo;
                isOriginal = false;
            } else {
                trigger.src = gifOne;
                isOriginal = true;
            }
        });
    }

    const MY_DISCORD_ID = "1425594502588010637"; 

    async function updateStatus() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${MY_DISCORD_ID}`);
            const result = await response.json();
            if (!result.success) return;

            const data = result.data;
            
            const dot = document.getElementById('status-dot');
            const text = document.getElementById('status-text');
            const activityEl = document.getElementById('activity-detail');
            const spotifyContainer = document.getElementById('spotify-container');
            const albumArt = document.getElementById('album-art');
            const songName = document.getElementById('song-name');
            const artistName = document.getElementById('artist-name');

            if (dot && text) {
                const statusColors = {
                    online: "#43b581",
                    idle: "#faa61a",
                    dnd: "#f04747",
                    offline: "#747f8d"
                };
                const color = statusColors[data.discord_status] || statusColors.offline;
                dot.style.backgroundColor = color;
                dot.style.boxShadow = `0 0 5px ${color}`;
                text.innerText = data.discord_status.toUpperCase();
            }

            if (data.listening_to_spotify && spotifyContainer) {

                spotifyContainer.style.display = 'flex';
                if (activityEl) activityEl.style.display = 'none';

                if (albumArt) albumArt.src = data.spotify.album_art_url;
                if (songName) songName.innerText = data.spotify.track;
                if (artistName) artistName.innerText = data.spotify.artist;

            } else {
                if (spotifyContainer) spotifyContainer.style.display = 'none';
                if (activityEl) {
                    activityEl.style.display = 'block';

                    const game = data.activities.find(a => a.type !== 4);
                    const custom = data.activities.find(a => a.type === 4);

                    if (game) {
                        activityEl.innerText = `DOING: ${game.name}`;
                    } else if (custom && custom.state) {

                        activityEl.innerText = `STATUS: ${custom.state}`;
                    } else {
                        activityEl.innerText = "IDLE // NO ACTIVITY";
                    }
                }
            }

        } catch (err) {
            console.error("Lanyard Error:", err);
        }
    }


    setInterval(updateStatus, 10000);
    updateStatus();
});

    const catBtn = document.getElementById('cat-summoner');
    const cat = document.getElementById('cursor-cat');
    let catActive = false;
    let mouseX = 0;
    let mouseY = 0;
    let catX = 0;
    let catY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    if (catBtn) {
        catBtn.addEventListener('click', () => {
            if (!catActive) {
                catActive = true;
                cat.style.display = 'block';
                // Note: I kept your updated text here
                catBtn.innerText = "fuck you lame ass nigga";
                animateCat();
            }
        });
    }

    function animateCat() {
        const offsetX = 40; 
        const offsetY = 40;

        let distX = (mouseX + offsetX) - catX;
        let distY = (mouseY + offsetY) - catY;
        
        catX += distX * 0.05;
        catY += distY * 0.05;

        cat.style.left = `${catX - 25}px`;
        cat.style.top = `${catY - 25}px`;

        if (distX > 0) {
            cat.style.transform = "scaleX(-1)";
        } else {
            cat.style.transform = "scaleX(1)";
        }

        requestAnimationFrame(animateCat);
    }