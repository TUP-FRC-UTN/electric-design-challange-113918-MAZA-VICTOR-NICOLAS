import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget, ModuleType } from '../models/budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:3000/module-types'

  getModules(): Observable<ModuleType[]> {
    return this.http.get<ModuleType[]>(`${this.apiUrl}`);
  }

  postBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`http://localhost:3000/budgets`, budget)
  }
  // Método para obtener un presupuesto por ID
  getBudgetById(id: string): Observable<Budget> {
    return this.http.get<Budget>(`http://localhost:3000/budgets/${id}`);
  }

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`http://localhost:3000/budgets`)
  }

}
