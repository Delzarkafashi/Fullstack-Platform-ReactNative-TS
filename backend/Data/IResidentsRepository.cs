using Api.Dtos;

namespace Api.Data;

public interface IResidentsRepository
{
    Task<List<ResidentListItemDto>> GetAllAsync();
    Task<ResidentDetailsDto?> GetByIdAsync(int id);
    Task<CarePlanDto> GetCarePlanByResidentIdAsync(int residentId);
    Task UpsertCarePlanByResidentIdAsync(int residentId, CarePlanDto dto);
    Task<List<DocumentationEntryDto>> GetDocumentationByResidentIdAsync(int residentId);
    Task<DocumentationEntryDto> CreateDocumentationEntryAsync(int residentId, CreateDocumentationEntryDto dto);
}
