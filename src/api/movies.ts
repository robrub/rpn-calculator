export interface Movie {
  title: string;
  year: number;
  description: string;
}

export async function searchMovies(keywords: string): Promise<Movie[]> {
  try {
    const response = await fetch(`https://localhost:8080/mock?keywords=${encodeURIComponent(keywords)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
} 