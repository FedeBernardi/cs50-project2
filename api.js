export const searchToAPIByTitle = async (text, page = 1) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e984745b&s=${text}&page=${page}`),
          data = await response.json();

    return data;
}

export const searchToAPIById = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e984745b&i=${id}`);
          data = await response.json();
    
    return data;
}
