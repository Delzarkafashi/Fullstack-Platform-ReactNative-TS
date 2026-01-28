namespace Api.Dtos;

public sealed class ResidentDetailsDto : ResidentListItemDto
{
    public CarePlanDto CarePlan { get; set; } = new();
    public List<DocumentationEntryDto> Documentation { get; set; } = new();
}

public sealed class CarePlanDto
{
    public string Content { get; set; } = "";
}


public sealed class CreateDocumentationEntryDto
{
    public string Category { get; set; } = "";
    public string Note { get; set; } = "";
}
