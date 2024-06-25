using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Models.LoginModels
{
    public class LoginModel
    {
        [Required(ErrorMessage ="Email is Required")]
        public string LoginEmail { get; set; }
        [Required(ErrorMessage ="Password is required")]
        public string LoginPassword { get; set; }
    }
}
