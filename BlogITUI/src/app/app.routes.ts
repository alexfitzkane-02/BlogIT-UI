import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { AuthorList } from './features/author/author-list/author-list';
import { AddAuthor } from './features/author/add-author/add-author';
import { BlogList } from './features/blog/blog-list/blog-list';
import { AddBlog } from './features/blog/add-blog/add-blog';
import { EditBlog } from './features/blog/edit-blog/edit-blog';
import { Home } from './features/public/home/home';
import { BlogDetails } from './features/public/blog-details/blog-details';
import { EditCategory } from './features/category/edit-category/edit-category';
import { EditAuthor } from './features/author/edit-author/edit-author';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blog/:urlHandle',
        component: BlogDetails
    },
    {
        path: 'admin/categories',
        component: CategoryList
    },
    {
        path: 'admin/category/edit/:id',
        component: EditCategory
    },
    {
        path: 'admin/categories/add',
        component: AddCategory
    },
    {
        path: 'admin/authors',
        component: AuthorList
    },
    {
        path: 'admin/authors/add',
        component: AddAuthor
    },
    {
        path: 'admin/authors/edit/:id',
        component: EditAuthor
    },
    {
        path: 'admin/blogs',
        component: BlogList
    },
     {
        path: 'admin/blogs/add',
        component: AddBlog
    },
    {
        path: 'admin/blogs/edit/:id',
        component: EditBlog
    }

];
