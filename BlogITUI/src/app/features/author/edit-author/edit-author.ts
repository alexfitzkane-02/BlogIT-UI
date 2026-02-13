import { Component, effect, inject, input } from '@angular/core';
import { AuthorService } from '../services/author-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate, validateTree } from '@angular/forms/signals';
import { EditAuthorRequest } from '../models/author.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-author.html',
  styleUrl: './edit-author.css',
})
export class EditAuthor {

  authorService = inject(AuthorService);
  router = inject(Router);

  id = input<string>();

  authorRef = this.authorService.getAuthorById(this.id);
  isLoadingAuthorRef = this.authorRef.isLoading;
  isErrorAuthorRef = this.authorRef.error;
  author = this.authorRef.value;

  editAuthorFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]})
  })

  get nameFormControl(){
    return this.editAuthorFormGroup.controls.name;
  }

  get urlHandleFormControl(){
    return this.editAuthorFormGroup.controls.urlHandle;
  }

  effect = effect(() => {
    this.editAuthorFormGroup.patchValue({
      name: this.author()?.name,
      urlHandle: this.author()?.urlHandle
    });
  });

  onSubmit(){
    const id = this.id();
    const rawAuthor = this.editAuthorFormGroup.getRawValue();

    const updatedAuthor: EditAuthorRequest = {
      name: rawAuthor.name,
      urlHandle: rawAuthor.urlHandle
    }

    if(id && this.editAuthorFormGroup.valid){
      this.authorService.editAuthorStatus.set('loading');
      this.authorService.editAuthorById(this.id, updatedAuthor).subscribe({
        next: () => {
          this.authorService.editAuthorStatus.set('success');
          this.router.navigate(['/admin/authors']);
          this.authorService.editAuthorStatus.set('idle');
        },
        error: () => {
          this.authorService.editAuthorStatus.set('error');
          console.error('There was an error editing this author.')
        }
      });
    }
  }

  onDelete(){
    const id = this.id()

    if(id){
      this.authorService.deleteAuthorStatus.set('loading');
      this.authorService.deleteAuthorById(this.id).subscribe({
        next: () => {
          this.authorService.deleteAuthorStatus.set('success');
          this.router.navigate(['/admin/authors']);
          this.authorService.deleteAuthorStatus.set('loading');
        },
        error: () => {
          this.authorService.deleteAuthorStatus.set('error');
          console.error('There was an error deleting the author.')
        }
      });
    }
  }
}
