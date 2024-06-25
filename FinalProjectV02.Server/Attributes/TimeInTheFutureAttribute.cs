using System.ComponentModel.DataAnnotations;

namespace FinalProjectV02.Server.Attributes;

public class TimeInTheFutureAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {

        if ((DateTime)value < DateTime.Now)
        {
            return new ValidationResult("Time Should be in the future");
        }
            return ValidationResult.Success;
    }
}
