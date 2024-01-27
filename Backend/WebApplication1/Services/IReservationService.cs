/*
 * Author: Dinul Liyanage
 * File: IReservationService.cs
 * Description: This file defines the IReservationService interface, which specifies the methods for reservation-related operations in the application.
 */

using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IReservationService
    {
        // Get a list of reservations for a specific user
        List<Reservation> Get(string id);

        // Get a list of all reservations
        List<Reservation> Get();

        // Get a specific reservation by ID.
        Reservation GetOne(string id);

        // Create a new reservation.
        Reservation Create(Reservation reservation);

        // Update a reservation.
        void Update(string id, Reservation reservation);

        // Remove a reservation by ID.
        void Remove(string id);
    }
}
