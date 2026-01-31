using Microsoft.Extensions.Configuration;
using Npgsql;
using Xunit;

namespace Api.IntegrationTests;

public class DatabaseConnectionTests
{
    [Fact]
    public async Task Can_connect_to_database()
    {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Testing")
            return;

        var config = new ConfigurationBuilder()
            .AddUserSecrets<DatabaseConnectionTests>()
            .Build();

        var connectionString = config.GetConnectionString("DefaultConnection");
        Assert.False(string.IsNullOrEmpty(connectionString));

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("SELECT 1", connection);
        var result = await command.ExecuteScalarAsync();

        Assert.Equal(1, Convert.ToInt32(result));
    }
}
