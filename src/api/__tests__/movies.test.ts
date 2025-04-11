import { searchMovies } from '../movies';

// Mock di fetch
global.fetch = jest.fn();

describe('searchMovies', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should return movies when API call is successful', async () => {
    const mockMovies = [
      {
        title: 'Inception',
        year: 2010,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMovies)
    });

    const result = await searchMovies('inception');
    expect(result).toEqual(mockMovies);
    expect(global.fetch).toHaveBeenCalledWith('https://localhost:8080/mock?keywords=inception');
  });

  it('should throw an error when API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(searchMovies('inception')).rejects.toThrow('HTTP error! status: 500');
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(searchMovies('inception')).rejects.toThrow('Network error');
  });
}); 