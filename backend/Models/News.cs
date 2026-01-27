namespace Api.Models;

public sealed class News
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Category { get; set; } = "";
    public DateTimeOffset PublishedAt { get; set; }
    public string Content { get; set; } = "";
}
