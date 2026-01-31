using Api.Models;

namespace Api.Data;

public interface INewsRepository
{
    Task<List<News>> GetLatestAsync(int limit = 6);
    Task<News?> GetBySlugAsync(string slug);
}
