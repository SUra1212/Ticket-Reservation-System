using System;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
	public interface IUserRepository
	{
        Task AddAsync(Models.User user);

        Task<IEnumerable<Models.User>> GetAllAsync();
        List<User> GetAllAByRole(string role); 

        Task<bool> DeleteAsync(string id);

        Task<bool> UpdateAsync(Models.User user);

        Task<Models.User> GetUserByNIC(string nic);
        Task<string> GetByIdAsync(int id);
        Task UpdateAsync(string existingUser);
        Task<Models.User> GetByNICAsync(string nic);
    }
}

