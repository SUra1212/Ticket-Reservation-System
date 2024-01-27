/*
 * Author: Umayangi Ekanayake
 * File: ITrainResStoreDatabaseSetting.cs
 * Description: Interface defining the contract for train reservation store database settings.
 */
namespace WebApplication1.Models
{
    // Interface defining the contract for train reservation store database settings
    public interface ITrainResStoreDatabaseSetting
    {
        string TrainManagementCollectionName { get; set; } // Gets or sets the collection name for train reservations
        string ConnectionString { get; set; } // Gets or sets the connection string for the database
        string DatabaseName { get; set; } // Gets or sets the name of the database
    }
}
