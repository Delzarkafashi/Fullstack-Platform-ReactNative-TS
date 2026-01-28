namespace Api.Dtos;

public sealed class DocumentationEntryDto
{
    public int Id { get; set; }
    public int ResidentId { get; set; }  
    public string Category { get; set; } = "";
    public string Note { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
}
