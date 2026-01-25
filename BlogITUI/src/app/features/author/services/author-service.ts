import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddAuthorRequest, Author } from '../models/author.model';
import { environment } from '../../../../environments/environment';
import { AddAuthor } from '../add-author/add-author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  
  http = inject(HttpClient);

  apiBaseUrl = environment.apiBaseUrl;

  addAuthorStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');

  getAllAuthors(){
    return httpResource<Author[]>(() => `${this.apiBaseUrl}/api/Author/authors`);
  }

  addAuthor(author: AddAuthorRequest){
    this.addAuthorStatus.set('loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/author/author`, author).subscribe({
      next: () => {
        this.addAuthorStatus.set('success');
      },
      error: () => {
        this.addAuthorStatus.set('error');
      }
    });
  }
}
