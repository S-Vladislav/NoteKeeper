using Microsoft.EntityFrameworkCore;
using NoteKeeper.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder connection string
builder.Services.AddDbContext<Context>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("NoteKeeperConnectionString")));

// CORS Policy for localhost:4200
builder.Services.AddCors(options => options.AddPolicy(name: "CorsPolicy", policy =>
{
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

