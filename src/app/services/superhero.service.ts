// superhero.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  
  private superheroes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    // Inicializar con algunos datos de ejemplo
    this.superheroes.next([
      { id: 1, name: 'Spiderman', description: 'test description' },
      { id: 2, name: 'Superman', description: 'test description' },
      { id: 3, name: 'Iron Man', description: 'test description' }
    ]);
  }

  getSuperheroes(): Observable<Array<any>> {
    return this.superheroes.asObservable();
  }

  getSuperheroById(id: number): Observable<any> {
    const superhero = this.superheroes.value.find(hero => hero.id === id);
    return new Observable(observer => {
      observer.next(superhero);
      observer.complete();
    });
  }

  getSuperheroesByName(filter: string): Observable<Array<any>> {
    const filteredHeroes = this.superheroes.value.filter(hero =>
      hero.name.toLowerCase().includes(filter.toLowerCase())
    );
    return new Observable(observer => {
      observer.next(filteredHeroes);
      observer.complete();
    });
  }

  addSuperhero(superhero: any): void {
    const currentSuperheroes = this.superheroes.value;
    superhero.id = this.generateUniqueId();
    this.superheroes.next([...currentSuperheroes, superhero]);
  }

  updateSuperhero(superhero: any): void {
    const currentSuperheroes = this.superheroes.value;
    const updatedSuperheroes = currentSuperheroes.map(h => (h.id === superhero.id ? superhero : h));
    this.superheroes.next(updatedSuperheroes);
  }

  deleteSuperhero(id: number): void {
    const currentSuperheroes = this.superheroes.value;
    const updatedSuperheroes = currentSuperheroes.filter(hero => hero.id !== id);
    this.superheroes.next(updatedSuperheroes);
  }

  private generateUniqueId(): number {
    // Implementa la generación de IDs según tu necesidad
    // Este es solo un ejemplo básico
    return Math.floor(Math.random() * 1000) + 1;
  }
}
