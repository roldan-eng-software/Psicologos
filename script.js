/* =====================================================================
   CONFIGURAÇÃO — edite aqui os dados reais do consultório
   ===================================================================== */
const CONFIG = {
  nome: "Amanda Soad",
  crp: "CRP 06/XXXXXX",                 // Substituir pelo número real
  whatsapp: "5516999999999",             // DDI + DDD + número, só dígitos
  whatsappMensagem: "Olá! Gostaria de agendar uma consulta de avaliação.",

  // Link do perfil no Google Maps (o que você enviou)
  googleMapsUrl: "https://maps.app.goo.gl/s8zUuFZSyBsvC5276",
  // Coordenadas do consultório (extraídas do link do Maps)
  coords: { lat: -22.012583, lng: -47.8999 },
  endereco: "Endereço do consultório, São Carlos - SP", // Substituir pelo endereço completo

  // Nota e total de avaliações. Deixe null para ocultar o selo de nota.
  // Copie esses números diretamente do perfil no Google Maps.
  avaliacoes: { nota: null, total: null },

  // Avaliações reais copiadas do Google Maps.
  // Os itens abaixo são APENAS EXEMPLOS de formato: substitua por avaliações reais
  // (com autorização do paciente) antes de publicar.
  reviews: [
    { nome: "Nome do paciente", inicial: "N", texto: "Substitua por uma avaliação real copiada do Google Maps.", data: "há 1 mês", nota: 5 },
    { nome: "Nome do paciente", inicial: "N", texto: "Substitua por uma avaliação real copiada do Google Maps.", data: "há 2 meses", nota: 5 },
    { nome: "Nome do paciente", inicial: "N", texto: "Substitua por uma avaliação real copiada do Google Maps.", data: "há 3 meses", nota: 5 },
  ],
};

/* =====================================================================
   PREENCHIMENTO DE DADOS
   ===================================================================== */
