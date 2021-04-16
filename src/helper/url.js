export default {
    movie: {
        popular: 'movie/popular',
        upcoming: 'movie/upcoming',
        genre: 'genre/movie/list',
        search: 'search/movie',
        detail: (id) => `movie/${id}`,
        review: (id) =>  `movie/${id}/reviews`,
        recomendations: (id) => `movie/${id}/recommendations`
    }
}