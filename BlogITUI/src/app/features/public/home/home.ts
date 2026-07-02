import { Component, computed, inject, signal } from '@angular/core';
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

  pageNumber = signal(1);
  pageSize = signal(3); // 6 looks nicer in a 3-column card grid

  blogRef = this.blogService.getBlogPosts(this.pageNumber, this.pageSize);
  isLoading = this.blogRef.isLoading;
  isError = this.blogRef.error;

  blogs = computed(() => this.blogRef.value()?.data ?? []);
  totalPages = computed(() => this.blogRef.value()?.totalPages ?? 0);
  totalCount = computed(() => this.blogRef.value()?.totalCount ?? 0);

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
    this.pageNumber.set(1);
  }
}
