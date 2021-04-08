using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        private readonly IProAgilRepository _repos;

        public PalestranteController(IProAgilRepository repos)
        {
            _repos = repos;
            
        }

        [HttpGet("getByName/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var results = await _repos.GetAllPalestrantesAsyncByName(name, true);
                return Ok(results);
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _repos.GetPalestrantesAsync(id, true);
                return Ok(results);
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post (Palestrante model)
        {
            try
            {
                _repos.Add(model);
                
                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/palestrante/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }

            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put (int Id, Palestrante model)
        {
            try
            {
                var palestra = await _repos.GetPalestrantesAsync(Id, false);
                if (palestra==null) return NotFound();

                _repos.Update(model);
                
                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/palestrante/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete (int Id)
        {
            try
            {
                var palestra = await _repos.GetPalestrantesAsync(Id, false);
                if (palestra==null) return NotFound();

                _repos.Update(palestra);
                
                if(await _repos.SaveChangesAsync()){
                    return Ok();
                }
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }

            return BadRequest();
        }
    }
}