using Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/news")]
public sealed class NewsController : ControllerBase
{
    private readonly INewsRepository _repo;

    public NewsController(INewsRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetLatest()
    {
        var items = await _repo.GetLatestAsync(6);

        var result = items.Select(x => new
        {
            id = x.Id,
            title = x.Title,
            slug = x.Slug,
            publishedAt = x.PublishedAt
        });

        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var item = await _repo.GetBySlugAsync(slug);
        if (item is null) return NotFound();

        return Ok(new
        {
            id = item.Id,
            title = item.Title,
            slug = item.Slug,
            category = item.Category,
            publishedAt = item.PublishedAt,
            content = item.Content
        });
    }
}
