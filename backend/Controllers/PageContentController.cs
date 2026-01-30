using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/pages")]
public class PageContentController : ControllerBase
{
    private readonly PageContentRepository _repo;

    public PageContentController(PageContentRepository repo)
    {
        _repo = repo;
    }

    [HttpGet("{pageKey}")]
    public async Task<ActionResult<List<PageContentDto>>> Get(string pageKey)
    {
        if (string.IsNullOrWhiteSpace(pageKey))
            return BadRequest("pageKey is required");

        var items = await _repo.GetByPageKey(pageKey.Trim().ToLower());
        return Ok(items);
    }
}
