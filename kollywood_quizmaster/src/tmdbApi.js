/**
 * TMDB API Utility for Kollywood QuizMaster
 * Securely and efficiently fetches Kollywood (Tamil) movie data and assets for quiz use.
 * Uses the public API key: 5bc67d3b06aecbd18121a3cbbc16eb59
 * 
 * Note: While the API key is included here for demo/development as per TMDB policy,
 * it is recommended to restrict usage via TMDB's API settings (allowed referrers/origins) and
 * avoid committing this to public repositories for production projects.
 */

// Base URL for TMDB API
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "5bc67d3b06aecbd18121a3cbbc16eb59";

// Helper function to construct API URLs with authentication
function buildUrl(endpoint, params = {}) {
  // Always add API key and language (Tamil-focused: "ta-IN")
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  url.searchParams.append('language', 'ta-IN');
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  return url.toString();
}

/**
 * PUBLIC_INTERFACE
 * Fetches a list of popular Kollywood movies (in Tamil language).
 * @param {number} page - The results page number (default: 1)
 * @returns {Promise<Object>} - Movie results from TMDB
 */
export async function fetchPopularTamilMovies(page = 1) {
  const url = buildUrl('/discover/movie', {
    sort_by: 'popularity.desc',
    with_original_language: 'ta',
    page
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch popular Tamil movies');
  return response.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetches TMDB details for a given movie ID.
 * @param {number|string} movieId - The TMDB movie ID
 * @returns {Promise<Object>} - Movie details object
 */
export async function fetchMovieDetails(movieId) {
  const url = buildUrl(`/movie/${movieId}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetches images (posters/backdrops) for a given movie.
 * @param {number|string} movieId - The TMDB movie ID
 * @returns {Promise<Object>} - Movie images object
 */
export async function fetchMovieImages(movieId) {
  const url = buildUrl(`/movie/${movieId}/images`, { include_image_language: 'ta,null' });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movie images');
  return response.json();
}

/**
 * PUBLIC_INTERFACE
 * Search for Tamil (Kollywood) movies by title
 * @param {string} query - Movie title search string
 * @param {number} page - Results page (default: 1)
 * @returns {Promise<Object>} - Search results object
 */
export async function searchTamilMovies(query, page = 1) {
  const url = buildUrl('/search/movie', {
    query,
    with_original_language: 'ta',
    page
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetch the credits (cast, crew) for a given movie.
 * @param {number|string} movieId - The TMDB movie ID
 * @returns {Promise<Object>} - Credits object (cast, crew)
 */
export async function fetchMovieCredits(movieId) {
  const url = buildUrl(`/movie/${movieId}/credits`);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch movie credits');
  return response.json();
}

/**
 * PUBLIC_INTERFACE
 * Returns the full poster URL from TMDB poster path.
 * @param {string} path - Poster path (from TMDB API)
 * @param {string} size - Size specifier ('w500', 'original', etc.; default: 'w500')
 * @returns {string} - Full image URL
 */
export function getPosterUrl(path, size = "w500") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

// Add more utility functions as needed (ex: fetch genres, trending, etc.)

/**
 * Usage Example:
 *
 * // In your component:
 * import { fetchPopularTamilMovies, fetchMovieDetails, getPosterUrl } from './tmdbApi';
 * 
 * useEffect(() => {
 *   fetchPopularTamilMovies().then(data => setMovies(data.results));
 * }, []);
 */
