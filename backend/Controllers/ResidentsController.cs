using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/residents")]
public sealed class ResidentsController : ControllerBase
{
    private readonly IResidentsRepository _repo;

    public ResidentsController(IResidentsRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item is null) return NotFound();
        return Ok(item);
    }

    [HttpGet("{id:int}/care-plan")]
    public async Task<IActionResult> GetCarePlan(int id)
    {
        var plan = await _repo.GetCarePlanByResidentIdAsync(id);
        return Ok(plan);
    }

    [HttpPut("{id:int}/care-plan")]
    public async Task<IActionResult> SaveCarePlan(int id, [FromBody] CarePlanDto dto)
    {
        await _repo.UpsertCarePlanByResidentIdAsync(id, dto);
        return NoContent();
    }

    [HttpGet("{id:int}/documentation")]
    public async Task<IActionResult> GetDocumentation(int id)
    {
        var items = await _repo.GetDocumentationByResidentIdAsync(id);
        return Ok(items);
    }

    [HttpPost("{id:int}/documentation")]
    public async Task<IActionResult> CreateDocumentation(int id, [FromBody] CreateDocumentationEntryDto dto)
    {
        var entry = await _repo.CreateDocumentationEntryAsync(id, dto);
        return Ok(entry);
    }
}
