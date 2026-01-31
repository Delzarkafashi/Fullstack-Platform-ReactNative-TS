using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Api.IntegrationTests;

public class ResidentsExistsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ResidentsExistsTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    private async Task<JsonElement> GetResidentsArray()
    {
        var res = await _client.GetAsync("/api/residents");
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(json);
        return doc.RootElement;
    }

    [Fact]
    public async Task Residents_endpoint_returns_200()
    {
        var res = await _client.GetAsync("/api/residents");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
    }

    [Fact]
    public async Task Residents_returns_non_empty_list()
    {
        var root = await GetResidentsArray();
        Assert.Equal(JsonValueKind.Array, root.ValueKind);
        Assert.True(root.GetArrayLength() > 0);
    }

    [Fact]
    public async Task Residents_items_have_id()
    {
        var root = await GetResidentsArray();

        foreach (var item in root.EnumerateArray())
        {
            Assert.True(item.TryGetProperty("id", out var idProp));
            Assert.Equal(JsonValueKind.Number, idProp.ValueKind);
            Assert.True(idProp.GetInt32() > 0);
        }
    }

    [Fact]
    public async Task Residents_items_have_name()
    {
        var root = await GetResidentsArray();

        foreach (var item in root.EnumerateArray())
        {
            if (item.TryGetProperty("name", out var nameProp))
            {
                Assert.False(string.IsNullOrWhiteSpace(nameProp.GetString()));
            }
            else if (item.TryGetProperty("fullName", out var fullNameProp))
            {
                Assert.False(string.IsNullOrWhiteSpace(fullNameProp.GetString()));
            }
            else
            {
                Assert.Fail("Expected resident to have name or fullName");
            }
        }
    }
}
