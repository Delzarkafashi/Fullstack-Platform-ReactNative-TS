using Api.Dtos;
using Npgsql;

namespace Api.Data;

public sealed class ResidentsRepository
{
    private readonly string _cs;

    public ResidentsRepository(IConfiguration config)
    {
        _cs = config.GetConnectionString("DefaultConnection")
              ?? throw new InvalidOperationException("Missing connection string");
    }

    public async Task<List<ResidentListItemDto>> GetAllAsync()
    {
        var list = new List<ResidentListItemDto>();

        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, full_name, personal_number, unit, room, phone, emergency_contact, is_active
            FROM public.residents
            ORDER BY id
            """,
            conn
        );

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new ResidentListItemDto
            {
                Id = reader.GetInt32(0),
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

    public async Task<ResidentDetailsDto?> GetByIdAsync(int id)
    {
        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        ResidentDetailsDto? resident = null;

        await using (var cmd = new NpgsqlCommand(
            """
            SELECT id, full_name, personal_number, unit, room, phone, emergency_contact, is_active
            FROM public.residents
            WHERE id = @id
            """,
            conn
        ))
        {
            cmd.Parameters.AddWithValue("id", id);

            await using var reader = await cmd.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;

            resident = new ResidentDetailsDto
            {
                Id = reader.GetInt32(0),
                FullName = reader.GetString(1),
                PersonalNumber = reader.IsDBNull(2) ? null : reader.GetString(2),
                Unit = reader.GetString(3),
                Room = reader.IsDBNull(4) ? null : reader.GetString(4),
                Phone = reader.IsDBNull(5) ? null : reader.GetString(5),
                EmergencyContact = reader.IsDBNull(6) ? null : reader.GetString(6),
                IsActive = reader.GetBoolean(7)
            };
        }

        resident.CarePlan = await GetCarePlanAsync(conn, id);
        resident.Documentation = await GetDocumentationAsync(conn, id);

        return resident;
    }

    public async Task<CarePlanDto> GetCarePlanByResidentIdAsync(int residentId)
    {
        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        return await GetCarePlanAsync(conn, residentId);
    }

    public async Task UpsertCarePlanByResidentIdAsync(int residentId, CarePlanDto dto)
    {
        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        await using (var updateCmd = new NpgsqlCommand(
            """
            UPDATE public.care_plans
            SET content = @content,
                updated_at = now()
            WHERE resident_id = @rid
            """,
            conn
        ))
        {
            updateCmd.Parameters.AddWithValue("rid", residentId);
            updateCmd.Parameters.AddWithValue("content", dto.Content ?? "");

            var rows = await updateCmd.ExecuteNonQueryAsync();

            if (rows == 0)
            {
                await using var insertCmd = new NpgsqlCommand(
                    """
                    INSERT INTO public.care_plans (resident_id, content)
                    VALUES (@rid, @content)
                    """,
                    conn
                );

                insertCmd.Parameters.AddWithValue("rid", residentId);
                insertCmd.Parameters.AddWithValue("content", dto.Content ?? "");

                await insertCmd.ExecuteNonQueryAsync();
            }
        }
    }

    public async Task<List<DocumentationEntryDto>> GetDocumentationByResidentIdAsync(int residentId)
    {
        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        return await GetDocumentationAsync(conn, residentId);
    }

    public async Task<DocumentationEntryDto> CreateDocumentationEntryAsync(int residentId, CreateDocumentationEntryDto dto)
    {
        await using var conn = new NpgsqlConnection(_cs);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            """
        INSERT INTO public.documentation_entries (resident_id, category, note)
        VALUES (@rid, @category, @note)
        RETURNING id, resident_id, category, note, created_at
        """,
            conn
        );

        cmd.Parameters.AddWithValue("rid", residentId);
        cmd.Parameters.AddWithValue("category", dto.Category ?? "");
        cmd.Parameters.AddWithValue("note", dto.Note ?? "");

        await using var reader = await cmd.ExecuteReaderAsync();
        await reader.ReadAsync();

        return new DocumentationEntryDto
        {
            Id = reader.GetInt32(0),
            ResidentId = reader.GetInt32(1),
            Category = reader.GetString(2),
            Note = reader.GetString(3),
            CreatedAt = reader.GetFieldValue<DateTimeOffset>(4)
        };
    }


    private static async Task<CarePlanDto> GetCarePlanAsync(NpgsqlConnection conn, int residentId)
    {
        var plan = new CarePlanDto { Content = "" };

        await using var cmd = new NpgsqlCommand(
            """
            SELECT content
            FROM public.care_plans
            WHERE resident_id = @rid
            LIMIT 1
            """,
            conn
        );

        cmd.Parameters.AddWithValue("rid", residentId);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            plan.Content = reader.IsDBNull(0) ? "" : reader.GetString(0);
        }

        return plan;
    }

    private static async Task<List<DocumentationEntryDto>> GetDocumentationAsync(NpgsqlConnection conn, int residentId)
    {
        var list = new List<DocumentationEntryDto>();

        await using var cmd = new NpgsqlCommand(
            """
            SELECT id, category, note, created_at
            FROM public.documentation_entries
            WHERE resident_id = @rid
            ORDER BY created_at DESC
            """,
            conn
        );

        cmd.Parameters.AddWithValue("rid", residentId);

        await using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new DocumentationEntryDto
            {
                Id = reader.GetInt32(0),
                Category = reader.GetString(1),
                Note = reader.GetString(2),
                CreatedAt = reader.GetFieldValue<DateTimeOffset>(3)
            });
        }

        return list;
    }
}
