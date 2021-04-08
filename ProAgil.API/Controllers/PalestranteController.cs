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
                var results = await _repo.GetAllPalestrantesAsyncByName(name, true);
                return Ok(results);
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }

         [HttpGet("getById/{Id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _repo.GetPalestrantesAsync(id, true);
                return Ok(results);
            }
            catch (System.Exception)
            {   
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }
    }
}