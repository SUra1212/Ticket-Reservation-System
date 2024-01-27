/*
 * Author: Dinul Liyanage
 * File: UserSerice.cs
 * Description: This class implements the IUserService interface and provides CRUD operations for UserMobile objects.
 */

using MongoDB.Driver;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class UserSerice : IUserService
    {
        private readonly IMongoCollection<UserMobile> _client;
        public UserSerice(IUserMobileStoreDatabaseSetting settings,IMongoClient mongoClient)
        {
            var db=mongoClient.GetDatabase(settings.DatabaseName);
            _client = db.GetCollection<UserMobile>(settings.MobileuserCollectionName);
        }

        // Create a new UserMobile object in the database.
        public UserMobile Create(UserMobile user)
        {
            _client.InsertOne(user);
            return user;
        }

        public List<UserMobile> Get()
        {
            return _client.Find(user => true).ToList();
        }

        // Get a UserMobile object by NIC (National Identity Card) number.
        public UserMobile GetOne(string id)
        {
            return _client.Find(res=>res.nic==id).FirstOrDefault();
        }

        // Remove a UserMobile object from the database by NIC.
        public void Remove(string id)
        {
            _client.DeleteOne(res => res.nic == id);
            
        }

        // Update a UserMobile object in the database.
        public void Update(string id, UserMobile user)
        {
            _client.ReplaceOne(res=>res.nic==id,user);
        }
    }
}
