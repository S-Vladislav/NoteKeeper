
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeper.Data;
using NoteKeeper.Models;

namespace NoteKeeper.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly Context _context;

        public NotesController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            var notes = await _context.Notes.ToListAsync();

            return Ok(notes);
        }



        [HttpPost]
        public async Task<IActionResult> AddNote([FromBody] Note contextRequest)
        {
            
            int maxAttempts = 10;
            int attemptCount = 0;
            bool isIdUnique = false;

            while (!isIdUnique && attemptCount < maxAttempts)
            {
                Random random = new Random();
                int randomNumber = random.Next();

                if (!await _context.Notes.AnyAsync(t => t.NoteId == randomNumber))
                {
                    contextRequest.NoteId = randomNumber;
                    await _context.Notes.AddAsync(contextRequest);
                    await _context.SaveChangesAsync();
                    isIdUnique = true;
                }

                attemptCount++;
            }

            if (!isIdUnique)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Could not generate a unique TagId.");
            }

            return Ok(contextRequest);
        }

        [HttpGet]
        [Route("{NoteId:int}")]
        public async Task<IActionResult> GetNote([FromRoute] int noteId)
        {
            var notes =
                await _context.Notes.FirstOrDefaultAsync(x => x.NoteId == noteId);

            if (notes == null)
            {
                return NotFound();
            }

            return Ok(notes);
        }

        [HttpPut]
        [Route("{NoteId:int}")]
        public async Task<IActionResult> UpdateNote([FromRoute] int noteId,
            Note updateNoteRequest)
        {
            var notes = await _context.Notes.FindAsync(noteId);
            if (notes == null)
            {
                return NotFound();
            }

            notes.NoteHeader = updateNoteRequest.NoteHeader;
            notes.NoteText = updateNoteRequest.NoteText;

            await _context.SaveChangesAsync();

            return Ok(notes);
        }

        [HttpDelete]
        [Route("{NoteId:int}")]
        public async Task<IActionResult> DeleteNote([FromRoute] int noteId)
        {
            var notes = await _context.Notes.FindAsync(noteId);

            if (notes == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(notes);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}