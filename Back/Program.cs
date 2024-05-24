using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.AspNetCore;
using Back.Controllers;
using System.Threading.Tasks;
using HotChocolate.Execution;


var builder = WebApplication.CreateBuilder(args);

// הוספת שירותים למיכל השירותים
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
}); // הגדרת Swagger לתיעוד ה-API

builder.Services.AddControllersWithViews(); // הוספת תמיכה בקונטרולרים ובתצוגות

// הוספת שירות MongoDB בתור Singleton
builder.Services.AddSingleton<IMongoClient>(new MongoClient("mongodb://localhost:27017"));

// הגדרת מדיניות CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// הוספת שירות MongoDB Database בתור Scoped
builder.Services.AddScoped<IMongoDatabase>(serviceProvider =>
{
    var client = serviceProvider.GetService<IMongoClient>();
    if (client != null)
    {
        return client.GetDatabase("chefs_db");
    }
    else
    {
        throw new Exception("Failed to resolve IMongoClient.");
    }
});

// הוספת GraphQL
builder.Services.AddGraphQLServer()
    .AddQueryType<ChefQueryType>()// הגדרת השאילתה
     .AddType<ChefType>(); // הגדרת סוג ה-GraphQL

//builder.Services.AddSingleton<IRequestExecutorResolver>(
  //  sp => sp.GetRequiredService<IRequestExecutorResolver>());
//builder.Services.AddSingleton<ISchema>(
  //  sp => sp.GetRequiredService<ISchemaBuilder>().Create());

var app = builder.Build();

// הגדרת ה-Middleware של עץ ה-Request Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // שימוש בדף חריגות מפורט למפתחים בסביבת פיתוח
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // כדי שה-UI של Swagger יהיה נגיש מ-root
    });
}

app.UseHttpsRedirection(); // הפנייה ל-HTTPS
app.UseStaticFiles(); // הגשת קבצים סטטיים

app.UseRouting(); // הגדרת ניתוב בקשות

app.UseCors("AllowAllOrigins"); // שימוש במדיניות ה-CORS שהוגדרה

app.UseAuthorization(); // שימוש במנגנון הרשאות

// רישום מסלולים ברמה העליונה
app.MapControllers(); // מיפוי קונטרולרים לנתיבים
app.MapGraphQL(); // הוספת נקודת קצה ל-GraphQL

app.Run(); // הרצת האפליקציה
