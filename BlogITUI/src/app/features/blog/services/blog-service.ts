import { HttpClient, httpResource, HttpResourceRef, HttpResponse } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { BlogPostDto, CreateBlogPostDto, EditBlogPostDto } from '../models/blog.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addBlogStatus = signal<'idle' | 'error' | 'success' | 'loading' >('idle');
  editBlogStatus = signal<'idle' | 'error' | 'success' | 'loading' >('idle');

  getBlogPosts(){
    return httpResource<BlogPostDto[]>(() => `${this.apiBaseUrl}/api/Blog`)
  }

  addBlogPost(blogPost: CreateBlogPostDto){
    this.addBlogStatus.set('loading')
    this.http.post<void>(`${this.apiBaseUrl}/api/Blog`, blogPost).subscribe({
      next: () => {
        this.addBlogStatus.set('success');
        console.log('Success');
      },
      error: () => {
        this.addBlogStatus.set('error');
        console.error('Error adding blog post.');
      }
    });
  }

  getBlogPostById(id: InputSignal<string | undefined>): HttpResourceRef<BlogPostDto | undefined>{
    return httpResource<BlogPostDto>(() => `${this.apiBaseUrl}/api/Blog/${id()}`);
  }

  updateBlogPostById(id: string ,editBlogPost: EditBlogPostDto){
    this.editBlogStatus.set('loading');
    this.http.put<void>(`${this.apiBaseUrl}/api/Blog/${id}`, editBlogPost).subscribe({
      next: () => {
        this.editBlogStatus.set('success');
        console.log('Success');
      },
      error: () => {
        this.editBlogStatus.set('error');
        console.error('Error adding blog post.');
      }
    });
  }

}
