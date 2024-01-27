/*
 * Author: Priyankara Athapaththu
 * File: User.cs
 * Description: This file defines the User model for the application.
 */

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApplication1.Models
{
	public class User
	{
        [BsonId]
        
        public string NIC { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    // Enum defining user roles
    public enum Role
    {
        BackOffice,
        TravelAgent
    }
}

