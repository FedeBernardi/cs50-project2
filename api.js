export const searchToAPIByTitle = async (text, page = 1) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e984745b&s=${text}&page=${page}`),
          data = await response.json();

    return data.Search.map(processMoviesList);
}

function processMoviesList(movie) {
    let years = movie.Year.split('–');
    if (movie.Type === 'series' && !years[1]) {
        years[1] = 'Now';
    }

    return {
        title: movie.Title,
        imdbID: movie.imdbID,
        poster: movie.Poster,
        year: years.join(' - '),
        type: movie.Type
    };
}

export const searchToAPIById = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e984745b&i=${id}`);
          data = await response.json();
    
    return processMovieDetails(data);
}

function processMovieDetails(movie) {
    return {
        title: movie.Title,
        poster: movie.Poster,
        genres: movie.Genre.split(', '),
        actors: movie.Actors,
        imdbRating: movie.imdbRating,
        released: movie.Released.split(' ')[2],
        rated: movie.Rated,
        runtime: movie.Typhe !== 'series' ? movie.Runtime : `${movie.totalSeasons} seasons`,
        plot: movie.Plot,
        type: movie.Type,
    }
}
