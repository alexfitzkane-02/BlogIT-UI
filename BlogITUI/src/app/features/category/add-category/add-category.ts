import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  private router = inject(Router);

  private categoryService = inject(CategoryService);
  //1. import reactiveformmoduels
  //2. formgroup and then these have form controls

  //create formgroup
  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
  });

  //when you submit the form, we need to notify the user of the errors
  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name;
  }

    get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  //when the form is submitted
  onSubmit() {
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle
    };

    this.categoryService.addCategoryStatus.set('loading');
    this.categoryService.addCategory(addCategoryRequestDto).subscribe({
      next: (addCategoryRequestDto) => {
        this.categoryService.addCategoryStatus.set('success');
        this.router.navigate(['/admin/categories']);
        this.categoryService.addCategoryStatus.set('idle');
      },
      error: () => {
        this.categoryService.addCategoryStatus.set('error');
        console.error('Error creating category');
      }
    });
  }
}
