namespace FinalProjectV02.Server.Models.Entities;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public int UserId { get; set; }
    [Required(ErrorMessage = "Role is required")]
    public int RoleId { get; set; }
    [Required(ErrorMessage = "Company is required")]
    public int CompanyId { get; set; }

    [Required(ErrorMessage = "First Name is required")]
    [MinLength(3, ErrorMessage = "First Name must be at least 3 characters ")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last Name is required")]
    [MinLength(3, ErrorMessage = "Last Name must be at least 3 characters ")]

    public string LastName { get; set; }

    [Required(ErrorMessage = "User Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string UserEmail { get; set; }

    [Required(ErrorMessage = "User Password is required")]
    [DataType(DataType.Password)]
    public string UserPassword { get; set; }

    [Compare("UserPassword", ErrorMessage = "Passwords do not match")]
    [DataType(DataType.Password)]
    [NotMapped]
    public string ConfirmPassword { get; set; }
    [Required]
    public string UserPhoto { get; set; }


    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public Company? Company { get; set; }
    public Role? Role { get; set; }
    public Project? Project { get; set; }
    public List<Tache> Taches { get; set; } = new List<Tache>();
    public List<Message> Messages { get; set; } = new List<Message>();
    public List<UsersInProject> UserInprojects { get; set; } = new List<UsersInProject>();
    


}
