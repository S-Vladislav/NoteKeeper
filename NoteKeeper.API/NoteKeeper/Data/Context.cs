using Microsoft.EntityFrameworkCore;
using NoteKeeper.Models;

namespace NoteKeeper.Data;

public class Context: DbContext
{
   
    
    public Context(DbContextOptions options) : base(options)
    {
        
    }
    
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Tag> Tags { get; set; }

}
