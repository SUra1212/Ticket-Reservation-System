/*
 * Author: Surath Chathuranga
 * File: TicketResController.cs
 * Description: Controller for managing ticket reservation-related API operations.
 */
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;


namespace WebApplication1.Controllers
{
    // Controller for managing ticket reservation-related API operations
    [Route("api/[controller]")]
    [ApiController]
    public class TicketResController : ControllerBase
    { 
      private readonly ITicketResService iticketres;

        // Constructor for TicketResController class
        public TicketResController(ITicketResService iticketres)
    {
        this.iticketres = iticketres;
    }
   // Retrieves a list of all ticket reservation
    [HttpGet]
    public ActionResult<List<TicketRes>> Get()
    {
        return iticketres.Get();
    }

        // Retrieves a specific ticket reservation by its unique identifier
        [HttpGet("{id}")]
    public ActionResult<TicketRes> Get(string id)
    {
        var ticketres = iticketres.Get(id);

        if (ticketres == null)
        {
            return NotFound($"Student with Id = {id} not found");
        }

        return ticketres;
    }

        // Creates a new ticket reservation
        [HttpPost]
    public ActionResult<TicketRes> Post([FromBody] TicketRes ticketres)
    {
            iticketres.Create(ticketres);

        return CreatedAtAction(nameof(Get), new { id = ticketres.Id }, ticketres);
    }

        // Updates an existing ticket reservation by its unique identifier
        [HttpPut("{id}")]
    public ActionResult Put(string id, [FromBody] TicketRes ticketres)
    {
        var existingStudent = iticketres.Get(id);

        if (existingStudent == null)
        {
            return NotFound($"Student with Id = {id} not found");
        }
            iticketres.Update(id, ticketres);
        return NoContent();
    }

        // Deletes a ticket reservation by its unique identifier
        [HttpDelete("{id}")]
    public ActionResult Delete(string id)
    {
        var ticketres = iticketres.Get(id);

        if (ticketres == null)
        {
            return NotFound($"Student with Id = {id} not found");
        }
            iticketres.Remove(ticketres.Id);

        return Ok($"Student with Id = {id} deleted");
    }

    }
}
