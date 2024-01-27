/*
 * Author: Surath Chathuranga
 * File: ITicketResService.cs
 * Description: Interface defining the contract for ticket reservation-related services.
 */
using Microsoft.AspNetCore.JsonPatch;
using WebApplication1.Models;

namespace WebApplication1.Services

// Interface defining the contract for ticket reservation-related services
{
    public interface ITicketResService
    {
        // Retrieves a list of all ticket reservations
        List<TicketRes> Get();
        TicketRes Get(string id); // Retrieves a specific ticket reservation by its unique identifier
        TicketRes Create(TicketRes ticketres); // Creates a new ticket reservation
        void Update(string id, TicketRes ticketres); // Updates an existing ticket reservation by its unique identifier
        void Remove(string id); // Removes a ticket reservation by its unique identifier

    }
}
