import { Author } from "../../author/models/author.model";
import { Category } from "../../category/models/category.model";

export interface BlogPostDto {
    id: string,
    title: string,
    description: string,
    author: Author,
    featuredImageUrl: string,
    urlHandle: string,
    categories: Category[],
    isVisible: boolean,
    createdTimeStamp: Date,
    lasteditTimeStamp: Date
}

export interface CreateBlogPostDto {
    title:string,
    description: string,
    author: string,
    featuredImageUrl: string,
    urlHandle: string,
    categories: string[],
    isVisible: boolean
}