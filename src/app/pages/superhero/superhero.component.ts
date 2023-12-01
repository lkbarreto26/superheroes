import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog
} from '@angular/material/dialog';
import { SuperheroService } from '../../services/superhero.service';
import { LoadingService } from '../../services/loading.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Superhero } from '../../interfaces/heroe.interface';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.scss'],

})

export class SuperheroComponent implements AfterViewInit {
  superheroes: any[] = [];
  selectedSuperhero: any = {};
  isEditing = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource<dataElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
  }

  constructor(
    private superheroService: SuperheroService,
    public loadingService: LoadingService,
    public dialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl,
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }

  ngOnInit(): void {
    this.superheroService.getSuperheroes().subscribe(superheroes => {
      this.superheroes = superheroes;
      this.dataSource = new MatTableDataSource<dataElement>(superheroes);
    });

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading
    });
  }

  openDialog(data: Superhero): void {
  this.dialog.open(DialogComponent, {
      data: data,
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSuperhero(superhero: any): void {
    // Implementa lógica para eliminar un superhéroe
    const confirmDelete = confirm(`¿Estás seguro de borrar a ${superhero.name}?`);
    if (confirmDelete) {
      this.superheroService.deleteSuperhero(superhero.id);
    }
  }
}

export interface dataElement {
  name: string;
  description: string;
}
