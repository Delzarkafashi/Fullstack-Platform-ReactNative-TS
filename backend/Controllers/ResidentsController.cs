using Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/residents")]
public sealed class ResidentsController : ControllerBase
{
    private readonly ResidentsRepository _repo;

    public ResidentsController(ResidentsRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item is null) return NotFound();
        return Ok(item);
    }
}
