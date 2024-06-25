using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Models.Entities;

public class Role
{
    [Key]
    public int RoleId { get; set; }
    [Required]
    public string RoleName { get; set; }
    public List<User> Users { get; set; }= new List<User>();

}
