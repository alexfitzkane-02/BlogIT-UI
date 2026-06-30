import { Component, inject } from '@angular/core';
import { BlogService } from '../../blog/services/blog-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private blogService = inject(BlogService);

  blogRef = this.blogService.getBlogPosts();
  // isLoading = this.blogRef.isLoading;
  // isError = this.blogRef.error;
  // blogResponse = this.blogRef.value;
  
}
