using Api.Models;
using Npgsql;

namespace Api.Data;

public sealed class DbNewsRepository : INewsRepository
{
    private readonly string _connectionString;

    public DbNewsRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");
    }

    public async Task<List<News>> GetLatestAsync(int limit = 6)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, title, slug, category, published_at, content
            FROM public.news
            ORDER BY published_at DESC
            LIMIT @limit
            """,
            conn
        );

        cmd.Parameters.AddWithValue("limit", limit);

        var list = new List<News>();

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new News
            {
                Id = reader.GetInt32(0),
                Title = reader.GetString(1),
                Slug = reader.GetString(2),
                Category = reader.GetString(3),
                PublishedAt = reader.GetFieldValue<DateTimeOffset>(4),
                Content = reader.GetString(5),
            });
        }

        return list;
    }

    public async Task<News?> GetBySlugAsync(string slug)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, title, slug, category, published_at, content
            FROM public.news
            WHERE slug = @slug
            LIMIT 1
            """,
            conn
        );

        cmd.Parameters.AddWithValue("slug", slug);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new News
        {
            Id = reader.GetInt32(0),
            Title = reader.GetString(1),
            Slug = reader.GetString(2),
            Category = reader.GetString(3),
            PublishedAt = reader.GetFieldValue<DateTimeOffset>(4),
            Content = reader.GetString(5),
        };
    }
}
