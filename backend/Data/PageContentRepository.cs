using Api.Dtos;
using Npgsql;

namespace Api.Data;

public class PageContentRepository
{
    private readonly IConfiguration _config;

    public PageContentRepository(IConfiguration config)
    {
        _config = config;
    }

    public async Task<List<PageContentDto>> GetByPageKey(string pageKey)
    {
        var connectionString = _config.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Missing ConnectionStrings:DefaultConnection");

        const string sql = @"
SELECT 
  id,
  page_key,
  title,
  excerpt,
  content,
  image_url,
  published_at
FROM public.page_content
WHERE page_key = @pageKey
ORDER BY published_at DESC, id DESC;
";

        var result = new List<PageContentDto>();

        await using var conn = new NpgsqlConnection(connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("pageKey", pageKey);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            result.Add(new PageContentDto
            {
                Id = reader.GetInt32(0),
                PageKey = reader.GetString(1),
                Title = reader.GetString(2),
                Excerpt = reader.IsDBNull(3) ? null : reader.GetString(3),
                Content = reader.GetString(4),
                ImageUrl = reader.IsDBNull(5) ? null : reader.GetString(5),
                PublishedAt = reader.GetFieldValue<DateTimeOffset>(6)
            });
        }

        return result;
    }
}
