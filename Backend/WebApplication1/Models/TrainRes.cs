/*
 * Author: Umayangi Ekanayake
 * File: TrainRes.cs
 * Description: Model representing train reservation data.
 */
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WebApplication1.Models
{
    // Model representing train reservation data
    [BsonIgnoreExtraElements]
    public class TrainRes
    {
        // Gets or sets the unique identifier of the train reservation
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        // Gets or sets the name of the train
        [BsonElement("trainName")]

        public string TrainName { get; set; } = string.Empty;

        // Gets or sets the train number
        [BsonElement("trainno")]

        public string TrainNo { get; set; } = string.Empty;

        // Gets or sets the first class details
        [BsonElement("firstclass")]

        public string FirstClass { get; set; } = string.Empty;

        // Gets or sets the second class details
        [BsonElement("secondclass")]

        public string SecondClass { get; set; } = string.Empty;

        // Gets or sets the third class details
        [BsonElement("thirdclass")]

        public string ThirdClass { get; set; } = string.Empty;

        // Gets or sets the departure location
        [BsonElement("fromlocation")]

        public string FromLocation { get; set; } = string.Empty;

        // Gets or sets the departure time
        [BsonElement("departureTime")]

        public string DepartureTime { get; set; } = string.Empty;

        // Gets or sets the destination location
        [BsonElement("tolocation")]

        public string ToLocation { get; set; } = string.Empty;

        // Gets or sets the arrival time
        [BsonElement("arrivalTime")]

        public string ArrivalTime { get; set; } = string.Empty;

        // Gets or sets the date of the train reservation
        [BsonElement("date")]

        public string Date { get; set; } = string.Empty;
    }
}