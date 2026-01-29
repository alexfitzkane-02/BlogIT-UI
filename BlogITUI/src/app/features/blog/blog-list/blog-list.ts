import { Component, inject } from '@angular/core';
import { BlogService } from '../services/blog-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList {

private blogService = inject(BlogService);

private response = this.blogService.getBlogPosts();
isLoading = this.response.isLoading;
isError = this.response.error;

blogs = this.response.value;
}
