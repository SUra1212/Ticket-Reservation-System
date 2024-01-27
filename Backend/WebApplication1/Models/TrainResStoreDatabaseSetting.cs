/*
 * Author: Umayangi Ekanayake
 * File: TrainResStoreDatabaseSetting.cs
 * Description: Implementation of the ITrainResStoreDatabaseSetting interface representing database settings for train reservations.
 */
namespace WebApplication1.Models
{
    // Implementation of the ITrainResStoreDatabaseSetting interface representing database settings for train reservations
    public class TrainResStoreDatabaseSetting : ITrainResStoreDatabaseSetting
    {
        public string TrainManagementCollectionName { get; set; } = String.Empty; // Gets or sets the collection name for train reservations
        public string ConnectionString { get; set; } = String.Empty; // Gets or sets the connection string for the databas
        public string DatabaseName { get; set; } = String.Empty; // Gets or sets the name of the database
    }
}
