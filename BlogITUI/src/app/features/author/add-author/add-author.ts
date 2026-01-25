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

 
  //use effect signal to watch the status of the api request. effects can not be used outside of constructor
  constructor() {
    effect(() => {
      if(this.authorService.addAuthorStatus() === 'success'){
        //console.log('Success');
        this.authorService.addAuthorStatus.set('idle');
        this.router.navigate(['/admin/authors']);
      }
      if(this.authorService.addAuthorStatus() === 'error'){
        console.error('Add Author Request Failed');
      }
    })
  }

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

    this.authorService.addAuthor(addAuthorDto);
  }
}
