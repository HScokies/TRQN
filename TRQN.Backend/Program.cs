using Microsoft.EntityFrameworkCore;
using TRQN.Backend.Data;
using TRQN.Backend.Services;
using TRQN.Backend.Services.Interface;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(configBuilder.GetConnectionString("default"), x => x.UseDateOnlyTimeOnly())
    );
builder.Services.AddScoped<IProductsRepos, ProductsRepos>();
builder.Services.AddScoped<IFilesRepos, FileRepos>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();


app.Run();
