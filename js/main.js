const apiKey = "765e6d14e97e4d86841a758c39cab2e5"
const apiUrl = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`

const newsContainer = document.getElementById("news-container")

// Efeito scroll top button
const scrollTopButton = document.querySelector("#scroll-top-button")

const onScroll = () => {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop

  scrollTopButton.classList.toggle("visible", scrollPosition > 0)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

scrollTopButton.addEventListener("click", scrollToTop)
window.addEventListener("scroll", onScroll)

// Função para criar os elementos HTML para uma notícia
function createNewsElement(news) {
  const newsElement = document.createElement("div")
  newsElement.classList.add("news")

  const img = document.createElement("img")
  img.src = news.urlToImage
  img.alt = ""

  const description = document.createElement("div")
  description.classList.add("description")

  const h2 = document.createElement("h2")
  h2.textContent = news.title

  const p = document.createElement("p")
  p.textContent = news.description

  const infos = document.createElement("div")
  infos.classList.add("infos")

  const buttonUrl = document.createElement("button")
  buttonUrl.classList.add("fonte")
  buttonUrl.textContent = "Visitar"
  buttonUrl.addEventListener("click", () => {
    alert("Botao clicado")
    window.open(news.url, "_blank")
  })

  const span = document.createElement("span")
  // span.textContent = moment(news.publishedAt).fromNow()

  description.appendChild(h2)
  description.appendChild(p)
  infos.appendChild(buttonUrl)
  infos.appendChild(span)
  newsElement.appendChild(img)
  newsElement.appendChild(description)
  newsElement.appendChild(infos)

  return newsElement
}

// Função para adicionar as notícias no container
function renderNews(news, append) {
  if (!append) {
    newsContainer.innerHTML = ""
  }

  news.forEach((n) => {
    const newsElement = createNewsElement(n)
    if (append) {
      newsContainer.appendChild(newsElement)
    } else {
      newsContainer.innerHTML += newsElement.outerHTML
    }
  })
}

// Fazer a requisição à API e adicionar as notícias no container
fetch(apiUrl, { mode: "cors" })
  .then((response) => response.json())
  .then((data) => {
    renderNews(data.articles)
  })
  .catch((error) => {
    console.error(error)
  })

const categoryButtons = document.querySelectorAll(".category")
window.addEventListener("load", function () {
  const feed = document.querySelector("#myFeed")
  feed.classList.add("categoryActive")
})

// Adicione um ouvinte de clique para cada botão de categoria
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remova a classe "categoryActive" de todos os botões de categoria
    categoryButtons.forEach((btn) => btn.classList.remove("categoryActive"))
    // Adicione a classe "categoryActive" apenas ao botão clicado
    button.classList.add("categoryActive")

    let category = button.textContent
    let apiUrl

    // Alterne a URL da API com base na categoria selecionada
    switch (category) {
      case "Meu feed":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`
        break
      case "Tecnologia":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=${apiKey}`
        break
      case "Entretenimento":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=entertainment&apiKey=${apiKey}`
        break
      case "Negócios":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=${apiKey}`
        break
      case "Esportes":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=sports&apiKey=${apiKey}`
        break
      case "Saúde":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=health&apiKey=${apiKey}`
        break
      case "Ciência":
        apiUrl = `https://newsapi.org/v2/top-headlines?country=br&category=science&apiKey=${apiKey}`
        break
    }

    // Role para o topo da tela
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Selecionar o elemento de carregamento
    const loading = document.getElementById("loading")

    // Mostrar o elemento de carregamento antes de fazer a requisição
    loading.style.display = "block"

    // Fazer a requisição à API e adicionar as notícias no container
    fetch(apiUrl, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        // Esconder o elemento de carregamento após receber os dados da API
        loading.style.display = "none"
        renderNews(data.articles)
      })
      .catch((error) => {
        console.error(error)
        // Esconder o elemento de carregamento em caso de erro
        loading.style.display = "none"
      })

    // Fazer uma nova solicitação à API com a URL atualizada e renderizar as notícias resultantes
    fetch(apiUrl, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => renderNews(data.articles))
      .catch((error) => console.error(error))
  })
})
