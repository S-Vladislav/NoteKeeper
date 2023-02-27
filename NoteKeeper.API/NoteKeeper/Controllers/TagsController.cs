using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeper.Data;
using NoteKeeper.Models;

namespace NoteKeeper.Controllers

{

    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : Controller
    {
        private readonly Context _context;

        public TagsController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _context.Tags.ToListAsync();

            return Ok(tags);
        }



        [HttpPost]
        public async Task<IActionResult> AddTag([FromBody] Tag contextRequest)
        {
            int maxAttempts = 10;
            int attemptCount = 0;
            bool isIdUnique = false;

            while (!isIdUnique && attemptCount < maxAttempts)
            {
                Random random = new Random();
                int randomNumber = random.Next();

                if (!await _context.Tags.AnyAsync(t => t.TagId == randomNumber))
                {
                    contextRequest.TagId = randomNumber;
                    await _context.Tags.AddAsync(contextRequest);
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
            [Route("{TagId:int}")]
            public async Task<IActionResult> GetTag([FromRoute] int tagId)
            {
                var tags =
                    await _context.Tags.FirstOrDefaultAsync(x => x.TagId == tagId);

                if (tags == null)
                {
                    return NotFound();
                }

                return Ok(tags);
            }

            [HttpPut]
            [Route("{TagId:int}")]
            public async Task<IActionResult> UpdateTag([FromRoute] int tagId,
                Tag updateTagRequest)
            {
                var tags = await _context.Tags.FindAsync(tagId);
                if (tags == null)
                {
                    return NotFound();
                }

                tags.TagName = updateTagRequest.TagName;

                await _context.SaveChangesAsync();

                return Ok(tags);
            }

            [HttpDelete]
            [Route("{TagId:int}")]
            public async Task<IActionResult> DeleteTag([FromRoute] int tagId)
            {
                var tags = await _context.Tags.FindAsync(tagId);

                if (tags == null)
                {
                    return NotFound();
                }

                _context.Tags.Remove(tags);
                await _context.SaveChangesAsync();

                return Ok();
            }
        
          
        }

    }

        