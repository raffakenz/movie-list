const API_KEY = '3c483ad49a430edbb0b61ed107237a37'

let page = 1
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = 'https://image.tmdb.org/t/p/w1280'
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function updatePage() {
    getMovies(API_URL())
        currentPage.innerHTML = page
}

function nextPage() {
    if (page >= 1) {
        page += 1
        updatePage()
    }
}

function prevPage() {
    if (page > 1) {
        page -= 1
        updatePage()
    }
}

next.addEventListener('click', function() {
    nextPage()
})

prev.addEventListener('click', function() {
    prevPage()
})

function showMovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path, overview, popularity, vote_average} = movie
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie')
        movieCard.innerHTML = `
            <img src='${API_IMAGE_URL + poster_path}' alt='Poster movie'>
            <div class='detail'>
                <h3>${title}</h3>
                <h4>Synopsis</h4>
                <p>${overview}</p>
                <h4>Rating: ${vote_average}/10</h4>
            </div>
        `
        moviesElement.appendChild(movieCard)
    });
}

getMovies(API_URL())

searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const searchQuery = search.value

    if (searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

updatePage()

judul.addEventListener('click', function() {
    location.reload()
})