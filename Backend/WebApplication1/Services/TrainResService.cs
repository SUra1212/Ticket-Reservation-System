/*
 * Author: Umayangi Ekanayake
 * File: TrainResService.cs
 * Description: Service class for managing train reservations using MongoDB
 */
using MongoDB.Driver;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    // Implements the ITrainResService interface
    public class TrainResService : ITrainResService
    {
        private readonly IMongoCollection<TrainRes> _trainres;

        // Initializes a new instance of the TrainResService class
        public TrainResService(ITrainResStoreDatabaseSetting settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _trainres = database.GetCollection<TrainRes>(settings.TrainManagementCollectionName);
        }

        // Creates a new train reservation
        public TrainRes Create(TrainRes trainres)
        {
            _trainres.InsertOne(trainres);
            return trainres;
        }

        // Gets a list of all train reservations.
        public List<TrainRes> Get()
        {
            return _trainres.Find(trainres => true).ToList();
        }

        // Gets a train reservation by its ID
        public TrainRes Get(string id)
        {
            return _trainres.Find(trainres => trainres.Id == id).FirstOrDefault();
        }

        // Removes a train reservation by its ID.
        public void Remove(string id)
        {
            _trainres.DeleteOne(trainres => trainres.Id == id);
        }

        // Updates a train reservation by its ID
        public void Update(string id, TrainRes trainres)
        {
            _trainres.ReplaceOne(trainres => trainres.Id == id, trainres);
        }
    }
}
