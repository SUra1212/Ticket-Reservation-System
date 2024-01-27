/*
 * Author: Dinul Liyanage
 * File: UserMobile.cs
 * Description: This file defines the UserMobile class, which represents mobile user data in the application.
 */


using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WebApplication1.Models
{
    public class UserMobile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("nic")]
        public string nic { get; set; }
        [BsonElement("FirstName")]
        public string FirstName { get; set; }
        [BsonElement("LastName")]
        public string Lastname { get; set; }
        [BsonElement("Gender")]
        public string Gender { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("status")]
        public string Status { get; set; }

    }
}
