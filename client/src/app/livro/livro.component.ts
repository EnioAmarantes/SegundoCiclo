import { SelectionModel } from '@angular/cdk/collections';
import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../autor/autor';
import { AutorService } from '../autor/autor.service';
import { ILivro } from './ILivro';
import { LivroServiceService } from './livro-service.service';


@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {
  livros: ILivro[] = [];
  autores: Autor[] = [];
  editId: string = '';
  displayedColumns: string[] = ['select', 'nome', 'autor', 'ano'];
  dataSource = new MatTableDataSource<ILivro>(this.livros);
  selection = new SelectionModel<ILivro>(true, []);

  livroForm = new FormGroup({
    nome: new FormControl(''),
    autor: new FormControl(''),
    editora: new FormControl(''),
    ano: new FormControl('')
  });

  currentYear: number;
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private livroService: LivroServiceService,
    private autorService: AutorService
    ) {
    this.currentYear = new Date().getFullYear();
    this.loadAutores();
    this.loadLivro();
   }

  ngOnInit(): void {
    this.livroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      autor: [null, Validators.required],
      editora: [null, Validators.required],
      ano: [null, Validators.required]
    })
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ILivro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addLivro() { 
    let autor_id = this.livroForm.get('autor')?.value;

    let autor = {
      _id: autor_id,
      nome: this.autores.find(autor => autor._id == autor_id)?.nome
    }
    let livro = {
      _id: this.editId,
      position: this.livros.length, 
      nome: this.livroForm.get('nome')?.value, 
      autor: autor, 
      editora: this.livroForm.get('editora')?.value, 
      ano: this.livroForm.get('ano')?.value
    };

    if(!this.editMode){
      this.livroService.postLivro(livro)
        .subscribe(result => {
          console.log(result);
          this.refreshTable();
        })
    }
    else{
      this.livroService.putLivro(livro)
        .subscribe(result => {
          console.log(result);
          this.loadLivro();
        })
    }

    this.editId = '';
    this.editMode = false;
    this.loadLivro();
  }

  editaLivro(){
    this.editMode = true;
    if(this.selection.selected.length == 1){
      this.editId = this.selection.selected[0]._id
      this.livroForm.get('nome')?.setValue(this.selection.selected[0].nome);
      this.livroForm.get('autor')?.setValue(this.selection.selected[0].autor._id);
      this.livroForm.get('editora')?.setValue(this.selection.selected[0].editora);
      this.livroForm.get('ano')?.setValue(this.selection.selected[0].ano);
    }
    else {
      alert('Para editar selecione apenas um livro')
    }
  }

  removeLivro() {
    let livros = this.selection.selected;

    if(livros.length > 0){
      livros.forEach(livro => {
        this.livroService.deleteLivro(livro._id)
          .subscribe(result => {
            alert('Livro: ' + result.nome + " do autor " + result.autor.nome + " removido com sucesso!");
          });
      })
      this.loadLivro();
    }
    else
      alert('Precisa haver um livro selecionado');
  }

  loadLivro(): void{
    this.clearForm();
    this.livroService.getLivros()
      .subscribe((data: ILivro[]) => {
        this.livros = data;
        this.refreshTable();
      });
  }

  clearForm(){
    this.livroForm.get('nome')?.setValue('');
    this.livroForm.get('autor')?.setValue('');
    this.livroForm.get('editora')?.setValue('');
    this.livroForm.get('ano')?.setValue('');
  }

  loadAutores(){
    this.autorService.getAutores()
      .subscribe((data: Autor[]) => {
        this.autores = data;
      })
  }

  refreshTable(){
    this.dataSource = new MatTableDataSource<ILivro>(this.livros);
  }
}
