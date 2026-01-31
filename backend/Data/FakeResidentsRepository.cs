using Api.Dtos;

namespace Api.Data;

public sealed class FakeResidentsRepository : IResidentsRepository
{
    private static readonly List<ResidentListItemDto> Residents =
    [
        new ResidentListItemDto
        {
            Id = 1,
            FullName = "Mock Resident 1",
            PersonalNumber = null,
            Unit = "A",
            Room = "101",
            Phone = null,
            EmergencyContact = null,
            IsActive = true
        }
    ];

    public Task<List<ResidentListItemDto>> GetAllAsync()
        => Task.FromResult(Residents);

    public Task<ResidentDetailsDto?> GetByIdAsync(int id)
    {
        var baseItem = Residents.FirstOrDefault(x => x.Id == id);
        if (baseItem is null) return Task.FromResult<ResidentDetailsDto?>(null);

        var details = new ResidentDetailsDto
        {
            Id = baseItem.Id,
            FullName = baseItem.FullName,
            PersonalNumber = baseItem.PersonalNumber,
            Unit = baseItem.Unit,
            Room = baseItem.Room,
            Phone = baseItem.Phone,
            EmergencyContact = baseItem.EmergencyContact,
            IsActive = baseItem.IsActive,
            CarePlan = new CarePlanDto { Content = "Mock care plan" },
            Documentation =
            [
                new DocumentationEntryDto
                {
                    Id = 1,
                    ResidentId = baseItem.Id,
                    Category = "hem",
                    Note = "Mock note",
                    CreatedAt = DateTimeOffset.UtcNow
                }
            ]
        };

        return Task.FromResult<ResidentDetailsDto?>(details);
    }

    public Task<CarePlanDto> GetCarePlanByResidentIdAsync(int residentId)
        => Task.FromResult(new CarePlanDto { Content = "Mock care plan" });

    public Task UpsertCarePlanByResidentIdAsync(int residentId, CarePlanDto dto)
        => Task.CompletedTask;

    public Task<List<DocumentationEntryDto>> GetDocumentationByResidentIdAsync(int residentId)
    {
        var list = new List<DocumentationEntryDto>
        {
            new DocumentationEntryDto
            {
                Id = 1,
                ResidentId = residentId,
                Category = "hem",
                Note = "Mock note",
                CreatedAt = DateTimeOffset.UtcNow
            }
        };

        return Task.FromResult(list);
    }

    public Task<DocumentationEntryDto> CreateDocumentationEntryAsync(int residentId, CreateDocumentationEntryDto dto)
    {
        var entry = new DocumentationEntryDto
        {
            Id = 99,
            ResidentId = residentId,
            Category = dto.Category ?? "",
            Note = dto.Note ?? "",
            CreatedAt = DateTimeOffset.UtcNow
        };

        return Task.FromResult(entry);
    }
}
