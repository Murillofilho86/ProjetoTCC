using System;

namespace Tcc.Dominio.Entidades
{
    public class Cliente
    {
        public string Nome { get; set; }
        public string Idade { get; set; }
        public DateTime DataNascimento { get; set; }
        public string CPF { get; set; }

        public int LoginId { get; set; }

    }
}
