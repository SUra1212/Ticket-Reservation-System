/*
 * Author: Dinul Liyanage
 * File: MobileUserController.cs
 * Description: This file contains the controller for managing mobile users in the API.
 */

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;
using System.Net;
using System.Reflection;

namespace WebApplication1.Controllers
{
    [Route("api/userMobile")]
    [ApiController]
    public class MobileUserController : ControllerBase
    {
        private readonly IUserService _userService;

        public MobileUserController(IUserService userService)
        {
            this._userService = userService;
        }


        // Registers a new mobile user.
        [HttpPost("register")]
        public ActionResult<UserMobile> Register([FromBody] UserMobileRegResource mobile)
        {
            try
            {
                if (mobile == null)
                {
                    return BadRequest("User body empty null");
                }

                var user = new UserMobile();
                user.nic = mobile.nic;
                user.Email = mobile.Email;
                user.FirstName = mobile.FirstName;
                user.Lastname = mobile.Lastname;
                user.Gender = mobile.Gender;
                user.Password = BCrypt.Net.BCrypt.HashPassword(mobile.Password);
                user.Status = "Active";

                _userService.Create(user);
                return Ok(user);



            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("/userMobile")]
        public ActionResult<List<UserMobile>> Get()
        {
            return _userService.Get();
        }

        [HttpGet("/userMobile/{id}")]
        public ActionResult<UserMobile> GetOne(string id)
        {
            var user = _userService.GetOne(id);

            if (user == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            return user;
        }

        // Logs in a mobile user.
        [HttpPost("login")]
        public ActionResult<UserMobile> LoginUser([FromBody] UserMobileResource model)
        {
            try
            {
                var user = _userService.GetOne(model.nic);
                if (user == null)
                {
                    return BadRequest("user body emtpy");
                }
                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {
                    return BadRequest("Invalid password");
                }
                else
                {
                    return Ok(user);
                }

            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // Updates a mobile user's information.
        [HttpPut("update/{id}")]
        public ActionResult UpdateUser(string id, [FromBody] UserMobileRegResource model)
        {
            try
            {
                var userCheck = _userService.GetOne(id);
                if (userCheck == null)
                {
                    return NotFound("User not found");
                }
                var user = new UserMobile();
                user.Id = userCheck.Id;
                user.nic = model.nic;
                user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                user.Email = model.Email;
                user.Status = userCheck.Status;
                user.FirstName = model.FirstName;
                user.Lastname = model.Lastname;
                user.Gender = model.Gender;
                _userService.Update(id, user);
                return NoContent();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        // Deletes a mobile user.
        [HttpDelete("delete/{id}")]
        public ActionResult DeleteUser(string id)
        {
            try
            {
                var userCheck = _userService.GetOne(id);
                var user = new UserMobile
                {
                    Id = userCheck.Id,
                    nic = userCheck.nic,
                    Email = userCheck.Email,
                    Password = userCheck.Password,
                    FirstName = userCheck.FirstName,
                    Lastname = userCheck.Lastname,
                    Gender = userCheck.Gender,
                    Status = "Inactive"
                };
                if (userCheck == null)
                {
                    return NotFound("User not found");
                }

                _userService.Update(id, user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        [HttpDelete("activateUser/{id}")]
        public ActionResult ReinstigateUser(string id)
        {
            try
            {
                var userCheck = _userService.GetOne(id);
                var user = new UserMobile
                {
                    Id = userCheck.Id,
                    nic = userCheck.nic,
                    Email = userCheck.Email,
                    Password = userCheck.Password,
                    FirstName = userCheck.FirstName,
                    Lastname = userCheck.Lastname,
                    Gender = userCheck.Gender,
                    Status = "Active"
                };
                if (userCheck == null)
                {
                    return NotFound("User not found");
                }

                _userService.Update(id, user);
                return Ok(user.Status);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


        [HttpDelete("removeUser/{id}")]
        public ActionResult RemoveUser(String id)
        {
            try
            {
                var userCheck = _userService.GetOne(id);
                if (userCheck == null)
                {
                    return NotFound("User not found");
                }
                _userService.Remove(id);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
