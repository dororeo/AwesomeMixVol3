const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".song-artist");

const playPauseBtn = document.getElementById("play-pause");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("random")
const slider = document.querySelector(".slider");

const leftRing = document.querySelector(".tape-ring1");
const rightRing = document.querySelector(".tape-ring2");

let currentTime = document.querySelector(".current-time");
let songDuration = document.querySelector(".song-duration");
let currentSong = document.createElement("audio");
let nowPlaying = document.querySelector(".now-playing");

let songIndex = 0;
let songPlaying = false;
let randomSong = false;
let repeatSong = false;
let updateTime;

const trackList = [
  {
    name: "Creep (Acoustic)",
    artist: "Radiohead",
    music: "songs/01.mp3",
    no: 1
  },
  {
    name: "Crazy on You",
    artist: "Heart",
    music: "songs/02.mp3",
    no: 2
  },
  {
    name: "Since You've Been Gone",
    artist: "Rainbow",
    music: "songs/03.mp3",
    no: 3
  },
  {
    name: "In the Meantime",
    artist: "Spacehog",
    music: "songs/04.mp3",
    no: 4
  },
  {
    name: "I'm Always Chasing Rainbows",
    artist: "Alice Cooper",
    music: "songs/05.mp3",
    no: 5
  },
  {
    name: "San Francisco",
    artist: "The Mowgli's",
    music: "songs/06.mp3",
    no: 6
  },
  {
    name: "No Sleep Till Brooklyn",
    artist: "Beastie Boys",
    music: "songs/07.mp3",
    no: 7
  },
  {
    name: "Dog Days Are Over",
    artist: "Florence + The Machine",
    music: "songs/08.mp3",
    no: 8
  },
];

//1. load audio, song title, artist name
const loadSong = (songIndex) => {
  clearInterval(updateTime);
  reset();

  currentSong.src = trackList[songIndex].music;
  currentSong.load();

  songTitle.innerText = trackList[songIndex].name;
  artistName.innerText = trackList[songIndex].artist;
  nowPlaying.innerText = "NOW PLAYING " + trackList[songIndex].no + " OF 8";

  updateTime = setInterval(setUpdate, 1000);
  currentSong.addEventListener("ended", nextSong);
};

//2. reset after song ends
const reset = () => {
  currentTime.innerText = "00:00";
  songDuration.innerText = "00:00";
  slider.value = 0;
};

//overall shuffle function
const shuffle = () => {
  randomSong ? shuffleOff() : shuffleOn();
};

//5. random song
const shuffleOn = () => {
  randomSong = true;
  shuffleBtn.classList.add("randomActive");
};

const shuffleOff = () => {
  randomSong = false;
  shuffleBtn.classList.remove("randomActive");
};

//overall repeat function
const repeating = () => {
  repeatSong ? repeatOff() : repeatOn();
};

// 8. Repeat song
const repeatOn = () => {
  repeatSong = true;
  currentSong.loop = true;
  repeatBtn.classList.add("repeatActive");
};

const repeatOff = () => {
  repeatSong = false;
  currentSong.loop = false;
  repeatBtn.classList.remove("repeatActive");
};

//overall playPause function
const playPause = () => {
  songPlaying ? pauseSong() : playSong();
};

//3. play song
const playSong = () => {
  currentSong.play();
  songPlaying = true;
  playPauseBtn.classList.add("playActive");
  playPauseBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pause"></i>';

  //////rotate tape rings of cassette/////
  leftRing.classList.add("rotate");
  rightRing.classList.add("rotate");
  // rotateRings();
};

//4. pause song
const pauseSong = () => {
  currentSong.pause();
  songPlaying = false;
  playPauseBtn.classList.remove("playActive");
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

  leftRing.classList.remove("rotate");
  rightRing.classList.remove("rotate");
};

//6. next song
/* if loop to check for shuffle, 
add 1 to index number for next song else math.random */

const nextSong = () => {
  //if the current song index is less than the last song in the tracklist, and shuffleOff
  if (songIndex < trackList.length - 1 && randomSong === false) {
    songIndex += 1;
  } else if (songIndex < trackList.length - 1 && randomSong === true) {
    //make it an integer because the length will be returned as a string//
    let randomIndex = Number.parseInt(Math.random() * trackList.length);
    songIndex = randomIndex;
  } else {
    songIndex = 0;
  }
  loadSong(songIndex);
  playSong();
};

//7. prev song
const prevSong = () => {
  if (songIndex > 0) {
    songIndex -= 1;
  } else {
    songIndex = trackList.length - 1;
  }
  loadSong(songIndex);
  playSong();
};

//9. slider update when clicked/dragged

const slideTo = () => {
  //calculate position by percentage of slider relative to duration of the song
  let slideTo = currentSong.duration * (slider.value / 100);
  currentSong.currentTime = slideTo; 
};

//setUpdate function

const setUpdate = () => {
  let seekPosition = 0;
  if (!isNaN(currentSong.duration)) {
    seekPosition = (currentSong.currentTime / currentSong.duration) * 100;
    slider.value = seekPosition;

    let currentMins = Math.floor(currentSong.currentTime / 60);
    let currentSecs = Math.floor(currentSong.currentTime - currentMins * 60);
    let durationMins = Math.floor(currentSong.duration / 60);
    let durationSecs = Math.floor(currentSong.duration - durationMins * 60);

    if (currentSecs < 10) {
      currentSecs = "0" + currentSecs;
    }
    if (durationSecs < 10) {
      durationSecs = "0" + durationSecs;
    }
    if (currentMins < 10) {
      currentMins = "0" + currentMins;
    }
    if (durationMins < 10) {
      durationMins = "0" + durationMins;
    }

    currentTime.innerHTML = currentMins + ":" + currentSecs;
    songDuration.innerHTML = durationMins + ":" + durationSecs;
  }
};

loadSong(songIndex);