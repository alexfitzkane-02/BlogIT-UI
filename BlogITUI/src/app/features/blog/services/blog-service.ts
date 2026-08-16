import { HttpClient, httpResource, HttpResourceRef, HttpResponse } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { BlogPostDto, CreateBlogPostDto, EditBlogPostDto, PagedBlogResponse } from '../models/blog.models';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  editBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  deleteBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');

  getBlogPosts(pageNumber = signal(1), pageSize = signal(10), search = signal(''), showAll = false) {
    return httpResource<PagedBlogResponse>(() => {
      const params = new URLSearchParams({
        pageNumber: pageNumber().toString(),
        pageSize: pageSize().toString(),
      });

      // only show visible posts on public pages
      if (!showAll) {
        params.set('isVisible', 'true');
      }

      // only add search param if there's actually a value
      if (search() !== '') {
        params.set('search', search());
      }

      return `${this.apiBaseUrl}/api/Blog?${params.toString()}`;
    });
  }
  addBlogPost(blogPost: CreateBlogPostDto): Observable<CreateBlogPostDto> {
    return this.http.post<CreateBlogPostDto>(`${this.apiBaseUrl}/api/Blog`, blogPost, {
      withCredentials: true
    });
  }

  getBlogPostById(id: InputSignal<string | undefined>): HttpResourceRef<BlogPostDto | undefined> {
    return httpResource<BlogPostDto>(() => `${this.apiBaseUrl}/api/Blog/${id()}`);
  }

  getBlogPostByUrlHandle(urlHandle: InputSignal<string | undefined>): HttpResourceRef<BlogPostDto | undefined> {
    return httpResource<BlogPostDto>(() => `${this.apiBaseUrl}/api/Blog/${urlHandle()}`);
  }

  updateBlogPostById(id: string, editBlogPost: EditBlogPostDto): Observable<EditBlogPostDto> {
    return this.http.put<EditBlogPostDto>(`${this.apiBaseUrl}/api/Blog/${id}`, editBlogPost, {
      withCredentials: true
    });
  }

  deleteBlogPostById(id: string): Observable<BlogPostDto> {
    return this.http.delete<BlogPostDto>(`${this.apiBaseUrl}/api/Blog/${id}`, {
      withCredentials: true
    });
  }

}
