using System;
using System.Threading.Tasks;
using Npgsql;

namespace Api.Data;

public sealed class DbUsersRepository : IUsersRepository
{
    private readonly string _connectionString;

    public DbUsersRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Missing connection string: DefaultConnection");
    }

    public async Task<UserAuthRecord?> GetForLoginByEmailAsync(string email)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, name, email, password_hash, role, db_role, is_active
            FROM public.users
            WHERE lower(email) = lower(@email)
            LIMIT 1
            """,
            conn
        );

        cmd.Parameters.AddWithValue("email", email);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new UserAuthRecord
        {
            Id = reader.GetGuid(0),
            Name = reader.GetString(1),
            Email = reader.GetString(2),
            PasswordHash = reader.GetString(3),
            Role = reader.GetString(4),
            DbRole = reader.GetString(5),
            IsActive = reader.GetBoolean(6)
        };
    }
}