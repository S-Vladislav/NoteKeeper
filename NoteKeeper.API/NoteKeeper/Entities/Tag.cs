using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteKeeper.Models;

public class Tag
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int TagId { get; set; }
    
    [Required]
    public string TagName { get; set; }
    
    
}