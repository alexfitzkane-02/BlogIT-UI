import { Component, computed, inject, signal } from '@angular/core';
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

  pageNumber = signal(1);
  pageSize = signal(10);

  private response = this.blogService.getBlogPosts(this.pageNumber, this.pageSize, signal(''), true);
  isLoading = this.response.isLoading;
  isError = this.response.isError;

  blogs = computed(() => this.response.value()?.data ?? []);
  totalPages = computed(() => this.response.value()?.totalPages ?? 0);
  totalCount = computed(() => this.response.value()?.totalCount ?? 0);

  nextPage() {
    if (this.pageNumber() < this.totalPages()) {
      this.pageNumber.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.pageNumber() > 1) {
      this.pageNumber.update(p => p - 1);
    }
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize.set(Number(value));
    this.pageNumber.set(1); // reset to page 1 when page size changes
  }
}
