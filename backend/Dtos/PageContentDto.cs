namespace Api.Dtos;

public class PageContentDto
{
    public int Id { get; set; }
    public string PageKey { get; set; } = "";
    public string Title { get; set; } = "";
    public string? Excerpt { get; set; }
    public string Content { get; set; } = "";
    public string? ImageUrl { get; set; }
    public DateTimeOffset PublishedAt { get; set; }
}
