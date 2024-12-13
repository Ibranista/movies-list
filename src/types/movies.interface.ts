export interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    medium_cover_image: string;
    like_count: number;
}

export interface MovieResponse {
    data: {
        movies: Movie[];
        movie_count: number;
    };
}
