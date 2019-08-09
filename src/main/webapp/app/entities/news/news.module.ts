import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';
import { NewsDeletePopupComponent, NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { newsRoute, newsPopupRoute } from './news.route';

const ENTITY_STATES = [...newsRoute, ...newsPopupRoute];

@NgModule({
  imports: [BookstoreSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsDeletePopupComponent],
  entryComponents: [NewsDeleteDialogComponent]
})
export class BookstoreNewsModule {}
