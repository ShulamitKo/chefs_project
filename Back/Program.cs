using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using Back.Controllers;
using System;



var builder = WebApplication.CreateBuilder(args);

try
{

    // Add services to the container
    builder.Services.AddEndpointsApiExplorer();

    // Add Swagger generation
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    });

    // Add support for controllers and views
    builder.Services.AddControllersWithViews();

    // Add MongoDB services
    var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
    builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoConnectionString));
    builder.Services.AddSingleton<DbService>();


    // Configure CORS policy
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
    });


    // Add GraphQL services
    builder.Services.AddGraphQLServer()
        .AddQueryType<ChefQueryType>()
         .AddType<ChefType>();


    var app = builder.Build();


    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            c.RoutePrefix = string.Empty;
        });
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseCors("AllowAllOrigins");

    app.UseAuthorization();


    app.MapControllers();
    app.MapGraphQL();

    app.Run();


}
catch (Exception ex)
{
    // Log the exception
    Console.WriteLine($"An error occurred during application setup: {ex.Message}");
    throw;
}