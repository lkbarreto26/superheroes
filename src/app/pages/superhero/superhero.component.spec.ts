import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroComponent } from './superhero.component';

describe('SuperheroComponent', () => {
  let component: SuperheroComponent;
  let fixture: ComponentFixture<SuperheroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperheroComponent]
    });
    fixture = TestBed.createComponent(SuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
