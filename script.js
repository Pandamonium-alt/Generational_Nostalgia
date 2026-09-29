/* ====== CONFIGURACIÓN ====== */
const CONFIG = {
  left: {
    cover: "cover-left.jpg",   // portada del vinilo izquierdo
    song:  "Inicio.mp3"
  },
  right: {
    cover: "cover-right.jpg",  // portada del vinilo derecho
    song:  "Final.mp3"
  }
};
/* ======================================= */

const players = {};
let current = null;

function stop(id) {
  const p = players[id];
  p.audio.pause();
  p.audio.currentTime = 0;
  p.el.classList.remove("playing");
  p.el.classList.add("locked");   // evita que el hover lo mantenga afuera
  if (current === id) current = null;
}

function play(id) {
  if (current && current !== id) stop(current);
  const p = players[id];
  p.el.classList.remove("locked");
  p.el.classList.add("playing");
  p.audio.play().catch(() => stop(id));
  current = id;
}

Object.keys(CONFIG).forEach(id => {
  const el = document.getElementById("vinyl-" + id);
  el.querySelector(".sleeve img").src = CONFIG[id].cover;
  const audio = new Audio(CONFIG[id].song);
  audio.loop = true;
  players[id] = { el, audio };

  el.addEventListener("click", () => {
    el.classList.contains("playing") ? stop(id) : play(id);
  });
  el.addEventListener("mouseleave", () => el.classList.remove("locked"));
});
