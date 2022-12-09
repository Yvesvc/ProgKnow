using ProgKnow.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using ProgKnow.Authorization;
using Microsoft.AspNetCore.Authorization;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc().AddJsonOptions(configure => configure.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddScoped<IProgTermContext, ProgTermContext>();
builder.Services.AddScoped<IReportContext, ReportContext>();
builder.Services.AddScoped<IAuthorizationHandler, MustBeAdminHandler>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Auth0Domain"];
    options.Audience = builder.Configuration["Audience"];
});
builder.Services.AddAuthorization(options =>
    options.AddPolicy("MustBeAdmin", policy
    =>
    policy.Requirements.Add(new MustBeAdminRequirement())));

builder.Services.AddCors(options =>
options.AddPolicy("CorsPolicy", options =>
options
.AllowAnyMethod()
.AllowAnyHeader()
.WithOrigins(builder.Configuration["FrontEnd"])));


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapControllers();
app.Run();
