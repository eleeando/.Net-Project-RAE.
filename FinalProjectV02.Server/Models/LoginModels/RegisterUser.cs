using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Models.LoginModels;

public class RegisterUser
{
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
    public IFormFile UserPhoto { get; set; }

    [Required(ErrorMessage = "Company ID is required")]
    public int CompanyId { get; set; }
    public int RoleId { get; set; }


    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
