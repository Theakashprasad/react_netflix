const key = import.meta.env.VITE_TMDB_KEY;

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=horror`,
  videosRequest: `https://api.themoviedb.org/3/movie/897087/videos?api_key=${key}`,
};

export function creatImageUrl(filname: string, size: string) {
  return `https://image.tmdb.org/t/p/${size}/${filname}`;
}

export default requests;

// requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming`,
