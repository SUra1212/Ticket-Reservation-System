using System;
using MongoDB.Driver;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repository
{
	public class UserRepository: IUserRepository
    {
        private readonly ITicketReservationContext _context;

        public UserRepository(ITicketReservationContext context)
		{
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddAsync(User user)
        {
            try
            {
                await _context.Users.InsertOneAsync(user);
            }
            catch (Exception ex)
            {

                throw;
            }
        }





        public async Task<bool> DeleteAsync(string id)
        {
            FilterDefinition<Models.User> filter = Builders<Models.User>.Filter.Eq(p => p.NIC, id);

            DeleteResult deleteResult = await _context
                                                .Users
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }





        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.Find(t => true).ToListAsync();
        }

        public List<User> GetAllAByRole(string role)
        {
            return _context.Users.Find(User => User.Role == role).ToList();
        }

        public Task<string> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Models.User> GetByNICAsync(string nic)
        {
            FilterDefinition<Models.User> filter = Builders<Models.User>.Filter.Eq(p => p.NIC, nic);

            return await _context.Users.Find(filter).FirstOrDefaultAsync();
        }       


        public async Task<bool> UpdateAsync(User user)
        {
            var updateResult = await _context
                                        .Users
                                        .ReplaceOneAsync(filter: g => g.NIC == user.NIC, replacement: user);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        public Task UpdateAsync(string existingUser)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByNIC(string nic)
        {
            FilterDefinition<Models.User> filter = Builders<Models.User>.Filter.Eq(p => p.NIC, nic);

            return _context.Users.Find(filter).FirstOrDefaultAsync();
        }
    }
}

