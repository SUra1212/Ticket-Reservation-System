using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Repository;
using WebApplication1.Models;
using WebApplication1.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;



var builder = WebApplication.CreateBuilder(args);


//-----------------------------------------------------------------------
builder.Services.Configure<TicketResStoreDatabaseSetting>(
    builder.Configuration.GetSection(nameof(TicketResStoreDatabaseSetting)));

builder.Services.AddSingleton<ITicketResStoreDatabaseSetting>(sp =>
sp.GetRequiredService<IOptions<TicketResStoreDatabaseSetting>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("TicketResStoreDatabaseSetting:ConnectionString")));

builder.Services.AddScoped<ITicketResService, TicketResService>();

//---------------------------------------------------------------------------

//------------------------------------------Train Management -------------------------------------------------------------------
builder.Services.Configure<TrainResStoreDatabaseSetting>(
    builder.Configuration.GetSection(nameof(TrainResStoreDatabaseSetting)));

builder.Services.AddSingleton<ITrainResStoreDatabaseSetting>(sp =>
sp.GetRequiredService<IOptions<TrainResStoreDatabaseSetting>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("TrainResStoreDatabaseSetting:ConnectionString")));

builder.Services.AddScoped<ITrainResService, TrainResService>();

//-------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------
builder.Services.Configure<ReservationStoreDatabaseSetting>(
    builder.Configuration.GetSection(nameof(ReservationStoreDatabaseSetting)));

builder.Services.AddSingleton<IReservationStoreDatabaseSetting>(sp =>
sp.GetRequiredService<IOptions<ReservationStoreDatabaseSetting>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("ReservationStoreDatabaseSetting:ConnectionString")));

builder.Services.AddScoped<IReservationService, ReservationService>();

//---------------------------------------------------------------------------


//-----------------------------------------------------------------------
builder.Services.Configure<UserMobileStoreDatabaseSetting>(
    builder.Configuration.GetSection(nameof(UserMobileStoreDatabaseSetting)));

builder.Services.AddSingleton<IUserMobileStoreDatabaseSetting>(sp =>
sp.GetRequiredService<IOptions<UserMobileStoreDatabaseSetting>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
new MongoClient(builder.Configuration.GetValue<string>("UserMobileStoreDatabaseSetting:ConnectionString")));

builder.Services.AddScoped<IUserService, UserSerice>();

//---------------------------------------------------------------------------
// Add services to the container.
builder.Services.AddSwaggerGen(options =>
{

    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "EAD - Web API",
        Version = "v1",
        Description = "EAD",
        TermsOfService = new Uri("http://localhost:3000")
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                    }
                });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Tokens:Issuer"],
            ValidAudiences = new List<string>
            {
                          "webapp","mobileapp"
            },

            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Tokens:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });


builder.Services.AddScoped<ITicketReservationContext, TicketReservationContext>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigin = "_myAllowsSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigin,
    policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigin);
app.Run();
