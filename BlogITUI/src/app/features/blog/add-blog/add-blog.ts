import { Component, inject } from '@angular/core';
import { BlogService } from '../services/blog-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateBlogPostDto } from '../models/blog.models';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { AuthorService } from '../../author/services/author-service';
import { Router } from '@angular/router';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';
import { ImageSelector } from '../../../shared/image-selector/image-selector';

@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelector],
  templateUrl: './add-blog.html',
  styleUrl: './add-blog.css',
})
export class AddBlog {

  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);
  private authorService = inject(AuthorService);
  imageSelectorSerivce = inject(ImageSelectorService);
  private router = inject(Router);


  private categoriesResourceRef = this.categoryService.getallCategoires();
  categoriesResponse = this.categoriesResourceRef.value;

  private authorResourceRef = this.authorService.getAllAuthors();
  authorResponse = this.authorResourceRef.value;

  blogFormGroup = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    author: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    featuredImageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    categories: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    isVisible: new FormControl<boolean>(true, { nonNullable: true, validators: [Validators.required] })
  });

  get titleFormControl() {
    return this.blogFormGroup.controls.title;
  }

  get descriptionFormControl() {
    return this.blogFormGroup.controls.description;
  }

  get authorFormControl() {
    return this.blogFormGroup.controls.author;
  }

  get featuredImageUrlFormControl() {
    return this.blogFormGroup.controls.featuredImageUrl;
  }

  get urlHandleFormControl() {
    return this.blogFormGroup.controls.urlHandle;
  }

  get categoriesFormControl() {
    return this.blogFormGroup.controls.categories;
  }

  get isVisibleFormControl() {
    return this.blogFormGroup.controls.isVisible;
  }

  onSubmit() {
    const formRawValue = this.blogFormGroup.getRawValue();
    const createBlogPost: CreateBlogPostDto = {
      title: formRawValue.title,
      description: formRawValue.description,
      author: formRawValue.author.toString(),
      featuredImageUrl: formRawValue.featuredImageUrl,
      urlHandle: formRawValue.urlHandle,
      categories: formRawValue.categories,
      isVisible: formRawValue.isVisible
    }
    this.blogService.addBlogStatus.set('loading')
    this.blogService.addBlogPost(createBlogPost).subscribe({
      next: (createBlogPost) => {
        this.blogService.addBlogStatus.set('success');
        this.router.navigate(['/admin/blogs']);
        this.blogService.addBlogStatus.set('idle');
      },
      error: () => {
        this.blogService.addBlogStatus.set('error');
        console.error('Error adding blog post');
      }
    });
  }
}

