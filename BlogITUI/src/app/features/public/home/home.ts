import { Component, inject } from '@angular/core';
import { BlogService } from '../../blog/services/blog-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private blogService = inject(BlogService);

  private blogRef = this.blogService.getBlogPosts();
  isLoading = this.blogRef.isLoading;
  isError = this.blogRef.error;
  blogResponse = this.blogRef.value;
  
}
