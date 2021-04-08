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

        [HttpGet]
        public async Task<ActionResult> Get ()
        {
            try
            {
                var result = await _repos.GetAllPalestrantesAsync(true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get (int id)
        {
            try
            {
                var resultado = await _repos.GetPalestranteAsyncById(id,true);
                return Ok(resultado);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }

        [HttpGet("byName/{name}")]
        public async Task<ActionResult> Get (string name)
        {
            try
            {
                var resultado = await _repos.GetAllPalestrantesAsyncByName(name,true);
                return Ok(resultado);
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
                    return Created($"/api/Palestrante/{model.Id}", model);
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
                var evento = await _repos.GetPalestranteAsyncById(Id, false);
                if (evento==null) return NotFound();

                _repos.Update(model);
                
                if(await _repos.SaveChangesAsync()){
                    return Created($"/api/Palestrante/{model.Id}", model);
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
                var evento = await _repos.GetPalestranteAsyncById(Id, false);
                if (evento==null) return NotFound();

                _repos.Delete(evento);
                
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