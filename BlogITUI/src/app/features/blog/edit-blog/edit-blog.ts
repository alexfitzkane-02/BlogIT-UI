import { Component, effect, inject, input } from '@angular/core';
import { BlogService } from '../services/blog-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { AuthorService } from '../../author/services/author-service';
import { CategoryService } from '../../category/services/category-service';
import { EditBlogPostDto } from '../models/blog.models';
import { Router } from '@angular/router';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';
import { ImageSelector } from '../../../shared/image-selector/image-selector';

@Component({
  selector: 'app-edit-blog',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelector],
  templateUrl: './edit-blog.html',
  styleUrl: './edit-blog.css',
})
export class EditBlog {

  id = input<string>();
  private blogService = inject(BlogService);
  private authorService = inject(AuthorService);
  private categoryService = inject(CategoryService);
  imageSelectorService = inject(ImageSelectorService);
  private router = inject(Router);

  private blogRef = this.blogService.getBlogPostById(this.id);
  isLoadingBlog = this.blogRef.isLoading;
  errorBlog = this.blogRef.error;
  blogResponse = this.blogRef.value;

  private authRef = this.authorService.getAllAuthors();
  isLoadingAuthor = this.authRef.isLoading;
  errorAuthor = this.authRef.error;
  authorResponse = this.authRef.value;

  private categoryRef = this.categoryService.getallCategoires();
  isLoadingCat = this.categoryRef.isLoading;
  errorCat = this.categoryRef.error;
  categoriesResponse = this.categoryRef.value;

  editFormGroup = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    author: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    featuredImageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    categories: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] }),
    isVisible: new FormControl<boolean>(true, { nonNullable: true, validators: [Validators.required] })
  });


  get titleFormControl() {
    return this.editFormGroup.controls.title;
  }

  get descriptionFormControl() {
    return this.editFormGroup.controls.description;
  }

  get authorFormControl() {
    return this.editFormGroup.controls.author;
  }

  get featuredImageUrlFormControl() {
    return this.editFormGroup.controls.featuredImageUrl;
  }

  get urlHandleFormControl() {
    return this.editFormGroup.controls.urlHandle;
  }

  get categoriesFormControl() {
    return this.editFormGroup.controls.categories;
  }

  get isVisibleFormControl() {
    return this.editFormGroup.controls.isVisible;
  }

  effect = effect(() => {
    this.editFormGroup.patchValue({
      title: this.blogResponse()?.title,
      description: this.blogResponse()?.description,
      author: this.blogResponse()?.author?.id,
      featuredImageUrl: this.blogResponse()?.featuredImageUrl,
      urlHandle: this.blogResponse()?.urlHandle,
      categories: this.blogResponse()?.categories.map(x => x.id),
      isVisible: this.blogResponse()?.isVisible
    })
  });

  selectedImageEffectRef = effect(() => {
    const selectedImageUrl = this.imageSelectorService.selectedImage();
    if (selectedImageUrl) {
      this.editFormGroup.patchValue({
        featuredImageUrl: selectedImageUrl,
      });
    }
  });


  onSubmit() {
    const id = this.id();

    if (id && this.editFormGroup.valid) {
      const formRawValue = this.editFormGroup.getRawValue();

      const blogPost: EditBlogPostDto = {
        title: formRawValue.title,
        description: formRawValue.description,
        author: formRawValue.author,
        featuredImageUrl: formRawValue.featuredImageUrl,
        urlHandle: formRawValue.urlHandle,
        categories: formRawValue.categories ?? [],
        isVisible: formRawValue.isVisible,
        lasteditTimeStamp: new Date()
      }
      this.blogService.editBlogStatus.set('loading');
      this.blogService.updateBlogPostById(id, blogPost).subscribe({
        next: (updateBlogPostById) => {
          this.blogService.editBlogStatus.set('success');
          this.router.navigate(['/admin/blogs']);
          this.blogService.editBlogStatus.set('idle');
        },
        error: () => {
          this.blogService.editBlogStatus.set('error');
          console.error('Edit Blog Request Failed');
        }
      });
    }
  }

  onDelete() {
    const id = this.id();

    if (id) {
      this.blogService.deleteBlogStatus.set('loading');
      this.blogService.deleteBlogPostById(id).subscribe({
        next: () => {
          this.blogService.deleteBlogStatus.set('success');
          this.router.navigate(['/admin/blogs']);
          this.blogService.deleteBlogStatus.set('idle');
        },
        error: () => {
          this.blogService.deleteBlogStatus.set('error');
          console.error('There was an error deleting the blog post');
        }
      });
    }
  }
  openImageSelector() {
    this.imageSelectorService.dispalyImageSelector();
  }
}