using Microsoft.Extensions.Configuration;
using Npgsql;
using Xunit;

namespace Api.IntegrationTests;

public class DatabaseConnectionTests
{
    [Fact]
    public async Task Can_connect_to_database()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString = config.GetConnectionString("DefaultConnection");

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("SELECT 1", connection);
        var result = await command.ExecuteScalarAsync();

        Assert.Equal(1, (int)result);
    }
}
