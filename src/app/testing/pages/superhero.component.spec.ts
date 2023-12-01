import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroComponent } from '../../pages/superhero/superhero.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SuperheroService } from '../../services/superhero.service';
import { LoadingService } from '../../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroComponent', () => {
  let component: SuperheroComponent;
  let fixture: ComponentFixture<SuperheroComponent>;
  let superheroServiceMock: jasmine.SpyObj<SuperheroService>;
  let loadingServiceMock: jasmine.SpyObj<LoadingService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    superheroServiceMock = jasmine.createSpyObj('SuperheroService', ['getSuperheroes', 'deleteSuperhero']);
    loadingServiceMock = jasmine.createSpyObj('LoadingService', ['showLoading', 'hideLoading']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [SuperheroComponent, LoaderComponent, FooterComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule, MatFormFieldModule],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should open dialog when openDialog is called', () => {
    const superhero = { id: 1, name: 'Batman', description: 'The Dark Knight' };
    dialogMock.open.and.returnValue({ afterClosed: () => of(null) } as any);

    component.openDialog(superhero);

    expect(dialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), { data: superhero });
  });

  it('should delete superhero when deleteSuperhero is called', () => {
    const superhero = { id: 1, name: 'Wonder Woman', description: 'Amazon Princess' };

    component.deleteSuperhero(superhero);

    expect(superheroServiceMock.deleteSuperhero).toHaveBeenCalledWith(superhero.id);
  });

 
});
