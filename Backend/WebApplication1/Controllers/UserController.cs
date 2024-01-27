/*
 * Author: Priyankara Athapaththu
 * File: UserController.cs
 * Description: This file contains the controller for managing user-related actions in the application.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repository;
using WebApplication1.ViewModel;
using WebApplication1.ViewModel.Response;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository repository, ILogger<UserController> logger)
        {
            _userRepository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // POST: api/User
        // Save a new user.
        [HttpPost]
        [ProducesResponseType(typeof(ResponseViewModel), (int)HttpStatusCode.OK)]
        public async Task<ResponseViewModel> SaveUser([FromBody] UserViewModel uservm)
        {
            var response = new ResponseViewModel();

            try
            {
                var user = new Models.User();

                // Map UserViewModel to User model
                user.NIC = uservm.NIC;
                user.FirstName = uservm.FirstName;
                user.LastName = uservm.LastName;
                user.Email = uservm.Email;
                user.Gender = uservm.Gender;
                user.Password = BCrypt.Net.BCrypt.HashPassword(uservm.Password);
                user.Role = uservm.Role;

                await _userRepository.AddAsync(user);

                response.IsSuccess = true;
                response.Message = "User save has been successfully.";


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                response.IsSuccess = false;
                response.Message = "Error has been occured please try again";

            }

            return response;


        }

        // GET: api/User
        // Get all users.
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();

            return Ok(users);
        }

        // GET: api/User/{role}
        // Get all users by role.
        [HttpGet("{role}")]
        public ActionResult<List<User>> GetAllUsersByRole(string role)
        {
            List<User> users = _userRepository.GetAllAByRole(role);

            return Ok(users);
        }

        // PUT: api/User/updateUser
        // Update user information.
        [HttpPut("updateUser")]
        public async Task<ResponseViewModel> UpdateUser([FromBody] UpdateUser uservm)
        {
            var response = new ResponseViewModel();

            try
            {
                var user = await _userRepository.GetByNICAsync(uservm.NIC);

                // Update user properties
                user.NIC = uservm.NIC;
                user.FirstName = uservm.FirstName;
                user.LastName = uservm.LastName;
                user.Email = uservm.Email;
                user.Gender = uservm.Gender;
                user.Role = uservm.Role;

                await _userRepository.UpdateAsync(user);

                response.IsSuccess = true;
                response.Message = "User update has been successfully.";


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                response.IsSuccess = false;
                response.Message = "Error has been occured please try again";

            }

            return response;


        }

        // DELETE: api/User/userDelete/{nic}
        // Delete a user by NIC.
        [HttpDelete("userDelete/{nic}")]
        [ProducesResponseType(typeof(ResponseViewModel), (int)HttpStatusCode.OK)]
        public async Task<ResponseViewModel> deleteUser(string nic)
        {
            var response = new ResponseViewModel();

            try
            {
                

                await _userRepository.DeleteAsync(nic);

                response.IsSuccess = true;
                response.Message = "User delete has been successfully.";


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                response.IsSuccess = false;
                response.Message = "Error has been occured please try again";

            }

            return response;


        }


        // GET: api/User/getUserByNic/{nic}
        // Get user information by NIC.
        [HttpGet("getUserByNic/{nic}")]
        [ProducesResponseType(typeof(UserViewModel), (int)HttpStatusCode.OK)]
        public async Task<UserViewModel> GetUserByNic(string nic)
        {
            var user = await _userRepository.GetByNICAsync(nic);

            var response = new UserViewModel()
            {
                NIC = user.NIC,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                Gender =user.Gender,
            };

            return response;
        }

    }
}

