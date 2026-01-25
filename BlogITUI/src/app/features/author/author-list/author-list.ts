import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthorService } from '../services/author-service';

@Component({
  selector: 'app-author-list',
  imports: [RouterLink],
  templateUrl: './author-list.html',
  styleUrl: './author-list.css',
})
export class AuthorList {

  private authorService = inject(AuthorService);
  private authorResponse = this.authorService.getAllAuthors();

  isLoading = this.authorResponse.isLoading;
  isError = this.authorResponse.error;

  authors = this.authorResponse.value;

}
