using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteKeeper.Models;

    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationID { get; set; }
    
        [Required]
        public string NotificationText { get; set; }
    
        [Required]
        [Column(TypeName = "timestamp without time zone")]
        public DateTime CompletionDate { get; set; }
    }
