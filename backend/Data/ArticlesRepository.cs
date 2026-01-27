using Npgsql;
using Api.Dtos;

namespace Api.Data;

public sealed class ArticlesRepository
{
    private readonly string _connectionString;

    public ArticlesRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");
    }

    public async Task<List<ArticleListItemDto>> GetLatestAsync(int limit = 12)
    {
        var list = new List<ArticleListItemDto>();

        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, title, excerpt, image_url, category, published_at, slug
            FROM public.articles
            ORDER BY published_at DESC
            LIMIT @limit
            """,
            conn
        );

        cmd.Parameters.AddWithValue("limit", limit);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new ArticleListItemDto
            {
                Id = reader.GetInt32(0),
                Title = reader.GetString(1),
                Excerpt = reader.GetString(2),
                ImageUrl = reader.IsDBNull(3) ? null : reader.GetString(3),
                Category = reader.GetString(4),
                PublishedAt = reader.GetDateTime(5),
                Slug = reader.GetString(6)
            });
        }

        return list;
    }

    public async Task<ArticleDetailsDto?> GetBySlugAsync(string slug)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, title, excerpt, image_url, category, published_at, content, slug
            FROM public.articles
            WHERE slug = @slug
            LIMIT 1
            """,
            conn
        );

        cmd.Parameters.AddWithValue("slug", slug);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new ArticleDetailsDto
        {
            Id = reader.GetInt32(0),
            Title = reader.GetString(1),
            Excerpt = reader.GetString(2),
            ImageUrl = reader.IsDBNull(3) ? null : reader.GetString(3),
            Category = reader.GetString(4),
            PublishedAt = reader.GetDateTime(5),
            Content = reader.GetString(6),
            Slug = reader.GetString(7)
        };
    }

    public async Task<ArticleDetailsDto?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, title, excerpt, image_url, category, published_at, content, slug
            FROM public.articles
            WHERE id = @id
            """,
            conn
        );

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new ArticleDetailsDto
        {
            Id = reader.GetInt32(0),
            Title = reader.GetString(1),
            Excerpt = reader.GetString(2),
            ImageUrl = reader.IsDBNull(3) ? null : reader.GetString(3),
            Category = reader.GetString(4),
            PublishedAt = reader.GetDateTime(5),
            Content = reader.GetString(6),
            Slug = reader.GetString(7)
        };
    }
}
