import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared';
import {
    ProductCommentComponent,
    ProductCommentDetailComponent,
    ProductCommentUpdateComponent,
    ProductCommentDeletePopupComponent,
    ProductCommentDeleteDialogComponent,
    productCommentRoute,
    productCommentPopupRoute
} from './';

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
    entryComponents: [
        ProductCommentComponent,
        ProductCommentUpdateComponent,
        ProductCommentDeleteDialogComponent,
        ProductCommentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookstoreProductCommentModule {}
