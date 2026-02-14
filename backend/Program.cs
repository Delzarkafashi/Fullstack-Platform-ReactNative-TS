using Api.Controllers;
using Api.Data;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:8081",
                "http://localhost:8001",
                "http://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

if (!builder.Environment.IsEnvironment("Testing"))
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

    if (string.IsNullOrWhiteSpace(connectionString))
        throw new InvalidOperationException("Missing DefaultConnection connection string.");

    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();
    Console.WriteLine("Database connection successful");

    builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;
}

builder.Services.AddControllers()
    .AddApplicationPart(typeof(NewsController).Assembly);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddScoped<IArticlesRepository, FakeArticlesRepository>();
}
else
{
    builder.Services.AddScoped<IArticlesRepository, DbArticlesRepository>();
}

if (builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddScoped<INewsRepository, FakeNewsRepository>();
}
else
{
    builder.Services.AddScoped<INewsRepository, DbNewsRepository>();
}

if (builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddScoped<IResidentsRepository, FakeResidentsRepository>();
}
else
{
    builder.Services.AddScoped<IResidentsRepository, DbResidentsRepository>();
}
builder.Services.AddScoped<IUsersRepository, DbUsersRepository>();
builder.Services.AddScoped<PageContentRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program { }
