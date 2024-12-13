import { Movie, MovieResponse } from "../types/movies.interface";

export const fetchMovies = async (
    sort: string,
    limit: number,
    page: number,
    queryTerm: string
): Promise<{ movies: Movie[]; totalMovies: number }> => {
    try {
        const response = await fetch(
            `https://yts.mx/api/v2/list_movies.json?sort=${sort}&limit=${limit}&page=${page}&query_term=${queryTerm}`
        );
        const data: MovieResponse = await response.json();
        return { movies: data.data.movies || [], totalMovies: data.data.movie_count || 0 };
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { movies: [], totalMovies: 0 };
    }
};