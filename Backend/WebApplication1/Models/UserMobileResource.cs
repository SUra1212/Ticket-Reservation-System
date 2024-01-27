/*
 * Author: Dinul Liyanage
 * File: UserMobileResource.cs
 * Description: This file defines the UserMobileResource class, which represents the resource for mobile user data in the application.
 */

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserMobileResource
    {
        [BsonElement("email"),BsonRequired]
        public string Email { get; set; }
        [BsonElement("nic"),BsonRequired]
        public string nic { get; set; }
        [BsonElement("password"),BsonRequired]
        public string Password { get; set; }


    }
}
