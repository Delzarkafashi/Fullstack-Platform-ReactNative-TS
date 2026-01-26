using Npgsql;
using Api.Dtos;

namespace Api.Data;

public class ArticlesRepository
{
    private readonly string _connectionString;

    public ArticlesRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")!;
    }

    public async Task<List<ArticleListItemDto>> GetAllAsync()
    {
        var list = new List<ArticleListItemDto>();

        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var cmd = new NpgsqlCommand("""
            SELECT id, title, excerpt, image_url, category, published_at
            FROM public.articles
        
            ORDER BY published_at DESC
        """, conn);

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
                PublishedAt = reader.GetDateTime(5)
            });
        }

        return list;
    }

    public async Task<ArticleDetailsDto?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var cmd = new NpgsqlCommand("""
            SELECT id, title, excerpt, image_url, category, published_at, content
            FROM public.articles
        
            WHERE id = @id
        """, conn);

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
            Content = reader.GetString(6)
        };
    }
}
