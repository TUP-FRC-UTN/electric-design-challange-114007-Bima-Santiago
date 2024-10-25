import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from './models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private http = inject(HttpClient)

  private apiUrl = "http://localhost:3000/budgets"

  get(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl)
  }

  getById(id:string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`)
  }

  post(b: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, b)
  }
}
