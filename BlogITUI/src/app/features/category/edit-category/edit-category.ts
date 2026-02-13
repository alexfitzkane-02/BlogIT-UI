import { Component, inject, input, effect } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  categoryService = inject(CategoryService);
  router = inject(Router);

  id = input<string>();

  private categoryRef = this.categoryService.getCategoryById(this.id)
  isLoading = this.categoryRef.isLoading;
  isError = this.categoryRef.error;
  categoryResponse = this.categoryRef.value;

  editCategoryForm = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
  })

  get nameFormControl(){
    return this.editCategoryForm.controls.name;
  } 

  get urlHandleFormControl(){
    return this.editCategoryForm.controls.urlHandle;
  }

effect = effect(() => {
  this.editCategoryForm.patchValue({
    name: this.categoryResponse()?.name,
    urlHandle: this.categoryResponse()?.urlHandle
  });
});



  onSubmit(){
   const editCategoryRawValue = this.editCategoryForm.getRawValue();
   const id = this.id();

   if(id && this.editCategoryForm.valid){
    const categoryValue : EditCategoryRequest = {
      name : editCategoryRawValue.name,
      urlHandle: editCategoryRawValue.urlHandle
    }

      this.categoryService.editCategoryStatus.set('loading');
      this.categoryService.editCategoryById(this.id, categoryValue).subscribe({
        next: () => {
          this.categoryService.editCategoryStatus.set('success');
          this.router.navigate([`/admin/categories`]);
          this.categoryService.editCategoryStatus.set('idle');
        },
        error: () => {
          this.categoryService.editCategoryStatus.set('error');
          console.error('There was an error editing the cateogory.');
        } 
      });
   }
  }


  onDelete(){
    const id = this.id();

    if(id){
      this.categoryService.deleteCategoryStatus.set('loading');
      this.categoryService.deleteCategoryById(this.id).subscribe({
        next: () => {
          this.categoryService.deleteCategoryStatus.set('success');
          this.router.navigate(['admin/categories']);
          this.categoryService.deleteCategoryStatus.set('idle');
        },
        error: () => {
          this.categoryService.deleteCategoryStatus.set('error');
          console.error('Thre was an error deleting the category');
        }
      });
    }
  }
}
