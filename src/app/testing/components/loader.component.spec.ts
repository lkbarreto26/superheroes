import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from '../../components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent], 
      imports: [MatProgressSpinnerModule]
    });
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
