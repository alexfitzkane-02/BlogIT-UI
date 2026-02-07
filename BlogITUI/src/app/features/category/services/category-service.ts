import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest): Observable<AddCategoryRequest>{
    return this.http.post<AddCategoryRequest>(`${this.apiBaseUrl}/api/Category`, category);
  }

  getallCategoires(){
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/Category`);
  }
}
