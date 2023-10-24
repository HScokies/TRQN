using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TRQN.Backend.Data;
using TRQN.Backend.Services;
using TRQN.Backend.Services.Encryption;
using TRQN.Backend.Services.Interface;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(configBuilder.GetConnectionString("default"), x => x.UseDateOnlyTimeOnly())
    );

builder.Services.AddSingleton<IBlowfishEncryption, BlowfishEncryption>(options => new BlowfishEncryption(configBuilder.GetSection("EncryptionKey").Value!));
builder.Services.AddScoped<IUserRepos, UserRepos>();
builder.Services.AddScoped<IProductsRepos, ProductsRepos>();
builder.Services.AddScoped<IFilesRepos, FileRepos>();
builder.Services.AddScoped<ICountriesRepos, CountriesRepos>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();


app.Run();
