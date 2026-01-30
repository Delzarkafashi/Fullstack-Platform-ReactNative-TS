using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Api.IntegrationTests;

public class NewsExistsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public NewsExistsTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    private async Task<JsonElement> GetNewsArray()
    {
        var res = await _client.GetAsync("/api/news");
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(json);
        return doc.RootElement;
    }

    [Fact]
    public async Task News_endpoint_returns_200()
    {
        var res = await _client.GetAsync("/api/news");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
    }

    [Fact]
    public async Task News_returns_non_empty_list()
    {
        var root = await GetNewsArray();
        Assert.Equal(JsonValueKind.Array, root.ValueKind);
        Assert.True(root.GetArrayLength() > 0);
    }

    [Fact]
    public async Task News_items_have_id()
    {
        var root = await GetNewsArray();

        foreach (var item in root.EnumerateArray())
        {
            Assert.True(item.TryGetProperty("id", out var idProp));
            Assert.Equal(JsonValueKind.Number, idProp.ValueKind);
            Assert.True(idProp.GetInt32() > 0);
        }
    }

    [Fact]
    public async Task News_items_have_title_and_slug()
    {
        var root = await GetNewsArray();

        foreach (var item in root.EnumerateArray())
        {
            Assert.True(item.TryGetProperty("title", out var titleProp));
            Assert.False(string.IsNullOrWhiteSpace(titleProp.GetString()));

            Assert.True(item.TryGetProperty("slug", out var slugProp));
            Assert.False(string.IsNullOrWhiteSpace(slugProp.GetString()));
        }
    }

    [Fact]
    public async Task News_items_have_publishedAt()
    {
        var root = await GetNewsArray();

        foreach (var item in root.EnumerateArray())
        {
            Assert.True(item.TryGetProperty("publishedAt", out var pubProp));
            Assert.True(pubProp.ValueKind == JsonValueKind.String || pubProp.ValueKind == JsonValueKind.Number);
        }
    }
}
