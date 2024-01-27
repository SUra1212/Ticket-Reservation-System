/*
 * Author: Surath Chahturanga
 * File: TicketRes.cs
 * Description: Represents a ticket reservation entity for the application.
 */
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WebApplication1.Models

// Represents a ticket reservation entity for the application
{
    [BsonIgnoreExtraElements]
    public class TicketRes {
        // Gets or sets the unique identifier for the ticket reservation

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        // Gets or sets the first name of the person making the reservation
        [BsonElement("firstName")]

        public string FirstName { get; set; } = string.Empty;

        // Gets or sets the last name of the person making the reservation
        [BsonElement("LastName")]

        public string LastName { get; set; } = string.Empty;

        // Gets or sets the email address of the person making the reservation
        [BsonElement("email")]

        public string Email { get; set; } = string.Empty;

        // Gets or sets the NIC of the person making the reservation
        [BsonElement("nic")]

        public string NIC { get; set; } = string.Empty;

        // Gets or sets the mobile number of the person making the reservation
        [BsonElement("mobileno")]

        public int MobileNo { get; set; }

        // Gets or sets the train name of the person making the reservation
        [BsonElement("trainName")]

        public string TrainName { get; set; } = string.Empty;

        // Gets or sets the train number of the person making the reservation
        [BsonElement("trainNo")]

        public string TrainNo { get; set; } = string.Empty;

        // Gets or sets the date of the reservation.
        [BsonElement("dateRes")]

        public string DateRes { get; set; } = string.Empty;

        // Gets or sets the number of passengers for the reservation.
        [BsonElement("noofpassengers")]

        public int NoOfPassengers { get; set; }

        // Gets or sets the class of the reservation 
        [BsonElement("class")]

        public string Class { get; set; } = string.Empty;

        // Gets or sets the status of the reservation
        [BsonElement("status")]

        public string Status { get; set; } = string.Empty;

        // Gets or sets the total cost of the reservation
        [BsonElement("total")]

        public float Total { get; set; }
    }
}

