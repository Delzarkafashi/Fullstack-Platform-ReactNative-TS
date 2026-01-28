using Api.Dtos;
using Npgsql;

namespace Api.Data;

public sealed class ResidentsRepository
{
    private readonly string _connectionString;

    public ResidentsRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Missing connection string");
    }

    public async Task<List<ResidentListItemDto>> GetAllAsync()
    {
        var list = new List<ResidentListItemDto>();

        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, full_name, personal_number, unit, room, phone, emergency_contact, is_active
            FROM residents
            ORDER BY full_name
            """,
            conn
        );

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new ResidentListItemDto
            {
                Id = reader.GetGuid(0),
                FullName = reader.GetString(1),
                PersonalNumber = reader.IsDBNull(2) ? null : reader.GetString(2),
                Unit = reader.GetString(3),
                Room = reader.IsDBNull(4) ? null : reader.GetString(4),
                Phone = reader.IsDBNull(5) ? null : reader.GetString(5),
                EmergencyContact = reader.IsDBNull(6) ? null : reader.GetString(6),
                IsActive = reader.GetBoolean(7)
            });
        }

        return list;
    }

    public async Task<ResidentDetailsDto?> GetByIdAsync(Guid id)
    {
        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, full_name, personal_number, unit, room, phone, emergency_contact, is_active
            FROM residents
            WHERE id = @id
            """,
            conn
        );

        cmd.Parameters.AddWithValue("id", id);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync()) return null;

        return new ResidentDetailsDto
        {
            Id = reader.GetGuid(0),
            FullName = reader.GetString(1),
            PersonalNumber = reader.IsDBNull(2) ? null : reader.GetString(2),
            Unit = reader.GetString(3),
            Room = reader.IsDBNull(4) ? null : reader.GetString(4),
            Phone = reader.IsDBNull(5) ? null : reader.GetString(5),
            EmergencyContact = reader.IsDBNull(6) ? null : reader.GetString(6),
            IsActive = reader.GetBoolean(7)
        };
    }
}
