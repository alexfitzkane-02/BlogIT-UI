import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BlogPostDto, CreateBlogPostDto } from '../models/blog.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addBlogStatus = signal<'idle' | 'error' | 'success' | 'loading' >('idle');

  getBlogPosts(){
    return httpResource<BlogPostDto[]>(() => `${this.apiBaseUrl}/api/Blog/blogs`)
  }

  addBlogPost(blogPost: CreateBlogPostDto){
    this.addBlogStatus.set('loading')
    this.http.post<void>(`${this.apiBaseUrl}/api/Blog/blog`, blogPost).subscribe({
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



}
