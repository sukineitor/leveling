// Elementos DOM
const loadingOverlay = document.getElementById("loading-overlay")
const loadingQuoteText = document.getElementById("loading-quote-text")
const mainContent = document.getElementById("main-content")
const enterPortalBtn = document.getElementById("enter-portal-btn")
const episodesSection = document.getElementById("episodes-section")
const searchInput = document.getElementById("search-input")
const clearSearch = document.getElementById("clear-search")
const episodesGrid = document.getElementById("episodes-grid")
const particlesContainer = document.getElementById("particles-container")
const bloodEffects = document.querySelector(".blood-effects")

// Frases épicas para la pantalla de carga
const epicQuotes = [
  "Surge...",
  "Levántate...",
  "Soy el Cazador de Sombras...",
  "Arrodíllate...",
  "Solo yo, me levantaré...",
  "La muerte es solo el comienzo...",
  "Extiendo mi dominio...",
  "Intercambio Ascendente...",
  "Yo solo, soy suficiente...",
]

// Modificar la estructura de datos de los episodios para incluir el contador de clics
const episodes = [
  {
    id: 1,
    title: "Episodio 1 - El Despertar del Cazador",
    image: "https://i.pinimg.com/736x/d7/0f/b3/d70fb3ecb2742092221a2fcaa0d933ca.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 2,
    title: "Episodio 2 - La Puerta Roja",
    image: "https://i.pinimg.com/736x/24/c9/2d/24c92d38b42c8bd3688e773112f273cf.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 3,
    title: "Episodio 3 - La Mazmorra Doble",
    image: "https://i.pinimg.com/736x/6d/be/81/6dbe813c92431b3110ce5808bb3c3634.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 4,
    title: "Episodio 4 - El Sistema",
    image: "https://i.pinimg.com/736x/4a/85/23/4a85232bb191a2c64c0c85cb47cfff4c.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 5,
    title: "Episodio 5 - Levantamiento",
    image: "https://i.pinimg.com/736x/0b/bb/be/0bbbbebdff0f0280280408752699b5ab.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 6,
    title: "Episodio 6 - Cazador Rango E",
    image: "https://i.pinimg.com/736x/16/a8/88/16a888c3d09e869b62c5d809436e211a.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 7,
    title: "Episodio 7 - La Prueba de Rango",
    image: "https://i.pinimg.com/736x/21/f5/62/21f562ff0f357d0f48ae59b6c79d3257.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 8,
    title: "Episodio 8 - El Poder de las Sombras",
    image: "https://i.pinimg.com/736x/65/4d/d0/654dd09bbd02460f8470ad8ec8813600.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 9,
    title: "Episodio 9 - La Batalla en la Torre",
    image: "https://i.pinimg.com/736x/bc/ec/7d/bcec7df7a46d0f963ac4b1d40179a8bd.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 10,
    title: "Episodio 10 - El Rey de las Sombras",
    image: "https://i.pinimg.com/736x/ff/5c/e2/ff5ce2b485c181284d01c44d8bfe50e6.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 11,
    title: "Episodio 11 - El Ejército Oscuro",
    image: "https://i.pinimg.com/736x/fe/cd/4a/fecd4abeade0e41bfbec60f9ece701cc.jpg",
    viewed: false,
    clickCount: 0,
  },
  {
    id: 12,
    title: "Episodio 12 - Ascensión",
    image: "https://i.pinimg.com/736x/81/37/b4/8137b4704aa88f64ccb365adb769e44c.jpg",
    viewed: false,
    clickCount: 0,
  },
]

// Cargar episodios vistos y contadores de clics desde localStorage
function loadViewedEpisodes() {
  // Cargar episodios vistos
  const viewedEpisodes = JSON.parse(localStorage.getItem("viewedEpisodes")) || []
  viewedEpisodes.forEach((id) => {
    const episode = episodes.find((ep) => ep.id === id)
    if (episode) episode.viewed = true
  })

  // Cargar contadores de clics
  const clickCounts = JSON.parse(localStorage.getItem("episodeClickCounts")) || {}
  Object.keys(clickCounts).forEach((id) => {
    const episode = episodes.find((ep) => ep.id === Number.parseInt(id))
    if (episode) episode.clickCount = clickCounts[id]
  })
}

// Guardar contador de clics en localStorage
function saveClickCount(id, count) {
  const clickCounts = JSON.parse(localStorage.getItem("episodeClickCounts")) || {}
  clickCounts[id] = count
  localStorage.setItem("episodeClickCounts", JSON.stringify(clickCounts))
}

// Guardar episodio visto en localStorage
function saveViewedEpisode(id) {
  const viewedEpisodes = JSON.parse(localStorage.getItem("viewedEpisodes")) || []
  if (!viewedEpisodes.includes(id)) {
    viewedEpisodes.push(id)
    localStorage.setItem("viewedEpisodes", JSON.stringify(viewedEpisodes))
  }
}

// Crear partículas de fondo
function createParticles() {
  const particleCount = 80

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Asignar color aleatorio (azul o rojo)
    if (Math.random() > 0.3) {
      particle.classList.add("particle-blue")
    } else {
      particle.classList.add("particle-red")
    }

    // Tamaño aleatorio
    const size = Math.random() * 6 + 1
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Posición aleatoria
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // Animación
    particle.style.animation = `float ${5 + Math.random() * 15}s linear infinite`
    particle.style.animationDelay = `${Math.random() * 5}s`

    particlesContainer.appendChild(particle)
  }
}

