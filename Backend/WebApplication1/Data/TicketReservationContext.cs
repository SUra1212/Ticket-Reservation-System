/*
 * Author: Priyankara Athapaththu
 * File: TicketReservationContext.cs
 * Description: This class represents the implementation of the ITicketReservationContext interface and provides access to MongoDB collections.
 */

using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace WebApplication1.Data
{
    public class TicketReservationContext : ITicketReservationContext
    {
        private readonly IMongoDatabase db;
        public TicketReservationContext(IConfiguration configuration)
		{
            // Initialize the MongoDB client and database based on configuration settings.
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            db = client.GetDatabase(configuration.GetValue<string>("DatabaseSettings:DatabaseName"));
        }

        // Provides access to the Users collection in the MongoDB database.
        public IMongoCollection<Models.User> Users => db.GetCollection<Models.User>("Users");
    }
}

