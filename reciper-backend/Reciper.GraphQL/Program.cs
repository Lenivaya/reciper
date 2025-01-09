using Microsoft.EntityFrameworkCore;
using Reciper.DAL.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPooledDbContextFactory<ReciperContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) { }

app.UseHttpsRedirection();

app.Run();
