using Api.Dtos;

namespace Api.Data;

public interface IPageContentRepository
{
    Task<PageContentDto?> GetBySlugAsync(string slug);
}
