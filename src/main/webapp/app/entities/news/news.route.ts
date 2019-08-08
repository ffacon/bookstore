import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';
import { NewsDeletePopupComponent } from './news-delete-dialog.component';
import { INews } from 'app/shared/model/news.model';

@Injectable({ providedIn: 'root' })
export class NewsResolve implements Resolve<INews> {
    constructor(private service: NewsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((news: HttpResponse<News>) => news.body));
        }
        return of(new News());
    }
}

export const newsRoute: Routes = [
    {
        path: 'news',
        component: NewsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'news/:id/view',
        component: NewsDetailComponent,
        resolve: {
            news: NewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'news/new',
        component: NewsUpdateComponent,
        resolve: {
            news: NewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'news/:id/edit',
        component: NewsUpdateComponent,
        resolve: {
            news: NewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const newsPopupRoute: Routes = [
    {
        path: 'news/:id/delete',
        component: NewsDeletePopupComponent,
        resolve: {
            news: NewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bookstoreApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
