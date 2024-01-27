/*
 * Author: Dinul Liyanage
 * File: ReservationService.cs
 * Description: This file defines the ReservationService class, which handles operations related to reservations in the application.
 */

using MongoDB.Driver;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class ReservationService: IReservationService
    {
        private readonly IMongoCollection<Reservation> _reservation;
        public ReservationService(IReservationStoreDatabaseSetting settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _reservation = database.GetCollection<Reservation>(settings.MobileresCollectionName);

        }

        // Create a new reservation.
        public Reservation Create(Reservation reservation)
        {
            _reservation.InsertOne(reservation);
            return reservation;
        }

        // Get a list of all reservations.
        public List<Reservation> Get()
        {
            return _reservation.Find(reservation => true).ToList();
        }

        // Get a list of reservations for a specific user.
        public List<Reservation> Get(string id)
        {
            var filter = Builders<Reservation>.Filter.Eq(doc => doc.nic, id);
            return _reservation.Find(filter).ToList();
        }

        // Get a specific reservation by ID.
        public Reservation GetOne(string id)
        {
            return _reservation.Find(res=>res.Id == id).FirstOrDefault();
        }

        // Remove a reservation by ID.
        public void Remove(string id)
        {
            _reservation.DeleteOne(res=>res.Id==id);
        }

        // Update a reservation
        public void Update(string id, Reservation reservation)
        {
            _reservation.ReplaceOne(res=>res.Id==id,reservation);
        }
    }
}
