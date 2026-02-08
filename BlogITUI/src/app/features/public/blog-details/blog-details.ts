import { Component, inject, input, InputSignal } from '@angular/core';
import { BlogService } from '../../blog/services/blog-service';
import { MarkdownComponent } from 'ngx-markdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [MarkdownComponent, DatePipe],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {

  urlHandle = input<string | undefined>();

  private blogService = inject(BlogService);
  
  private blogRef = this.blogService.getBlogPostByUrlHandle(this.urlHandle);
  isLoading = this.blogRef.isLoading;
  isError = this.blogRef.error;
  blogResponse = this.blogRef.value;

}
