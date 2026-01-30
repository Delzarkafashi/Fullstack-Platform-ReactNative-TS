using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Api.IntegrationTests;

public class PageContentTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public PageContentTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PageContent_endpoint_returns_200_or_404()
    {
        var res = await _client.GetAsync("/api/pagecontent");

        Assert.True(
            res.StatusCode == HttpStatusCode.OK || res.StatusCode == HttpStatusCode.NotFound,
            $"Expected 200 or 404, got {(int)res.StatusCode}"
        );
    }
}
