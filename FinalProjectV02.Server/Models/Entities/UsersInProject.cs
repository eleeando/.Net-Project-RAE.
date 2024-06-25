using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectV02.Server.Models.Entities;


public class UsersInProject
{
    [Key]
    public int UsersInProjectId { get; set; }
    [Required]
    public string UserStatus { get; set; }
    public int UserId { get; set; }
    public int ProjectId { get; set; }
    public User? User { get; set; }
    public Project? Project { get; set; }

}
