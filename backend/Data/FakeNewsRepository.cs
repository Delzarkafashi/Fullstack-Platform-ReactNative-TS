using Api.Models;

namespace Api.Data;

public sealed class FakeNewsRepository : INewsRepository
{
    private static readonly List<News> Items =
    [
        new News
        {
            Id = 1,
            Title = "Mock News 1",
            Slug = "mock-news-1",
            Category = "politics",
            PublishedAt = DateTimeOffset.UtcNow,
            Content = "Mock content 1"
        },
        new News
        {
            Id = 2,
            Title = "Mock News 2",
            Slug = "mock-news-2",
            Category = "sports",
            PublishedAt = DateTimeOffset.UtcNow,
            Content = "Mock content 2"
        }
    ];

    public Task<List<News>> GetLatestAsync(int limit = 6)
    {
        var list = Items
            .OrderByDescending(x => x.PublishedAt)
            .Take(limit)
            .ToList();

        return Task.FromResult(list);
    }

    public Task<News?> GetBySlugAsync(string slug)
    {
        var found = Items.FirstOrDefault(x => x.Slug == slug);
        return Task.FromResult(found);
    }
}
