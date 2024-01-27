/*
 * Author: Surath Chathuranga
 * File: TicketResService.cs
 * Description: Service implementation for managing ticket reservation-related operations.
 */
using Microsoft.AspNetCore.JsonPatch;
using MongoDB.Driver;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    // Service implementation for managing ticket reservation-related operations
    public class TicketResService : ITicketResService
    {
        private readonly IMongoCollection<TicketRes> _ticketres;

        public TicketResService(ITicketResStoreDatabaseSetting settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _ticketres = database.GetCollection<TicketRes>(settings.TicketReservationCollectionName);
        }
        // Creates a new ticket reservation
        public TicketRes Create(TicketRes ticketres)
        {
            _ticketres.InsertOne(ticketres);
            return ticketres;
        }

        // Retrieves a list of all ticket reservations
        public List<TicketRes> Get()
        {
            return _ticketres.Find(ticketres => true).ToList();
        }

        // Retrieves a specific ticket reservation by its unique identifier
        public TicketRes Get(string id)
        {
            return _ticketres.Find(ticketres => ticketres.Id == id).FirstOrDefault();
        }

        // Removes a ticket reservation by its unique identifier.
        public void Remove(string id)
        {
            _ticketres.DeleteOne(ticketres => ticketres.Id == id);
        }

        // Updates an existing ticket reservation by its unique identifier
        public void Update(string id, TicketRes ticketres)
        {
            _ticketres.ReplaceOne(ticketres => ticketres.Id == id, ticketres);
        }

      
        

    }
}
