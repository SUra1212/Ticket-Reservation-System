/*
 * Author: Dinul Liyanage
 * File: IUserService.cs
 * Description: This file defines the IUserService interface, which specifies the methods for user-related operations in the application.
 */

using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IUserService
    {
        UserMobile GetOne(string id);
        List<UserMobile> Get();
        //UserMobile Get(string id);
        UserMobile Create(UserMobile user);
        void Update(string id, UserMobile user);
        void Remove(string id);

    }
}
