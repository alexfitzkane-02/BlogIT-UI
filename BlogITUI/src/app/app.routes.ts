import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { AuthorList } from './features/author/author-list/author-list';
import { AddAuthor } from './features/author/add-author/add-author';

export const routes: Routes = [
    {
        path: 'admin/categories',
        component: CategoryList
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
    }

];