// Crear efecto de sangre
function createBloodEffect() {
  const bloodDrops = document.querySelectorAll(".blood-drop")

  bloodDrops.forEach((drop) => {
    // Posición aleatoria
    drop.style.left = `${Math.random() * 100}%`
    drop.style.top = "0"

    // Tamaño aleatorio
    const width = Math.random() * 4 + 2
    const height = Math.random() * 100 + 50
    drop.style.width = `${width}px`

    // Animación
    drop.style.animation = `bloodDrip ${2 + Math.random() * 4}s ease-in forwards`
    drop.style.animationDelay = `${Math.random() * 2}s`

    // Reiniciar animación cuando termine
    drop.addEventListener("animationend", () => {
      drop.style.animation = "none"
      setTimeout(() => {
        drop.style.left = `${Math.random() * 100}%`
        drop.style.animation = `bloodDrip ${2 + Math.random() * 4}s ease-in forwards`
      }, 100)
    })
  })
}

// Cambiar frases de carga
function cycleLoadingQuotes() {
  let currentIndex = 0

  const interval = setInterval(() => {
    loadingQuoteText.style.opacity = 0
    loadingQuoteText.style.transform = "translateY(20px)"

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % epicQuotes.length
      loadingQuoteText.textContent = epicQuotes[currentIndex]
      loadingQuoteText.style.opacity = 1
      loadingQuoteText.style.transform = "translateY(0)"
    }, 500)
  }, 2000)

  return interval
}

// Renderizar episodios
function renderEpisodes(episodesList) {
  episodesGrid.innerHTML = ""

  if (episodesList.length === 0) {
    episodesGrid.innerHTML = '<div class="no-results">No se encontraron episodios</div>'
    return
  }

  episodesList.forEach((episode) => {
    const episodeCard = document.createElement("div")
    episodeCard.classList.add("episode-card")
    episodeCard.dataset.id = episode.id

    episodeCard.innerHTML = `
            <div class="episode-image">
                <img src="${episode.image}" alt="${episode.title}">
                <div class="episode-overlay">
                    <div class="play-icon">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="episode-info">
                <h3 class="episode-title">${episode.title}</h3>
                <div class="episode-status">
                    ${episode.viewed ? '<span class="viewed-badge">Visto</span>' : "Haz clic para ver"}
                </div>
            </div>
        `

    episodeCard.addEventListener("click", () => {
      const episodeId = Number.parseInt(episodeCard.dataset.id)
      const episode = episodes.find((ep) => ep.id === episodeId)

      if (episode) {
        // Mostrar efecto de sangre
        bloodEffects.style.opacity = 1
        setTimeout(() => {
          bloodEffects.style.opacity = 0
        }, 2000)

        // Incrementar contador de clics
        if (!episode.clickCount) {
          episode.clickCount = 0
        }

        episode.clickCount++

        // Guardar contador de clics
        saveClickCount(episodeId, episode.clickCount)

        // Determinar a qué URL redirigir
        let url
        if (episode.clickCount % 2 === 1) {
          // Primer enlace: siempre el mismo para todos los episodios
          url = "htttps:leojhonv.jpg.com"
        } else {
          // Segundo enlace: incluye el número del episodio
          url = `https://www.anime-jl.net/anime/1281/solo-leveling-latino/episodio-${episodeId}`
        }

        // Marcar como visto
        episode.viewed = true
        saveViewedEpisode(episodeId)

        // Actualizar la UI para mostrar como visto
        renderEpisodes(filterEpisodes(searchInput.value))

        // Redirigir a la URL correspondiente
        window.open(url, "_blank")
      }
    })

    episodesGrid.appendChild(episodeCard)
  })
}

// Filtrar episodios por búsqueda
function filterEpisodes(query) {
  if (!query) return episodes

  const normalizedQuery = query.toLowerCase()
  return episodes.filter((episode) => episode.title.toLowerCase().includes(normalizedQuery))
}

// Inicializar la aplicación
function initApp() {
  // Crear efecto de partículas
  createParticles()

  // Crear efecto de sangre
  createBloodEffect()

  // Cargar episodios vistos
  loadViewedEpisodes()

  // Iniciar ciclo de frases épicas
  const quoteInterval = cycleLoadingQuotes()

  // Simular tiempo de carga
  setTimeout(() => {
    clearInterval(quoteInterval)
    loadingOverlay.style.opacity = "0"

    setTimeout(() => {
      loadingOverlay.style.display = "none"
      mainContent.classList.remove("hidden")

      setTimeout(() => {
        mainContent.classList.add("visible")
      }, 100)
    }, 800)
  }, 4000)

  // Evento para entrar al portal
  enterPortalBtn.addEventListener("click", () => {
    // Mostrar efecto de sangre
    bloodEffects.style.opacity = 1
    setTimeout(() => {
      bloodEffects.style.opacity = 0
    }, 2000)

    // Mostrar sección de episodios
    episodesSection.classList.remove("hidden")

    setTimeout(() => {
      episodesSection.classList.add("visible")

      // Renderizar episodios
      renderEpisodes(episodes)

      // Scroll suave a la sección de episodios
      episodesSection.scrollIntoView({ behavior: "smooth" })
    }, 100)
  })

  // Eventos de búsqueda
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim()

    if (query) {
      clearSearch.classList.remove("hidden")
    } else {
      clearSearch.classList.add("hidden")
    }

    renderEpisodes(filterEpisodes(query))
  })

  clearSearch.addEventListener("click", () => {
    searchInput.value = ""
    clearSearch.classList.add("hidden")
    renderEpisodes(episodes)
  })
}

// Iniciar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", initApp)

// Animación de flotación para partículas
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  const particles = document.querySelectorAll(".particle")
  particles.forEach((particle) => {
    const offsetX = (mouseX - 0.5) * 30
    const offsetY = (mouseY - 0.5) * 30

    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`
  })
})

// Efecto de paralaje para el fondo
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  particlesContainer.style.transform = `translateY(${scrollY * 0.3}px)`
})

