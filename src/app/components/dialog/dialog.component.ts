import { Component, Inject } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { FormControl, Validators } from '@angular/forms';
import { Superhero } from '../../interfaces/heroe.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  selectedSuperhero: any = {};
  isEditing = false;
  name = new FormControl();
  description = new FormControl();



  constructor(
    private superheroService: SuperheroService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Superhero,
  ) {

    if (data.name !== '') {
      this.isEditing = true;
      this.name = new FormControl(data.name, [Validators.required]);
      this.description = new FormControl(data.description, [Validators.required]);

    } else {
      this.isEditing = false
      this.name = new FormControl('', [Validators.required]);
      this.description = new FormControl('', [Validators.required]);

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveSuperhero(): void {


    if (this.name.valid && this.description.valid) {

      const superhero = {
        id: this.data.id,
        name: this.name.value,
        description: this.description.value
      }
      if (this.isEditing) {
        this.superheroService.updateSuperhero(superhero);
      } else {
        this.superheroService.addSuperhero(superhero);
      }

      this.isEditing = false;
      this.dialogRef.close();
    } else {
      
    }


  }
}
