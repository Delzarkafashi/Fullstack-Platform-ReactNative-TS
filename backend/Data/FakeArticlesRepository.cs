using Api.Dtos;

namespace Api.Data;

public sealed class FakeArticlesRepository : IArticlesRepository
{
    private static readonly List<ArticleDetailsDto> Items =
    [
        new ArticleDetailsDto
        {
            Id = 1,
            Title = "Mock Article 1",
            Excerpt = "Mock excerpt 1",
            ImageUrl = null,
            Category = "politics",
            PublishedAt = DateTime.UtcNow,
            Content = "Mock content 1",
            Slug = "mock-article-1"
        },
        new ArticleDetailsDto
        {
            Id = 2,
            Title = "Mock Article 2",
            Excerpt = "Mock excerpt 2",
            ImageUrl = null,
            Category = "sports",
            PublishedAt = DateTime.UtcNow,
            Content = "Mock content 2",
            Slug = "mock-article-2"
        }
    ];

    public Task<List<ArticleListItemDto>> GetLatestAsync(int limit = 12)
    {
        var list = Items
            .OrderByDescending(x => x.PublishedAt)
            .Take(limit)
            .Select(x => new ArticleListItemDto
            {
                Id = x.Id,
                Title = x.Title,
                Excerpt = x.Excerpt,
                ImageUrl = x.ImageUrl,
                Category = x.Category,
                PublishedAt = x.PublishedAt,
                Slug = x.Slug
            })
            .ToList();

        return Task.FromResult(list);
    }

    public Task<ArticleDetailsDto?> GetByIdAsync(int id)
    {
        var found = Items.FirstOrDefault(x => x.Id == id);
        return Task.FromResult(found);
    }
}
