using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Models.LoginModels
{
    public class RegisterCompany
    {
        [Required(ErrorMessage = "Company Name is Reaquired")]
        [MinLength(3, ErrorMessage = "Comapany Name Must Be At Least 3 Characters")]
        public string CompanyName { get; set; }
        [Required(ErrorMessage = "Comapny Emaail is Required")]
        [EmailAddress(ErrorMessage = "Should Be An Email")]
        public string CompanyEmail { get; set; }
        [Required(ErrorMessage = "Type is Required")]
        [MinLength(3, ErrorMessage = "Company type Must be At Least 3 Characters")]
        public string CompanyType { get; set; }
        [NotMapped]
        [Required]
        public IFormFile LogoImg { get; set; }
        [Required(ErrorMessage = "Password is Required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]


        [DataType(DataType.Password)]
        public string CompanyPassword { get; set; }
        [Required(ErrorMessage = "Confirm Password is Required")]
        [NotMapped]
        [Compare("CompanyPassword", ErrorMessage = "Confirm Password Must match Password ")]
        [DataType(DataType.Password)]
        public string CompanyConfirmPassword { get; set; }
    }
}
