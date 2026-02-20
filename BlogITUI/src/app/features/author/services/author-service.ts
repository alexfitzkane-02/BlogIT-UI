import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddAuthorRequest, Author, EditAuthorRequest } from '../models/author.model';
import { environment } from '../../../../environments/environment';
import { AddAuthor } from '../add-author/add-author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  
  http = inject(HttpClient);

  apiBaseUrl = environment.apiBaseUrl;

  addAuthorStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  editAuthorStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  deleteAuthorStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');

  getAllAuthors(){
    return httpResource<Author[]>(() => `${this.apiBaseUrl}/api/Author`);
  }

  getAuthorById(id: InputSignal<string | undefined>): HttpResourceRef<Author | undefined>{
    return httpResource<Author>(() => `${this.apiBaseUrl}/api/Author/${id()}`);
  }

  addAuthor(author: AddAuthorRequest) : Observable<AddAuthorRequest>{
    return this.http.post<AddAuthorRequest>(`${this.apiBaseUrl}/api/Author`, author, {
      withCredentials: true
    });
  }

  editAuthorById(id: InputSignal<string | undefined>, author: EditAuthorRequest) : Observable<Author | undefined>{
    return this.http.put<Author>(`${this.apiBaseUrl}/api/Author/${id()}`, author, {
      withCredentials: true
    });
  }

  deleteAuthorById(id: InputSignal<string | undefined>): Observable<Author>{
    return this.http.delete<Author>(`${this.apiBaseUrl}/api/Author/${id()}`, {
      withCredentials: true
    });
  }

}

