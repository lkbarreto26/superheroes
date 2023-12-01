import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { SuperheroService } from '../../services/superhero.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;
  let superheroServiceSpy: jasmine.SpyObj<SuperheroService>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    superheroServiceSpy = jasmine.createSpyObj('SuperheroService', ['updateSuperhero', 'addSuperhero']);

    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: SuperheroService, useValue: superheroServiceSpy },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog onNoClick', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should save superhero when form is valid', fakeAsync(() => {
    const superhero = { id: 1, name: 'Superman', description: 'Man of Steel' };
    component.data = superhero;
    component.isEditing = true;

    // Simula el formulario válido
    component.name.setValue('Spiderman');
    component.description.setValue('Friendly neighborhood hero');


    component.saveSuperhero();
    tick(); // Espera a que se resuelva la promesa

    expect(superheroServiceSpy.updateSuperhero).toHaveBeenCalledWith({
      id: 1,
      name: 'Spiderman',
      description: 'Friendly neighborhood hero',
    });
    expect(dialogRefSpy.close).toHaveBeenCalled();
  }));

  it('should add superhero when form is valid and not editing', fakeAsync(() => {
    component.isEditing = false;

    // Simula el formulario válido
    component.name.setValue('Iron Man');
    component.description.setValue('Genius, billionaire, playboy, philanthropist');


    component.saveSuperhero();
    tick(); // Espera a que se resuelva la promesa

    expect(superheroServiceSpy.addSuperhero).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  }));

  // Agrega más pruebas según sea necesario para cubrir otros escenarios y lógica del componente
});
