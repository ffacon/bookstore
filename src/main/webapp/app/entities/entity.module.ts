import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.BookstoreNewsModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.BookstoreProductModule)
      },
      {
        path: 'product-comment',
        loadChildren: () => import('./product-comment/product-comment.module').then(m => m.BookstoreProductCommentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookstoreEntityModule {}
