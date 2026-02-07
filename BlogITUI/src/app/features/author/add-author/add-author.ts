import { Component, effect, inject } from '@angular/core';
import { AuthorService } from '../services/author-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddAuthorRequest } from '../models/author.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-author',
  imports: [ReactiveFormsModule],
  templateUrl: './add-author.html',
  styleUrl: './add-author.css',
})
export class AddAuthor {

  authorService = inject(AuthorService);
  router = inject(Router);


  //1. import reactiveformmoduels
  //2. formgroup and then these have form controls

  addAuthorFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]})
  });

  //when you submit , we need to notify the user of the errors

  get nameFormControl (){
    return this.addAuthorFormGroup.controls.name;
  }

  get urlHandleFormControl(){
    return this.addAuthorFormGroup.controls.urlHandle;
  }

  onSubmit(){
    const addAuthorFormValue = this.addAuthorFormGroup.getRawValue();

    const addAuthorDto: AddAuthorRequest = {
      name: addAuthorFormValue.name,
      urlHandle: addAuthorFormValue.urlHandle
    };

    this.authorService.addAuthorStatus.set('loading')
    this.authorService.addAuthor(addAuthorDto).subscribe({
      next: (addAuthorDto) => {
        this.authorService.addAuthorStatus.set('success');
        this.router.navigate(['/admin/authors']);
        this.authorService.addAuthorStatus.set('idle');
      },
      error: () => {
        this.authorService.addAuthorStatus.set('error');
        console.error('There was an error creating the author');
      }
    });
  }
}

