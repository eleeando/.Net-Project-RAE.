using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectV02.Server.Models.Entities
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        [ForeignKey(nameof(Owner))]
        public int OwnerId { get; set; }
        [Required(ErrorMessage = "Company is required")]
        public int CompanyId { get; set; }

        [Required]
        [MinLength(10, ErrorMessage = "Project Description must be at least 10 characters")]
        public string ProjectDescription { get; set; }

        [Required]
        public DateTime ProjectDuration { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Use UTC for consistent timestamps

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // Use UTC for consistent timestamps

        // Navigation Properties (Foreign Keys)
        public Company? Company { get; set; }
        public User? Owner { get; set; }

        // Many-to-Many Relationships (if applicable)
        public List<Message> Messages { get; set; } = new();// Consider using ICollection for efficiency
        public List<Tache> Taches { get; set; } = new(); // Consider using ICollection for efficiency
        public List<UsersInProject> UsersInProjects { get; set; } = new(); // Consider using ICollection for efficiency
    }
}
