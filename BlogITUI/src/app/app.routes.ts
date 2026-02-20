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
import { Login } from './features/auth/login/login';
import { adminGuard } from './features/auth/guards/admin-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'blog/:urlHandle',
        component: BlogDetails
    },
    {
        path: 'admin/categories',
        component: CategoryList,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/category/edit/:id',
        component: EditCategory,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/categories/add',
        component: AddCategory,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/authors',
        component: AuthorList,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/authors/add',
        component: AddAuthor,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/authors/edit/:id',
        component: EditAuthor,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/blogs',
        component: BlogList,
        canActivate: [adminGuard]
    },
     {
        path: 'admin/blogs/add',
        component: AddBlog,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/blogs/edit/:id',
        component: EditBlog,
        canActivate: [adminGuard]
    }

];
