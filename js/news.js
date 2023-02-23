const apiKey = "GBdMXPj0Z0LOW3thtdXw4hZWk94Kq7M5"
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const stories = data.results
    const container = document.getElementById("stories-container")

    stories.forEach((story) => {
      const title = story.title
      const abstract = story.abstract
      const url = story.url

      const storyElement = document.createElement("div")
      storyElement.innerHTML = `
        <h2>${title}</h2>
        <p>${abstract}</p>
        <a href="${url}" target="_blank">Leia mais</a>
      `

      container.appendChild(storyElement)
    })
  })
  .catch((error) => {
    console.error(error)
  })
