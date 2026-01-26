namespace Api.Dtos;

public class ArticleListItemDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Excerpt { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public string Category { get; set; } = null!;
    public DateTime PublishedAt { get; set; }
}
