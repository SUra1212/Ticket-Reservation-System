/*
 * Author: Priyankara Athapaththu
 * File: AuthController.cs
 * Description: This file contains the UserController class responsible for handling user-related API requests.
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Repository;
using WebApplication1.ViewModel.Response;
using WebApplication1.ViewModel.User;

namespace TicketReservation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserRepository repository, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _userRepository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _configuration = configuration;
        }


        // Login as user NIC and password
        // JWT token and user information
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            var response = new UserAuthenticationMetaDataViewModel();
            try
            {
                // Retrieve user by NIC
                var user = await _userRepository.GetUserByNIC(model.NIC);

                if(user is null)
                {
                    response.IsSuccess = false;
                    response.Message = "User not found please try again";      
                    return Unauthorized("Invalid credentials");

                }

                // Verify the user's password using BCrypt
                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {
                    response.IsSuccess = false;
                    response.Message = "Password incorrect please try again";
                    return Unauthorized("Invalid credentials");
                }

                var key = _configuration["Tokens:Key"];
                var issuer = _configuration["Tokens:Issuer"];

                var now = DateTime.UtcNow;
                DateTime nowDate = DateTime.UtcNow;
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, user.NIC.ToString()),
                        new Claim("firstName",string.IsNullOrEmpty(user.FirstName)? "": user.FirstName),
                        new Claim("lastName", string.IsNullOrEmpty(user.LastName) ? "" : user.LastName),
                        new Claim("role",user.Role),
                        new Claim(JwtRegisteredClaimNames.Aud,"webapp"),
                        new Claim(JwtRegisteredClaimNames.Aud,"mobileapp"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var token = new JwtSecurityToken
                (
                    issuer: issuer,
                    claims: claims,
                    expires: nowDate.AddHours(3),
                    signingCredentials: credentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                response.IsSuccess = true;
                response.Token = tokenString;
                response.FullName = $"{user.FirstName} {user.LastName}";
                response.Role = user.Role;
                response.NIC = user.NIC;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "server Error");
            }

            return Ok(new { User = response });
        }

    }
}

