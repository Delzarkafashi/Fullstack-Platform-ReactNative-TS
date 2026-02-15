using Api.Data;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IUsersRepository _users;
    private readonly IConfiguration _config;

    public AuthController(IUsersRepository users, IConfiguration config)
    {
        _users = users;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        var user = await _users.GetForLoginByEmailAsync(req.Email);
        if (user is null) return Unauthorized("Invalid credentials");
        if (!user.IsActive) return Unauthorized("User inactive");

        var ok = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
        if (!ok) return Unauthorized("Invalid credentials");

        var keyString = _config["Jwt:Key"];
        if (string.IsNullOrWhiteSpace(keyString))
            return StatusCode(500, "Missing Jwt:Key");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new
        {
            token = jwt,
            role = user.Role
        });
    }
}

public sealed class LoginRequest
{
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";
}