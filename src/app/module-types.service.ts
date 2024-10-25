import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ModuleType } from './models/budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleTypesService {
  private readonly http = inject(HttpClient)

  private apiUrl = "http://localhost:3000/module-types"

  get(): Observable<ModuleType[]> {
    return this.http.get<ModuleType[]>(this.apiUrl)
  }
}
