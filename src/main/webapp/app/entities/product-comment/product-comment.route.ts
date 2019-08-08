import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productComment: HttpResponse<ProductComment>) => productComment.body));
        }
        return of(new ProductComment());
    }
}

export const productCommentRoute: Routes = [
    {
        path: 'product-comment',
        component: ProductCommentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.productComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-comment/:id/view',
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
        path: 'product-comment/new',
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
        path: 'product-comment/:id/edit',
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
        path: 'product-comment/:id/delete',
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
