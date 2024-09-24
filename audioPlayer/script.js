window.addEventListener("DOMContentLoaded", () => {
  const arrayOfSongs = [
    {
      id: 1,
      group: "Toshiro Masuda",
      name: "Grief and Sorrow",
      src: "./assets/audio/Toshiro_Masuda-Grief_and_Sorrow.mp3",
      background: "./assets/img/naruto_sad.jpg",
      playerImg: "./assets/img/naruto_sad.jpg",
    },
    {
      id: 2,
      group: "Ikimono-gakari",
      name: "Blue bird",
      src: "./assets/audio/naruto_blue_bird.mp3",
      background: "./assets/img/naruto_blue_bird.jpg",
      playerImg: "./assets/img/naruto_blue_bird.jpg",
    },
    {
      id: 3,
      group: "Joe Inoue",
      name: "CLOSER",
      src: "./assets/audio/naruto_shikamaru_opening.mp3",
      background: "./assets/img/shikamaru_opening.jpeg",
      playerImg: "./assets/img/shikamaru_opening.jpeg",
    },
    {
      id: 4,
      group: "Akatsuki",
      name: "Itachi theme",
      src: "./assets/audio/Akatsuki_theme.mp3",
      background: "./assets/img/akatsuki_theme.jpg",
      playerImg:"./assets/img/akatsuki_theme.jpg",
    },
    {
      id: 5,
      group: "Seven oops",
      name: "Lovers",
      src: "./assets/audio/girls_theme.mp3",
      background: "./assets/img/girls.jpg",
      playerImg: "./assets/img/girls.jpg",
    },
    {
      id: 6,
      group: "Anime Kei",
      name: "Heavy violence",
      src: "./assets/audio/Heavy_violence.mp3",
      background: "./assets/img/kubi_theme.jpg",
      playerImg: "./assets/img/kubi_theme.jpg",
    },
    {
      id: 7,
      group: "Anime Kei",
      name: "Departure to the front lines",
      src: "./assets/audio/naruto_ending_hope.mp3",
      background: "./assets/img/hope.webp",
      playerImg: "./assets/img/hope.webp",
    },
  ];

  let songCounter = 0;
  let isPlayed = false;
  let isProgressChanging = false;

  const audio = new Audio();
  const playBtn = document.querySelector("#playBtn");
  const playBtnIcon = document.querySelector("#playBtnIcon");
  const prevBtn = document.querySelector(".prew");
  const nextBtn = document.querySelector(".next");
  const group = document.querySelector(".group");
  const songName = document.querySelector(".song-name");
  const songDuration = document.querySelector(".song-duration");
  const currentTime = document.querySelector(".current-time");
  const progress = document.querySelector(".progress");
  const imgComtainer = document.querySelector(".player__img-container");
  const vinil = document.querySelector(".vinil-container img");
  initSong(arrayOfSongs[songCounter]);
  nextBtn.addEventListener("click", () => {
    songCounter = (songCounter < arrayOfSongs.length - 1) ? songCounter + 1 : 0;
    initSong(arrayOfSongs[songCounter]);
  });
  prevBtn.addEventListener("click", () => {
    songCounter = (songCounter > 0) ? songCounter - 1 : arrayOfSongs.length - 1;
    initSong(arrayOfSongs[songCounter]);
  });
  audio.addEventListener("ended", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  progress.addEventListener("input", () => isProgressChanging = true);
  progress.addEventListener("change", () => {
    isProgressChanging = false;
    audio.currentTime = progress.valueAsNumber;
  });

  function initSong(song) {
    audio.src = song.src;
    songName.textContent = song.name;
    group.textContent = song.group;
    document.body.style.backgroundImage = `url(${song.background})`;
    imgComtainer.innerHTML = `<img src="${song.playerImg}" alt="song-img">`;
    audio.addEventListener("loadedmetadata", () => {
      songDuration.textContent = secondsToTime(audio.duration);
      progress.setAttribute("max", Math.floor(audio.duration));
      progress.valueAsNumber = 0;
    });
    if (isPlayed) audio.play();
  }

  function togglePlayPause() {
    isPlayed = audio.paused;
    if (isPlayed) {
      audio.play();
      vinil.style.animationPlayState = "running";
      toggleIcon("pause");
    } else {
      audio.pause();
      vinil.style.animationPlayState = "paused";
      toggleIcon("play");
    }
  }

  function toggleIcon(action) {
    playBtnIcon.classList.toggle("fa-play", action === "play");
    playBtnIcon.classList.toggle("fa-pause", action === "pause");
    playBtnIcon.title = action === "play" ? "Play" : "Pause";
  }
  function secondsToTime(sec) {
    const min = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${min}:${addZero(seconds)}`;
  }
  function addZero(num) {
    return num >= 10 ? num : `0${num}`;
  }

  setInterval(() => {
    if (!audio.paused) {
      currentTime.textContent = secondsToTime(audio.currentTime);
      if (!isProgressChanging) {
        progress.valueAsNumber = Math.floor(audio.currentTime);
      }
    }
  }, 1000);

  function nextSong() {
    songCounter = (songCounter + 1) % arrayOfSongs.length;
    initSong(arrayOfSongs[songCounter]);
  }
});
