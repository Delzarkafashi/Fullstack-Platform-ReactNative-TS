using Api.Dtos;

namespace Api.Data;

public interface IArticlesRepository
{
    Task<List<ArticleListItemDto>> GetLatestAsync(int limit = 12);
    Task<ArticleDetailsDto?> GetByIdAsync(int id);
}
