const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next');


// Music 
const songs = [
    {
        name: 'Darmiyaan', 
        displayName: 'Darmiyaan',
        aritst: 'Sheriya Ghosal',
    },
    {
        name: 'Leja Re', 
        displayName: 'Leja Re',
        aritst: 'Dhvani Bhanushali',
    },
    {
        name: 'Senorita',
        displayName: 'Senorita',
        artist: 'Movie Actors',
    },
    {
        name: 'Teri Meri Dosti', 
        displayName: 'Teri Meri Dosti',
        aritst: 'Dharsan',
    },
    {
        name: 'Tu Dua Hai',
        displayName: 'Tu Dua Hai',
        artist: 'Dharsan Raval',
    },
    

]

// Check if Playing
let isPlaying = false;

// Play  
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if ( isPlaying ) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        // console.log(ProgressPercent);
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds =  `0${durationSeconds}`;
        }
        // console.log('seconds', durationSeconds);
        
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent =  `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds =  `0${currentSeconds}`;
        }
        // console.log('seconds', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;
    // console.log('width', width);
    const clickX = e.offsetX;
    // console.log('clickX', clickX);
    const { duration } = music;
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;


}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);