import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddAuthorRequest, Author } from '../models/author.model';
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

  getAllAuthors(){
    return httpResource<Author[]>(() => `${this.apiBaseUrl}/api/Author`);
  }

  addAuthor(author: AddAuthorRequest) : Observable<AddAuthorRequest>{
    return this.http.post<AddAuthorRequest>(`${this.apiBaseUrl}/api/Author`, author);
  }

}

