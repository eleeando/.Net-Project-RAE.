using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Models.Entities;


public class Status
{
    [Key]
 
    public int StatusId { get; set; }
    [Required]
    public String StatusName { get; set; }
    public List<Tache> Taches { get; set; } = new List<Tache>();
}
