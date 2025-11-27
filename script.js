const tracks = [
  { file: "audio/01-deusa-do-amor.mp3", title: "deusa do amor – silva" },
  { file: "audio/02-ter-o-coracao-no-chao.mp3", title: "ter o coração no chão – anavitória" },
  { file: "audio/03-tenha-calma-sem-voce.mp3", title: "tenha calma / sem você – djavan" },
  { file: "audio/04-selva.mp3", title: "selva – anavitória" },
  { file: "audio/05-ao-teu-lado.mp3", title: "ao teu lado – liniker" },
  { file: "audio/06-palavras-no-corpo.mp3", title: "palavras no corpo – gal costa" },
  { file: "audio/07-monalisa.mp3", title: "monalisa – jorge vercillo" },
  { file: "audio/08-vilarejo.mp3", title: "vilarejo – tribalistas" },
  { file: "audio/09-i-wanna-be-yours.mp3", title: "i wanna be yours – arctic monkeys" },
  { file: "audio/10-um-amor-puro.mp3", title: "um amor puro – djavan" },
  { file: "audio/11-dia-branco.mp3", title: "dia branco – geraldo azevedo" },
  { file: "audio/12-ainda-bem.mp3", title: "ainda bem – vanessa da mata" },
  { file: "audio/13-a-primeira-vista.mp3", title: "à primeira vista – chico césar" },
  { file: "audio/14-until-i-found-you.mp3", title: "until i found you – stephen sanchez" },
  { file: "audio/15-disritmia.mp3", title: "disritmia – casuarina" },
  { file: "audio/16-agua-de-chuva-no-mar.mp3", title: "água de chuva no mar – beth carvalho" },
  { file: "audio/17-eternamente.mp3", title: "eternamente – gal costa" },
  { file: "audio/18-o-jeito.mp3", title: "o jeito – flora matos" },
  { file: "audio/19-veludo-marrom.mp3", title: "veludo marrom – liniker" },
  { file: "audio/20-best-part.mp3", title: "best part – daniel caesar" }
];

let currentTrack = 0;

/* DOM */
const intro = document.getElementById("intro");
const player = document.getElementById("player");
const startBtn = document.getElementById("startBtn");

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const playPause = document.getElementById("playPause");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const tracklistEl = document.getElementById("tracklist");
const progressBar = document.getElementById("progressBar");

/* MODAL */
const modal = document.getElementById("lyricsModal");
const lyricsTitleEl = document.getElementById("lyricsTitle");
const lyricsContentEl = document.getElementById("lyricsContent");
const closeBtn = document.querySelector(".close-btn");

/* INTRO → PLAYER */
startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  player.style.display = "flex";
});

/* BUILD LISTA */
function buildTracklist() {
  tracklistEl.innerHTML = "";

  tracks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t.title;
    li.dataset.index = i;

    li.addEventListener("click", () => {
      currentTrack = i;
      loadTrack();
      audio.play();
      playPause.textContent = "⏸";
    });

    tracklistEl.appendChild(li);
  });
}

function loadTrack() {
  audio.src = tracks[currentTrack].file;
  highlightTrack();
}

function highlightTrack() {
  const lis = tracklistEl.querySelectorAll("li");
  lis.forEach(li => li.classList.remove("current"));

  const cur = tracklistEl.querySelector(`li[data-index="${currentTrack}"]`);
  if (cur) cur.classList.add("current");
}

/* CONTROLES */
playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = "⏸";
  } else {
    audio.pause();
    playPause.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack();
  audio.play();
  playPause.textContent = "⏸";
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack();
  audio.play();
  playPause.textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = pct + "%";
});

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack();
  audio.play();
});

/* MODAL LETRAS */
tracklistEl.addEventListener("dblclick", () => abrirModalLyrics());

function abrirModalLyrics() {
  modal.style.display = "block";
  showLyrics(currentTrack);
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function showLyrics(index) {
  lyricsTitleEl.textContent = tracks[index].title;
  lyricsContentEl.textContent = letrasMixtape[index] || "Letra não encontrada.";
}

/* INICIAR */
buildTracklist();
loadTrack();
