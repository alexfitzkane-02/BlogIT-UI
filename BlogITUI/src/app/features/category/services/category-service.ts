import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, EditCategoryRequest } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  editCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  deleteCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest): Observable<AddCategoryRequest>{
    return this.http.post<AddCategoryRequest>(`${this.apiBaseUrl}/api/Category`, category);
  }

  getallCategoires(){
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/Category`);
  }

  getCategoryById(id: InputSignal<string | undefined>) : HttpResourceRef<Category | undefined>{
    return httpResource<Category>(() => `${this.apiBaseUrl}/api/Category/${id()}`);
  }

  editCategoryById(id: InputSignal<string | undefined>, category: EditCategoryRequest) : Observable<EditCategoryRequest | undefined>{
    return this.http.put<EditCategoryRequest>(`${this.apiBaseUrl}/api/Category/${id()}`, category);
  }

  deleteCategoryById(id: InputSignal<string | undefined>) : Observable<Category | undefined>{
    return this.http.delete<Category>(`${this.apiBaseUrl}/api/Category/${id()}`);
  }
}
