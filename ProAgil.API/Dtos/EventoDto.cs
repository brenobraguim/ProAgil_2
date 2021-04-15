using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="Campo Obrigatório")]
        public string Local { get; set; }

        public DateTime DataEvento { get; set; }

        [Required]
        [StringLength(100,MinimumLength=3,ErrorMessage="Tema deve ter entre 3 e 100 caractéres")]
        public string Tema { get; set; }

        [Range(2,120000,ErrorMessage="Quantidade de Pessoas é entre 2 e 120.000")]
        public int QtdPessoas { get; set; }
        
        public string ImagemUrl { get; set; }

        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public List<LoteDto> Lotes { get; set; }

        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<PalestranteDto> Palestrantes { get; set; }
    }
}