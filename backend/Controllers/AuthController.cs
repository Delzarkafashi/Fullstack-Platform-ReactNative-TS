using Api.Data;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

namespace Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IUsersRepository _users;

    public AuthController(IUsersRepository users)
    {
        _users = users;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var user = await _users.GetForLoginByEmailAsync(req.Email);
        if (user is null) return Unauthorized("Invalid credentials");
        if (!user.IsActive) return Unauthorized("User inactive");

        var ok = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
        if (!ok) return Unauthorized("Invalid credentials");

        return Ok(new
        {
            id = user.Id,
            name = user.Name,
            email = user.Email,
            role = user.Role,
            dbRole = user.DbRole
        });
    }
}

public sealed class LoginRequest
{
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";
}