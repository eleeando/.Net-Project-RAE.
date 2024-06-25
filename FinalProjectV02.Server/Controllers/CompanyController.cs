using FinalProjectV02.Server.Data;
using FinalProjectV02.Server.Models.Entities;
using FinalProjectV02.Server.Models.LoginModels;
using FinalProjectV02.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinalProjectV02.Server.Controllers
{
    [Route("api/company")]
    [ApiController]
    public class CompanyController(AppDbContext db, ILogger<CompanyController> logger, IManageFiles iManageFiles) : ControllerBase
    {
        private readonly ILogger<CompanyController> _logger = logger;
        private readonly AppDbContext _db = db;
        private readonly IManageFiles _iManageFiles = iManageFiles;


        [HttpPost("register")]
        public async Task<ActionResult<string>> RegisterAsCompany(RegisterCompany company)
        {
            Company companyToGetIntoTheDb = new();
            if (ModelState.IsValid)
            {
                var existingUser = await _db.Companies.FirstOrDefaultAsync(u => u.CompanyEmail == company.CompanyEmail);
                if (existingUser == null)
                {
                    string pathOfCompanyLogo = await _iManageFiles.UploadFile(company.LogoImg);
                    companyToGetIntoTheDb.CompanyName = company.CompanyName;
                    companyToGetIntoTheDb.CompanyEmail = company.CompanyEmail;
                    companyToGetIntoTheDb.CompanyType = company.CompanyType;
                    companyToGetIntoTheDb.CompanyPassword = company.CompanyPassword;
                    companyToGetIntoTheDb.CompanyConfirmPassword = company.CompanyConfirmPassword;
                    companyToGetIntoTheDb.CompanyLogo = pathOfCompanyLogo;
                    PasswordHasher<Company> Hasher = new();
                    companyToGetIntoTheDb.CompanyPassword = Hasher.HashPassword(companyToGetIntoTheDb, company.CompanyPassword);
                    await _db.Companies.AddAsync(companyToGetIntoTheDb);
                    await _db.SaveChangesAsync();
                    var token = GenerateJwtToken(companyToGetIntoTheDb.CompanyId);
                    return Ok(new { Token = token, Company = companyToGetIntoTheDb });
                }
                ModelState.AddModelError("CompanyEmail", "Company with this email already exists.");
                return BadRequest(ModelState);

            }
            return BadRequest(ModelState);
        }
        [HttpPost("login")]
        public async Task<ActionResult<Company>> LoginAsCompany([FromBody] LoginModel login)
        {
            _logger.LogInformation("Login Started");
            if (ModelState.IsValid)
            {
                var companyFromDb = await _db.Companies.FirstOrDefaultAsync(c => c.CompanyEmail == login.LoginEmail);
                if (companyFromDb == null)
                {
                    ModelState.AddModelError("LoginEmail", "Company Doesn't exist try registring");
                    return BadRequest(ModelState);
                }
                PasswordHasher<LoginModel> hasher = new();
                var result = hasher.VerifyHashedPassword(login, companyFromDb.CompanyPassword, login.LoginPassword);
                if (result == 0)
                {
                    ModelState.AddModelError("LoginPassword", "Password is wrong");
                    return BadRequest(ModelState);
                }
                var token = GenerateJwtToken(companyFromDb.CompanyId);
                return Ok(new { Token = token, Company = companyFromDb });
            }
            return BadRequest(ModelState);
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Company>>> GetAllCompanies()
        {
            return await _db.Companies.Include(c=>c.Projects).Include(c=>c.Users).ThenInclude(c=>c.Role).ToListAsync();
        }
        [HttpGet("employees/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> Employees(int id)
        {
            return await _db.Users.Where(u=>u.CompanyId==id).ToListAsync();   
        }
        [HttpGet("employees")]
        public async Task<ActionResult<IEnumerable<Role>>> Employiees(int id)
        {
            return await _db.Roles.ToListAsync();
        }

        private string GenerateJwtToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();


            var key = Encoding.ASCII.GetBytes("adahfijvdsop4652316865412345@sdnsdkclkcsdn");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", userId.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
