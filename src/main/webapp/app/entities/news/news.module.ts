import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared';
import {
    NewsComponent,
    NewsDetailComponent,
    NewsUpdateComponent,
    NewsDeletePopupComponent,
    NewsDeleteDialogComponent,
    newsRoute,
    newsPopupRoute
} from './';

const ENTITY_STATES = [...newsRoute, ...newsPopupRoute];

@NgModule({
    imports: [BookstoreSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsDeletePopupComponent],
    entryComponents: [NewsComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookstoreNewsModule {}
