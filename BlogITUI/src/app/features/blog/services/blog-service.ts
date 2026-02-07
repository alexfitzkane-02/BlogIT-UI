import { HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { BlogPostDto, CreateBlogPostDto, EditBlogPostDto } from '../models/blog.models';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

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

  addBlogPost(blogPost: CreateBlogPostDto) : Observable<CreateBlogPostDto>{
    return this.http.post<CreateBlogPostDto>(`${this.apiBaseUrl}/api/Blog`, blogPost);
  }

  getBlogPostById(id: InputSignal<string | undefined>): HttpResourceRef<BlogPostDto | undefined>{
    return httpResource<BlogPostDto>(() => `${this.apiBaseUrl}/api/Blog/${id()}`);
  }

  updateBlogPostById(id: string, editBlogPost: EditBlogPostDto) : Observable<EditBlogPostDto>{
    return this.http.put<EditBlogPostDto>(`${this.apiBaseUrl}/api/Blog/${id}`, editBlogPost);
  }

}
