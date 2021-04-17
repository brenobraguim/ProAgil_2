import { EventoService } from '../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  evento!: Evento;
  modoSalvar = '';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;
  bodyDeletarEvento = '';
  dataEvento!: string;
  titulo = 'Eventos';
  file!: File[];
  // tslint:disable-next-line: variable-name
  _filtrolista = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
    }

  get filtroLista(): string {
    return this._filtrolista;
  }
  set filtroLista(value: string) {
    this._filtrolista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  // tslint:disable-next-line: typedef
  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  // tslint:disable-next-line: typedef
  novoEvento(template: any){
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  excluirEvento(evento: Evento, template: any){
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id }`;
  }

  // tslint:disable-next-line: typedef
  confirmeDelete(template: any){
    // tslint:disable-next-line: deprecation
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com Sucesso!');
        }, error => {
          this.toastr.error('Erro ao Tentar Deletar');
          console.log(error);
        }
    );
  }

  // tslint:disable-next-line: typedef
  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.validation();
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
  validation(){
    this.registerForm = this.fb.group({
      // tslint:disable-next-line: new-parens
      tema: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      // tslint:disable-next-line: new-parens
      local: ['', Validators.required],
      // tslint:disable-next-line: new-parens
      dataEvento: ['', Validators.required],
      // tslint:disable-next-line: new-parens
      imagemUrl: ['', Validators.required],
      // tslint:disable-next-line: new-parens
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      // tslint:disable-next-line: new-parens
      telefone: ['', Validators.required],
      // tslint:disable-next-line: new-parens
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // tslint:disable-next-line: typedef
  onFileChange(event: any){
    const reader = new FileReader();
    if (event.target.files && event.target.files.lenght){
      this.file = event.target.files;
      console.log(this.file);
    }
  }


  // tslint:disable-next-line: typedef
  salvarAlteracao(template: any){
    if (this.registerForm.valid){
      if (this.modoSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);

        // tslint:disable-next-line: deprecation
        this.eventoService.postUpload(this.file).subscribe();
        const NomeArquivo = this.evento.imagemUrl.split('\\', 3);
        this.evento.imagemUrl = NomeArquivo[2];

        // tslint:disable-next-line: deprecation
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento | any) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Evento Criado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Criar Evento: ${error}`);
          }
        );
      } else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        // tslint:disable-next-line: deprecation
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
            this.toastr.success('Evento Alterado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar Evento: ${error}`);
          }
        );
      }
    }
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
      this.toastr.error(`Erro ao tentar carregar os eventos: ${error}`);
    }
    );
  }
}
