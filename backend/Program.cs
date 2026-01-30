using Api.Data;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:8081",
                         "http://localhost:8001",
                         "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
Console.WriteLine("Database connection successful");

builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ArticlesRepository>();
builder.Services.AddScoped<NewsRepository>();

builder.Services.AddScoped<ResidentsRepository>();

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
