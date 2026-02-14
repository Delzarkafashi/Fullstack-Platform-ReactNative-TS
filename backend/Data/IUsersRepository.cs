using System;
using System.Threading.Tasks;

namespace Api.Data;

public interface IUsersRepository
{
    Task<UserAuthRecord?> GetForLoginByEmailAsync(string email);
}

public sealed class UserAuthRecord
{
    public Guid Id { get; init; }
    public string Name { get; init; } = "";
    public string Email { get; init; } = "";
    public string PasswordHash { get; init; } = "";
    public string Role { get; init; } = "";
    public string DbRole { get; init; } = "";
    public bool IsActive { get; init; }
}