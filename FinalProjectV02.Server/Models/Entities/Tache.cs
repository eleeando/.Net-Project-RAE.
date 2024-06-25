using FinalProjectV02.Server.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectV02.Server.Models.Entities;

public class Tache
{
    [Key]
    public int TaskId { get; set; }
    [Required]
    [MinLength(10, ErrorMessage = "Task Description must be at least 10 characters .")]
    public string TaskDescription { get; set; }
    [Required]
    [TimeInTheFuture]
    public DateTime StartDate { get; set; }
    [Required]
    [TimeInTheFuture]
    public DateTime EndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    [Required(ErrorMessage ="Employee is required")]
    public int UserId { get; set; }
    [Required]
    public int ProjectId { get; set; }
    public int StatusId { get; set; }
    public User? User { get; set; }
    public Project? Project { get; set; }
    public Status? Status { get; set; }


}

