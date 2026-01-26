using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly string _cs;

    public TestController(IConfiguration config)
    {
        _cs = config.GetConnectionString("DefaultConnection") ?? "";
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        if (string.IsNullOrWhiteSpace(_cs)) return Problem("Missing DefaultConnection");

        var items = new List<TestItem>();

        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        const string sql = "SELECT id, name FROM test_table ORDER BY id;";
        await using var cmd = new NpgsqlCommand(sql, conn);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            items.Add(new TestItem(
                reader.GetInt32(0),
                reader.GetString(1)
            ));
        }

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (string.IsNullOrWhiteSpace(_cs)) return Problem("Missing DefaultConnection");

        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        const string sql = "SELECT id, name FROM test_table WHERE id = @id;";
        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return NotFound();

        var item = new TestItem(reader.GetInt32(0), reader.GetString(1));
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTestItemRequest body)
    {
        if (string.IsNullOrWhiteSpace(_cs)) return Problem("Missing DefaultConnection");
        if (body is null || string.IsNullOrWhiteSpace(body.Name)) return BadRequest("Name is required");

        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        const string sql = "INSERT INTO test_table (name) VALUES (@name) RETURNING id;";
        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("name", body.Name.Trim());

        var newIdObj = await cmd.ExecuteScalarAsync();
        var newId = Convert.ToInt32(newIdObj);

        var created = new TestItem(newId, body.Name.Trim());
        return CreatedAtAction(nameof(GetById), new { id = newId }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (string.IsNullOrWhiteSpace(_cs)) return Problem("Missing DefaultConnection");

        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        const string sql = "DELETE FROM test_table WHERE id = @id;";
        await using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("id", id);

        var rows = await cmd.ExecuteNonQueryAsync();
        if (rows == 0) return NotFound();

        return NoContent();
    }

    public record TestItem(int Id, string Name);
    public record CreateTestItemRequest(string Name);
}
