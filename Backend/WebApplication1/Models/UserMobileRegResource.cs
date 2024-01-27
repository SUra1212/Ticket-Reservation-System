using MongoDB.Bson.Serialization.Attributes;

namespace WebApplication1.Models
{
    public class UserMobileRegResource
    {
        [BsonElement("email"),BsonRequired]
        public string Email { get; set; }
        [BsonElement("nic"), BsonRequired]
        public string nic { get; set; }
        [BsonElement("password"), BsonRequired]
        public string Password { get; set; }
        [BsonElement("FirstName"), BsonRequired]
        public string FirstName { get; set; }
        [BsonElement("LastName"), BsonRequired]
        public string Lastname { get; set; }
        [BsonElement("Gender"), BsonRequired]
        public string Gender { get; set; }
    }
}
