using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectV02.Server.Models.Entities;

public class Message
{
    [Key]
    public int MessageId { get; set; }
    [Required]
    public string MessageContent { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int UserId { get; set; }
    public int ProjectId { get; set; }
    public Project? Project { get; set; }
    public User? User { get; set; }


}
