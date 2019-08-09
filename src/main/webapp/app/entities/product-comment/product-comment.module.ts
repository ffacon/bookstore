import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookstoreProductCommentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
