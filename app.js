const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".song-artist");

const randomBtn = document.getElementById("random");
const prevBtn = document.getElementById("prev");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");

const slider = document.querySelector(".slider");

let currentTime = document.querySelector(".current-time");
let songDuration = document.querySelector(".song-duration");

let currentSong = document.createElement("audio");
let songIndex = 0;
let songPlaying = false;
let randomSong = false;
let updateTime;

const trackList = [
    {
        name : "Creep (Acoustic)",
        artist : "Radiohead",
        music : "songs/01.mp3"
    },
    {
        name : "Crazy on You",
        artist : "Heart",
        music : "songs/02.mp3"
    },
    {
        name : "Since You've Been Gone",
        artist : "Rainbow",
        music : "songs/03.mp3"
    },
    {
        name : "In the Meantime",
        artist : "Spacehog",
        music : "songs/04.mp3"
    },
    {
        name : "I'm Always Chasing Rainbows",
        artist : "Alice Cooper",
        music : "songs/05.mp3"
    },
    {
        name : "San Francisco",
        artist : "The Mowgli's",
        music : "songs/06.mp3"
    },
    {
        name : "No Sleep Till Brooklyn",
        artist : "Beastie Boys",
        music : "songs/07.mp3"
    },
    {
        name : "Dog Days Are Over",
        artist : "Florence + The Machine",
        music : "songs/08.mp3"
    }
];


//1. load audio, song title, artist name
const loadSong = (songIndex) => {
    clearInterval(updateTime);
    reset();

    currentSong.src = trackList[songIndex].music;
    currentSong.load();

    songTitle.innerText = trackList[songIndex].name;
    artistName.innerText = trackList[songIndex].artist;

    updateTime = setInterval(setUpdate, 1000);
    currentSong.addEventListener("ended", nextSong);

}

//2. reset after song ends 
const reset = () => {
    currentTime.innerText = "00:00"
    songDuration.innerText = "00:00"
    slider.value = 0;
}

//overall playPause function

const playPause = () => {
    songPlaying ? pauseSong() : playSong();
}

//3. play song
const playSong = () => {
    currentSong.play();
    songPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pause"></i>';

    //////rotate tape rings of cassette/////
    // rotateRings();
    console.log(songTitle)
}

//4. pause song
const pauseSong = () => {
    currentSong.pause();
    songPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

//overall shuffle function
const shuffle = () => {
    randomSong ? shuffleOff : shuffleOn
}

//5. random song
const shuffleOn = () => {
    randomSong = true;
}

const shuffleOff = () => {
    randomSong = false;
}

//6. next song
//if loop to check for shuffle, 
//add 1 to index number for next song else math.random



//7. prev song

//8. repeat song

//9. slider update when clicked/dragged

//setUpdate function


loadSong(songIndex)