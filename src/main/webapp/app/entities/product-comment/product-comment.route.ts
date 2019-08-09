import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductComment } from 'app/shared/model/product-comment.model';
import { ProductCommentService } from './product-comment.service';
import { ProductCommentComponent } from './product-comment.component';
import { ProductCommentDetailComponent } from './product-comment-detail.component';
import { ProductCommentUpdateComponent } from './product-comment-update.component';
import { ProductCommentDeletePopupComponent } from './product-comment-delete-dialog.component';
import { IProductComment } from 'app/shared/model/product-comment.model';

@Injectable({ providedIn: 'root' })
export class ProductCommentResolve implements Resolve<IProductComment> {
  constructor(private service: ProductCommentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductComment> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductComment>) => response.ok),
        map((productComment: HttpResponse<ProductComment>) => productComment.body)
      );
    }
    return of(new ProductComment());
  }
}

export const productCommentRoute: Routes = [
  {
    path: '',
    component: ProductCommentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bookstoreApp.productComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductCommentDetailComponent,
    resolve: {
      productComment: ProductCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bookstoreApp.productComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductCommentUpdateComponent,
    resolve: {
      productComment: ProductCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bookstoreApp.productComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductCommentUpdateComponent,
    resolve: {
      productComment: ProductCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bookstoreApp.productComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productCommentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductCommentDeletePopupComponent,
    resolve: {
      productComment: ProductCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bookstoreApp.productComment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
