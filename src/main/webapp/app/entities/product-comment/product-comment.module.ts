import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared/shared.module';
import { ProductCommentComponent } from './product-comment.component';
import { ProductCommentDetailComponent } from './product-comment-detail.component';
import { ProductCommentUpdateComponent } from './product-comment-update.component';
import { ProductCommentDeletePopupComponent, ProductCommentDeleteDialogComponent } from './product-comment-delete-dialog.component';
import { productCommentRoute, productCommentPopupRoute } from './product-comment.route';

const ENTITY_STATES = [...productCommentRoute, ...productCommentPopupRoute];

@NgModule({
  imports: [BookstoreSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductCommentComponent,
    ProductCommentDetailComponent,
    ProductCommentUpdateComponent,
    ProductCommentDeleteDialogComponent,
    ProductCommentDeletePopupComponent
  ],
  entryComponents: [ProductCommentDeleteDialogComponent]
})
export class BookstoreProductCommentModule {}
