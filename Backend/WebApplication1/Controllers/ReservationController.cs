/*
 * Author: Dinul Liyanage
 * File: ReservationController.cs
 * Description: This file contains the controller for managing reservations in the API.
 */

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/reservation/")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService reservationService;

        public ReservationController(IReservationService reservationService)
        {
            this.reservationService = reservationService;
        }
        //Get all reservations
        [HttpGet("/reservations/{id}")]
        public ActionResult<List<Reservation>> Get(string id)
        {
            try
            {
                var reservations = reservationService.Get(id);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("/reservation")]
        public ActionResult<List<Reservation>> Get()
        {
            return reservationService.Get();
        }
        //Get reservation

        [HttpGet("/reservation/{id}")]
        public ActionResult<Reservation> GetOne(string id)
        {
            var reservation = reservationService.GetOne(id);

            if (reservation == null)
            {
                return NotFound($"Reservation with Id = {id} not found");
            }

            return reservation;
        }
        //POST reservation
        [HttpPost("/addRes")]
        public ActionResult<Reservation> Post([FromBody]Reservation reservation)
        {
            try
            {
                if(reservation ==  null)
                {
                    return BadRequest("reservation null");
                }
                reservationService.Create(reservation);
                return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);

            }catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("/update/{id}")]
        public ActionResult Put(string id, [FromBody] Reservation reservation)
        {
            var reservationCheck = reservationService.GetOne(id);

            if (reservationCheck == null)
            {
                return NotFound($"Reservation with Id = {id} not found");
            }
            reservationService.Update(id, reservation);
            return NoContent();
        }

        [HttpDelete("/delete/{id}")]
        public ActionResult Delete(string id)
        {
            var reservation = reservationService.GetOne(id);

            if (reservation == null)
            {
                return NotFound($"Student with Id = {id} not found");
            }
            reservationService.Remove(reservation.Id);

            return Ok();
        }

    }
}
