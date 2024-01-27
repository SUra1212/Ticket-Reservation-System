/*
 * Author: Priyankara Athapaththu
 * File: ITicketReservationContext.cs
 * Description: This interface defines the contract for the TicketReservationContext, which provides access to MongoDB collections.
 */

using System;
using MongoDB.Driver;

namespace WebApplication1.Data
{
	public interface ITicketReservationContext
	{
        // Provides access to the Users collection in the MongoDB database.
        IMongoCollection<WebApplication1.Models.User> Users { get; }
    }
}
