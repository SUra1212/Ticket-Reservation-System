/*
 * Author: Umayangi Ekanayake
 * File: ITrainResService.cs
 * Description: Represents a service interface for managing train reservations
 */
using WebApplication1.Models;

namespace WebApplication1.Services
{
    // Interface for train reservation service operations
    public interface ITrainResService
    {
        // Gets a list of train reservations
        List<TrainRes> Get();
        TrainRes Get(string id); // Gets a specific train reservation by its ID
        TrainRes Create(TrainRes trainres); // Creates a new train reservation
        void Update(string id, TrainRes trainres); // Updates an existing train reservation by its ID
        void Remove(string id); // Removes a train reservation by its ID
    } 
}
