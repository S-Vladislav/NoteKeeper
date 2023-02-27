using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteKeeper.Data;
using NoteKeeper.Models;

namespace NoteKeeper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : Controller
    {
        private readonly Context _context;

        public NotificationsController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotifications()
        {
            var notifications = await _context.Notifications.ToListAsync();

            return Ok(notifications);
        }



        [HttpPost]
        public async Task<IActionResult> AddNotification([FromBody] Notification contextRequest)
        {
            int maxAttempts = 10;
            int attemptCount = 0;
            bool isIdUnique = false;

            while (!isIdUnique && attemptCount < maxAttempts)
            {
                Random random = new Random();
                int randomNumber = random.Next();

                if (!await _context.Notifications.AnyAsync(t => t.NotificationID == randomNumber))
                {
                    contextRequest.NotificationID = randomNumber;
                    await _context.Notifications.AddAsync(contextRequest);
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
        [Route("{NotificationID:int}")]
        public async Task<IActionResult> GetNotification([FromRoute] int notificationId)
        {
            var notification =
                await _context.Notifications.FirstOrDefaultAsync(x => x.NotificationID == notificationId);

            if (notification == null)
            {
                return NotFound();
            }

            return Ok(notification);
        }

        [HttpPut]
        [Route("{NotificationID:int}")]
        public async Task<IActionResult> UpdateNotification([FromRoute] int notificationId,
            Notification updateNotificationRequest)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
            {
                return NotFound();
            }

            notification.NotificationText = updateNotificationRequest.NotificationText;
            notification.CompletionDate = updateNotificationRequest.CompletionDate;

            await _context.SaveChangesAsync();

            return Ok(notification);
        }

        [HttpDelete]
        [Route("{NotificationID:int}")]
        public async Task<IActionResult> DeleteNotification([FromRoute] int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);

            if (notification == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
