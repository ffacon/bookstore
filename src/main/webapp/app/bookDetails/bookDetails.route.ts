import { Route, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BookDetailsComponent } from './bookDetails.component';

import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { ProductService } from '../entities/product/product.service';
import { IProduct, Product } from '../shared/model/product.model';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookResolve implements Resolve<IProduct> {
    constructor(private service: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((product: HttpResponse<Product>) => product.body));
        }
        return of(new Product());
    }
}

export const HOME_BOOK_DETAILS: Route = {
    path: 'book/:id',
    component: BookDetailsComponent,
    resolve: {
        product: BookResolve
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'bookstoreApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
};
