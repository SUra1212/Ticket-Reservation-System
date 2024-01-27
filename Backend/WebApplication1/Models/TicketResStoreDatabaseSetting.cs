/*
 * Author: Surath Chathuranga
 * File: TicketResStoreDatabaseSetting.cs
 * Description: Implementation of the ITicketResStoreDatabaseSetting interface for database settings.
 */
namespace WebApplication1.Models
{
    // Implementation of the ITicketResStoreDatabaseSetting interface for database settings
    public class TicketResStoreDatabaseSetting : ITicketResStoreDatabaseSetting
    {
        public string TicketReservationCollectionName { get; set; } = String.Empty; // Gets or sets the collection name for ticket reservations
        public string ConnectionString { get; set; } = String.Empty; // Gets or sets the connection string for the database
        public string DatabaseName { get; set; } = String.Empty; // Gets or sets the name of the database
    }
}
