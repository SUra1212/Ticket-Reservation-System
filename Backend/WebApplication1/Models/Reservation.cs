/*
 * Author: Dinul Liyanage
 * File: Reservation.cs
 * Description: This file defines the Reservation class, which represents reservation data in the application.
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    [BsonIgnoreExtraElements]
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        [BsonElement("firstName"),BsonRequired]
        public string firstName { get; set; }
        [BsonElement("lastName"),BsonRequired] public string lastName { get; set; }
        [BsonElement("email"),BsonRequired] public string email { get; set; }
        [BsonElement("nic"),BsonRequired] public string nic { get; set; }
        [BsonElement("mobileNo"),BsonRequired] public int mobileNo { get; set; }
        [BsonElement("noOfPassengers"),BsonRequired] public int noOfPassenger { get; set; }
        [BsonElement("class"),BsonRequired] public int Class { get; set; }
        [BsonElement("total"),BsonRequired] public int total { get; set; }
        [BsonElement("dateRes"),BsonRequired]
        public string DateRes { get; set; } = string.Empty;
        [BsonElement("status"),BsonRequired]
        public string Status { get; set; } = string.Empty;

    }
}
