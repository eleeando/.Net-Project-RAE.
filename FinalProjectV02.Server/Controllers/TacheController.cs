using FinalProjectV02.Server.Data;
using FinalProjectV02.Server.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProjectV02.Server.Controllers;

[Route("api/tache")]
[ApiController]
public class TacheController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpPost]
    public async Task<ActionResult<Tache>> CreateTache([FromBody] Tache tache)
    {
        if (ModelState.IsValid)
        {
            await _db.Taches.AddAsync(tache);
            await _db.SaveChangesAsync();
            return Ok(tache);
        }
        return BadRequest(ModelState);
    }
    [HttpGet("{userId}/{projectId}")]
    public async Task<ActionResult<IEnumerable<Tache>>> GetTachesOfOneUserInOneProject([FromHeader] int userId, [FromHeader] int projectId)
    {
        List<Tache> taches = await _db.Taches.Include(t => t.Status).Include(t => t.Project).Where(t => t.UserId == userId && t.ProjectId == projectId).ToListAsync();
        return Ok(taches);
    }
    [HttpPatch("{tacheId}")]
    public async Task<ActionResult<Tache>> ChangeStatusOfTache([FromHeader] int tacheId, [FromBody] Tache tachUpdated)
    {
        Tache tache = await _db.Taches.FirstOrDefaultAsync(t => t.TaskId == tacheId);
        if (ModelState.IsValid)
        {
            tache.TaskDescription = tache.TaskDescription;
            tache.StatusId = tachUpdated.StatusId;
            tache.UpdatedAt = DateTime.Now;
            _db.SaveChangesAsync();
            return Ok(tache);
        }
        return BadRequest();
    }

    [HttpGet("status")]
    public async Task<ActionResult<IEnumerable<Status>>> GetAllStatus()
    {
        List<Status> statuses = await _db.Statuses.ToListAsync();
        return Ok(statuses);
    }

    [HttpPost("status")]
    public async Task<ActionResult<Status>> CreateStatus(Status status)
    {
        await _db.Statuses.AddAsync(status);
        await _db.SaveChangesAsync();
        return Ok(status);
    }



    [HttpDelete("{tacheId}")]
    public async Task<ActionResult> DeleteTask([FromHeader] int tacheId)
    {
        Tache tache = await _db.Taches.FirstOrDefaultAsync(t => t.TaskId == tacheId);
        _db.Taches.Remove(tache);
        await _db.SaveChangesAsync();
        return Ok();
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tache>>> getAllTaches()
    {
        return await _db.Taches.Include(t => t.User).Include(t => t.Project).Include(t => t.Status).ToListAsync();
    }

}