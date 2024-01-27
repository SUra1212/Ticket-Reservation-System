/*
 * Umayangi Ekanayake
 * File: TrainResController.cs
 * Description: Controller for managing train reservation-related API operations.
 */
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;


namespace WebApplication1.Controllers

// Controller for managing train reservation-related API operations
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainResController : ControllerBase
    {
        private readonly ITrainResService itrainres;

        // Constructor for TrainResController class
        // <param name = "itrainres" > The train reservation service.</param>
        public TrainResController(ITrainResService itrainres)
        {
            this.itrainres = itrainres;
        }
        // Retrieves a list of all train reservations
        [HttpGet]
        public ActionResult<List<TrainRes>> Get()
        {
            return itrainres.Get();
        }

        // Retrieves a specific train reservation by its unique identifier
        [HttpGet("{id}")]
        public ActionResult<TrainRes> Get(string id)
        {
            var trainres = itrainres.Get(id);

            if (trainres == null)
            {
                return NotFound($"Train with Id = {id} not found");
            }

            return trainres; //The train reservation with the specified ID
        }

        // Creates a new train reservation
        [HttpPost]
        public ActionResult<TrainRes> Post([FromBody] TrainRes trainres)
        {
            itrainres.Create(trainres);

            return CreatedAtAction(nameof(Get), new { id = trainres.Id }, trainres);
        }

        // Updates an existing train reservation by its unique identifier
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] TrainRes trainres)
        {
            var existingStudent = itrainres.Get(id);

            if (existingStudent == null)
            {
                return NotFound($"Train with Id = {id} not found");
            }
            itrainres.Update(id, trainres);
            return NoContent();
        }

        // Deletes a train reservation by its unique identifier
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var trainres = itrainres.Get(id);

            if (trainres == null)
            {
                return NotFound($"Train with Id = {id} not found");
            }
            itrainres.Remove(trainres.Id);

            return Ok($"Train with Id = {id} deleted"); //Ok result if successful
        }
    }
}