function preencherDados() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("crpText").textContent = CONFIG.crp;
  document.getElementById("addressText").textContent = CONFIG.endereco;

  const msg = encodeURIComponent(CONFIG.whatsappMensagem);
  document.getElementById("whatsappCta").href = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;

  document.getElementById("mapsLink").href = CONFIG.googleMapsUrl;
  document.getElementById("ratingLink").href = CONFIG.googleMapsUrl;

  const { lat, lng } = CONFIG.coords;
  document.getElementById("mapFrame").src =
    `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  // Selo de nota (só aparece se preenchido)
  const meta = document.getElementById("ratingMeta");
  const { nota, total } = CONFIG.avaliacoes;
  if (nota && total) {
    const estrelas = "★".repeat(Math.round(nota)) + "☆".repeat(5 - Math.round(nota));
    meta.innerHTML = `<span class="stars" aria-label="${nota} de 5 estrelas">${estrelas}</span>
                      <span>${nota.toFixed(1)} · ${total} avaliações</span>`;
  } else {
    document.getElementById("ratingBox").querySelector(".rating-google").after(
      Object.assign(document.createElement("span"), { textContent: "Avaliações de pacientes" })
    );
    meta.remove();
  }
}

/* =====================================================================
   CARROSSEL DE AVALIAÇÕES
   ===================================================================== */
function renderizarAvaliacoes() {
  const track = document.getElementById("reviewsTrack");
  const dots = document.getElementById("reviewsDots");

  CONFIG.reviews.forEach((r) => {
    const card = document.createElement("article");
    card.className = "review reveal-item";
    card.innerHTML = `
      <div class="stars" aria-label="${r.nota} de 5 estrelas">${"★".repeat(r.nota)}</div>
      <p class="review-text">“${r.texto}”</p>
      <div class="review-author">
        <span class="avatar">${r.inicial}</span>
        <div>
          <div class="review-name">${r.nome}</div>
          <div class="review-date">${r.data}</div>
        </div>
      </div>`;
    track.appendChild(card);
  });

  CONFIG.reviews.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Ir para avaliação ${i + 1}`);
    b.addEventListener("click", () => irPara(i));
    dots.appendChild(b);
  });

  const cards = () => track.querySelectorAll(".review");
  const passo = () => (cards()[0]?.offsetWidth || 300) + 20;

  function irPara(i) {
    const c = cards()[i];
    if (c) track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function atualizarDots() {
    const idx = Math.round(track.scrollLeft / passo());
    [...dots.children].forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  document.getElementById("revPrev").addEventListener("click", () =>
    track.scrollBy({ left: -passo(), behavior: "smooth" }));
  document.getElementById("revNext").addEventListener("click", () =>
    track.scrollBy({ left: passo(), behavior: "smooth" }));
  track.addEventListener("scroll", atualizarDots, { passive: true });
  atualizarDots();
}

/* =====================================================================
   HEADER: borda ao rolar
   ===================================================================== */
function headerAoRolar() {
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* =====================================================================
   ANIMAÇÕES COM GSAP
   ===================================================================== */
function animarHero() {
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gallery = document.getElementById("gallery");
  const cards = gsap.utils.toArray(".float-card");
  const portrait = document.querySelector(".portrait");

  // Entrada da hero em sequência
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".badge", { y: -16, opacity: 0, duration: 0.8 })
    .from(".hero-title .line", { y: 60, opacity: 0, duration: 1.1, stagger: 0.18 }, "-=0.4")
    .from(".hero-title .script", { opacity: 0, scale: 0.92, duration: 1.4, ease: "power2.out" }, "-=0.8")
    .from(".hero-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.7")
    .from(".hero-actions .btn", { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6")
    .from(portrait, { y: 90, opacity: 0, scale: 0.92, duration: 1.6, ease: "power3.out" }, "-=1.1")
    .from(cards.map((c) => c.querySelector(".card-inner")), {
      opacity: 0,
      scale: 0.6,
      rotationY: -35,
      duration: 1.2,
      stagger: { each: 0.08, from: "random" },
    }, "-=1.2")
    .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.6");

  if (reduzir) return;

  // Flutuação contínua de cada card (em um wrapper interno, sem conflitar com o 3D do pai)
  cards.forEach((card) => {
    const inner = card.querySelector(".card-inner");
    gsap.to(inner, {
      y: gsap.utils.random(-14, -6),
      rotation: gsap.utils.random(-1.6, 1.6),
      duration: gsap.utils.random(3.2, 5.2),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: gsap.utils.random(0, 2),
    });
  });

  // Parallax com o mouse: a galeria inteira (cards + retrato) inclina em 3D
  const hero = document.getElementById("hero");
  const rotY = gsap.quickTo(gallery, "rotationY", { duration: 1, ease: "power3" });
  const rotX = gsap.quickTo(gallery, "rotationX", { duration: 1, ease: "power3" });

  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rotY(nx * 14);
    rotX(-ny * 8);
  });

  hero.addEventListener("pointerleave", () => {
    rotY(0);
    rotX(0);
  });
}

function animarSecoes() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });

  // Entrada escalonada dos cards de serviço e dos passos
  gsap.utils.toArray(".services, .steps").forEach((grupo) => {
    const itens = grupo.children;
    gsap.fromTo(itens, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: grupo, start: "top 85%", once: true },
    });
  });

  // Revela as avaliações em sequência dentro do carrossel
  gsap.fromTo(".review", { opacity: 0, x: 40 }, {
    opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
    scrollTrigger: { trigger: "#reviewsTrack", start: "top 85%", once: true },
  });

}

/* =====================================================================
   INICIALIZAÇÃO
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  preencherDados();
  renderizarAvaliacoes();
  headerAoRolar();

  if (typeof gsap === "undefined") {
    // Sem GSAP (ex.: CDN bloqueado): mostra tudo sem animação
    document.querySelectorAll(".reveal").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    return;
  }

  animarHero();
  animarSecoes();
});
