console.log('hello world')


const apiKey = '7d1c10dd24374aba80c2720166e8bc19';
// console.log(apiKey)

const cardsContainer = document.getElementById('cards-container')

const searchField = document.getElementById('search-input')

const searchButton = document.getElementById('search-button')



searchButton.addEventListener('click', async () =>{

    const query = searchField.value.trim();
     
    if (query !== "") {
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)

        }
        
        catch(error) {
            console.log("Error fatching news by query", error)
        }
    }

})


async function fetchNewsQuery(query){

    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=us ${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles;
    }
    catch(error){
        console.log('Error fetchig radom news', error)
        return []
    }

}



async function fetchRandomNews () {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles;
    }
    catch(error){
        console.log('Error fetchig radom news', error)
        return []
    }
}

function displayBlogs (articles) {
    cardsContainer.innerHTML = ''
    articles.forEach((articles) =>{
        const blogCard = document.createElement("div")
        blogCard.classList.add('blog-cards')
        const img = document.createElement('img')
        img.src = articles.urlToImage
        img.alt = articles.title
        const title = document.createElement('h2')
        title.textContent = articles.title
        const description = document.createElement('p')

        const truncatedTitle = 
        articles.title.length > 30
        ? articles.title.slice(0, 30) + "...."
        : articles.title;
        title.textContent = truncatedTitle

        const truncatedDes = 
        articles.description.length > 30
        ? articles.description.slice(0, 30) + "...."
        : articles.description;
        description.textContent = truncatedDes


        

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click', () => {
            window.open(articles.url, "_blank")
        })
        cardsContainer.appendChild(blogCard)

    })
}

(async ()=>{
    try{
      const articles =  await fetchRandomNews()
      displayBlogs(articles);
      console.log(articles)
    }
    catch(error) {
        console.log('Error fetchig radom news', error) 
    }
})();