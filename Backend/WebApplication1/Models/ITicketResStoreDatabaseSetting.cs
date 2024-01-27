/*
 * Author: Surath Chathuranga
 * File: ITicketResStoreDatabaseSetting.cs
 * Description: Defines the interface for ticket reservation store database settings.
 */
namespace WebApplication1.Models
{
    // Interface for defining ticket reservation store database settings
    public interface ITicketResStoreDatabaseSetting
    {
        string TicketReservationCollectionName { get; set; } // Gets or sets the collection name for ticket reservations
        string ConnectionString { get; set; } // Gets or sets the connection string for the database
        string DatabaseName { get; set; } // Gets or sets the name of the database
    }
}
