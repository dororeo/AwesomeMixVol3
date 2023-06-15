const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".song-artist");

const randomBtn = document.querySelector("random");
const prevBtn = document.getElementById("prev");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");

const slider = document.querySelector(".slider");

let currentTime = document.querySelector(".current-time");
let songDuration = document.querySelector(".song-duration");
let shuffleIcon = document.querySelector('.fa-shuffle');


let currentSong = document.createElement("audio");
let songIndex = 0;
let songPlaying = false;
let randomSong = false;
let repeatSong = false;
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
/////////////////////////////////////////////////////

//overall shuffle function
const shuffle = () => {
    randomSong ? shuffleOff() : shuffleOn();
    shuffleIcon.classList.add('randomActive');
}

//5. random song
const shuffleOn = () => {
    randomSong = true;
}

const shuffleOff = () => {
    randomSong = false;
}



//overall repeat function

const repeating = () => {
    repeatSong ? repeatOff() : repeatOn();
}

//8. repeat song
const repeatOn = () => {
    repeatSong = true;
    currentSong.loop();
}

const repeatOff = () => {
    repeatSong = false;
    nextSong();
}

/////////////////////////////////////////////////////

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
}

//4. pause song
const pauseSong = () => {
    currentSong.pause();
    songPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}
//6. next song
/* if loop to check for shuffle, 
add 1 to index number for next song else math.random */

const nextSong = () => {
    //if the current song index is less than the last song in the tracklist, and shuffleOff
    if(songIndex < trackList.length - 1 && randomSong === false) {
        songIndex += 1;
    } else if( songIndex < trackList.length -1 && randomSong === true) {
        //make it an integer because the length will be returned as a string//
        let randomIndex = Number.parseInt(Math.random() * trackList.length);
        songIndex = randomIndex;
    } else {
        songIndex = 0;
    }
    loadSong(songIndex);
    playSong();
}

//7. prev song
const prevSong = () => {
    if(songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = trackList.length -1;
    }
    loadSong(songIndex);
    playSong();
}

//9. slider update when clicked/dragged

const slideTo = () => {
    //calculate position by percentage of slider relative to duration of the song
    let slideTo = currentSong.duration * (slider.value / 100);
    currentSong.currentTime = slideTo;
}

//setUpdate function

const setUpdate = () => {
    let seekPosition = 0;

    // console.log("durationSecs", durationSecs)
//check current song duration = legible number
    if(!isNaN(currentSong.duration)) {
        seekPosition = currentSong.currentTime * (100 / currentSong.duration);
        slideTo.value = seekPosition;

        let currentMins = Math.floor(currentSong.currentTime / 60);
        let currentSecs = Math.floor(currentSong.currentTime - currentMins * 60);
        let durationMins = Math.floor(currentSong.duration / 60); //gives song duration in mins
        let durationSecs = Math.floor(currentSong.duration - durationMins * 60);

        if(currentSecs < 10) {currentSecs = "0" + currentSecs; }
        if(durationSecs < 10) { durationSecs = "0" + durationSecs; }
        if(currentMins < 10) {currentMins = "0" + currentMins; }
        if(durationMins < 10) { durationMins = "0" + durationMins; }
 

        currentTime.innerHTML = currentMins + ":" + currentSecs;
        songDuration.innerHTML = durationMins + ":" + durationSecs;

    }

}

loadSong(songIndex);