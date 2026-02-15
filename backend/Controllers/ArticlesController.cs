using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Data;

namespace Api.Controllers;

[ApiController]
[Route("api/articles")]
[Authorize(Roles = "admin")]
public class ArticlesController : ControllerBase
{
    private readonly IArticlesRepository _repo;

    public ArticlesController(IArticlesRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var articles = await _repo.GetLatestAsync();
        return Ok(articles);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var article = await _repo.GetByIdAsync(id);
        if (article == null) return NotFound();
        return Ok(article);
    }
}