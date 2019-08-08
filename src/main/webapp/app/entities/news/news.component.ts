import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { Principal } from 'app/core';
import { NewsService } from './news.service';

@Component({
    selector: 'jhi-news',
    templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
    news: INews[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private newsService: NewsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.newsService.query().subscribe(
            (res: HttpResponse<INews[]>) => {
                this.news = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INews) {
        return item.id;
    }

    registerChangeInNews() {
        this.eventSubscriber = this.eventManager.subscribe('newsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
