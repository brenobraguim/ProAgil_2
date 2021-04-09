import { EventoService } from '../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {


  // tslint:disable-next-line: variable-name
  _filtrolista = '';
  get filtroLista(): string {
    return this._filtrolista;
  }
  set filtroLista(value: string) {
    this._filtrolista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private eventoService: EventoService) { }


  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  // tslint:disable-next-line: typedef
  alternarImagem(){
    this.mostrarImagem = ! this.mostrarImagem;
  }


  // tslint:disable-next-line: typedef
  getEventos(){

    // tslint:disable-next-line: deprecation
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line: variable-name
      (_eventos: Evento[]) => {
      this.eventosFiltrados = this.eventos = _eventos;
      console.log(_eventos);
    }, error => {
      console.log(error);
    }
    );
  }
}
