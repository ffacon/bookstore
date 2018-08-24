import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared';
import { BookDetailsComponent } from '../bookDetails/bookDetails.component';
import { HOME_BOOK_DETAILS } from './bookDetails.route';
import { BooksService } from './booksService';
import { ProductCommentService } from '../entities/product-comment/product-comment.service';
import { ProductService } from '../entities/product/product.service';
import { BookstoreEntityModule } from '../entities/entity.module';

@NgModule({
    imports: [BookstoreSharedModule, RouterModule.forChild([HOME_BOOK_DETAILS])],
    providers: [BooksService],
    declarations: [BookDetailsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookstoreBookDetailsModule {}
