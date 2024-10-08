var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigin",
//        builder =>
//        {
//            builder.WithOrigins("http://localhost:4200");
//        });
//});


var app = builder.Build();

app.UseCors(policy => policy.WithOrigins("https://fu.apinouroai.ir").AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
app.UseCors("AllowSpecificOrigin");



app.UseAuthorization();

app.MapControllers();

app.Run();
