
using FinalProjectV02.Server.Data;
using FinalProjectV02.Server.Models.Entities;
using FinalProjectV02.Server.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace FinalProjectV02.Server.Controllers;

[Route("api/project")]
[ApiController]
public class ProjectController(AppDbContext db, IProjectRepository projectRepository) : ControllerBase
{
    private readonly AppDbContext _db = db;
    private readonly IProjectRepository  _projectRepository = projectRepository;

    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(Project project)
    {
        if (project == null)
        {
            return BadRequest(ModelState);
        }
        if (ModelState.IsValid)
        {
            await _db.AddAsync(project);
            await _db.SaveChangesAsync();
            return Ok(project);
        }
        return BadRequest(ModelState);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetOneProjectWithTaches([FromHeader] int id)
    {
        var projectFromDb = await _db.Projects.Include(p => p.Taches).FirstOrDefaultAsync(p => p.ProjectId == id);
        if (projectFromDb is not null)
        {
            return Ok(projectFromDb);
        }
        return NotFound();
    }
    [HttpGet("company/{id}")]
    public async Task<ActionResult<List<Project>>> OneCompanyProjects([FromHeader] int id)
    {
        return await _db.Projects.ToListAsync();
    }
    //Get one Owner all projects
    [HttpGet("owner/{id}")]
    public async Task<ActionResult<IEnumerable<Project>>> GetOneOwnerAllProjects([FromHeader] int id)
    {
        return await _db.Projects.Where(p => p.OwnerId == id).ToListAsync();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProjectWithTaches([FromHeader] int id)
    {
        var projectFromDb = await _db.Projects.Include(p => p.Taches).FirstOrDefaultAsync(p => p.ProjectId == id);

        if (projectFromDb is not null)
        {
            _db.Taches.RemoveRange(projectFromDb.Taches); // Remove all tasks associated with the project
            _db.Projects.Remove(projectFromDb); // Remove the project itself
            await _db.SaveChangesAsync(); // Save changes to the database
        }

        return Ok(); // Or any other appropriate response
    }

    [HttpGet("projects/all")]
    public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
    {
        return Ok(_projectRepository.GetAll());
    }


}
