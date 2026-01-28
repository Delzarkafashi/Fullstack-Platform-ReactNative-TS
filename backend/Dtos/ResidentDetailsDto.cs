namespace Api.Dtos;

public sealed class ResidentDetailsDto : ResidentListItemDto
{
    public HousingInfoDto Housing { get; set; } = new();
    public CarePlanDto CarePlan { get; set; } = new();
    public List<JournalEntryDto> Journal { get; set; } = new();
    public List<ResidentDocumentDto> Documents { get; set; } = new();
}

public sealed class HousingInfoDto
{
    public string Address { get; set; } = "";
    public string Notes { get; set; } = "";
}

public sealed class CarePlanDto
{
    public string Summary { get; set; } = "";
    public List<CarePlanSectionDto> Sections { get; set; } = new();
}

public sealed class CarePlanSectionDto
{
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public int SortOrder { get; set; }
}

public sealed class JournalEntryDto
{
    public Guid Id { get; set; }
    public string CreatedByRole { get; set; } = "";
    public string Title { get; set; } = "";
    public string Body { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
}

public sealed class ResidentDocumentDto
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = "";
    public string? FileUrl { get; set; }
    public DateOnly? DocDate { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
