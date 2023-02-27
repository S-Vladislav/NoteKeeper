using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteKeeper.Models;

public class Note
{
    [Key] //can use EF convention instead
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int NoteId { get; set; }
    
    [Required]
    public string NoteHeader { get; set; }
    
    [Required]
    public string NoteText { get; set; }
    
}