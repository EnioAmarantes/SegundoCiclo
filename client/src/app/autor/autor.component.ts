import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from './autor';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autores: Autor[] = [];
  editId: string = '';
  displayedColumns: string[] = ['select', 'nome'];
  dataSource = new MatTableDataSource<Autor>(this.autores);
  selection = new SelectionModel<Autor>(true, []);

  autorForm = new FormGroup({
    nome: new FormControl('')
  });

  editMode: boolean = false;

  constructor(
    private autorService: AutorService,
    private formBuilder: FormBuilder
    ) {
      this.loadAutores();
     }

  loadAutores() {
    this.clearForm();
    this.autorService.getAutores()
      .subscribe((data: Autor[]) => {
        this.autores = data;
        this.refreshTable();
      });
  }

  clearForm(){
    this.autorForm.get('nome')?.setValue('');
  }

  refreshTable(){
    this.dataSource = new MatTableDataSource<Autor>(this.autores);
  }

  ngOnInit(): void {
    this.autorForm = this.formBuilder.group({
      nome: [null, Validators.required]
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
  checkboxLabel(row?: Autor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addAutor(){
    let autor = {
      _id: this.editId,
      position: this.autores.length, 
      nome: this.autorForm.get('nome')?.value
    };

    if(!this.editMode){
      this.autorService.postAutor(autor)
        .subscribe(result => {
          console.log(result);
          this.refreshTable();
        })
    }
    else{
      this.autorService.putAutor(autor)
        .subscribe(result => {
          console.log(result);
          this.loadAutores();
        })
    }

    this.editId = '';
    this.editMode = false;
    this.loadAutores();
  }

  editaAutor(){
    this.editMode = true;
    if(this.selection.selected.length == 1){
      this.editId = this.selection.selected[0]._id
      this.autorForm.get('nome')?.setValue(this.selection.selected[0].nome);
    }
    else {
      alert('Para editar selecione apenas um autor')
    }
  }

  removeAutor(){
    let autores = this.selection.selected;

    if(autores.length > 0){
      autores.forEach(autor => {
        this.autorService.deleteAutor(autor._id)
          .subscribe(result => {
            alert('Autor: ' + result.nome + " removido com sucesso!");
          });
      })
      this.loadAutores();
    }
    else
      alert('Precisa haver um autor selecionado');
  }

}
