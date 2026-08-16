import { HttpClient, httpResource, HttpResourceRef, HttpResponse } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { BlogPostDto, CreateBlogPostDto, EditBlogPostDto, PagedBlogResponse } from '../models/blog.models';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  editBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');
  deleteBlogStatus = signal<'idle' | 'error' | 'success' | 'loading'>('idle');

  // tracks whether the last getBlogPosts call failed
  blogPostsError = signal<boolean>(false);
  blogPostsLoading = signal<boolean>(false);

  getBlogPosts(pageNumber = signal(1), pageSize = signal(10), search = signal(''), showAll = false) {
    this.blogPostsError.set(false);
    this.blogPostsLoading.set(true);

    const result = toSignal(
      toObservable(pageNumber).pipe(
        switchMap(page => {
          const params = new URLSearchParams({
            pageNumber: page.toString(),
            pageSize: pageSize().toString(),
          });

          if (!showAll) {
            params.set('isVisible', 'true');
          }

          if (search() !== '') {
            params.set('search', search());
          }

          return this.http.get<PagedBlogResponse>(
            `${this.apiBaseUrl}/api/Blog?${params.toString()}`
          ).pipe(
            tap(() => this.blogPostsLoading.set(false)),
            catchError(() => {
              this.blogPostsError.set(true);
              this.blogPostsLoading.set(false);
              return of(null);
            })
          );
        })
      ),
      { initialValue: null }
    );

    // return an object that matches the shape home.ts and blog-list.ts expect
    return {
      value: result,
      isLoading: this.blogPostsLoading,
      isError: this.blogPostsError,
    };
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
