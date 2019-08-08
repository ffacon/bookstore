import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INews } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
    selector: 'jhi-news-update',
    templateUrl: './news-update.component.html'
})
export class NewsUpdateComponent implements OnInit {
    private _news: INews;
    isSaving: boolean;

    constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ news }) => {
            this.news = news;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.news.id !== undefined) {
            this.subscribeToSaveResponse(this.newsService.update(this.news));
        } else {
            this.subscribeToSaveResponse(this.newsService.create(this.news));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INews>>) {
        result.subscribe((res: HttpResponse<INews>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get news() {
        return this._news;
    }

    set news(news: INews) {
        this._news = news;
    }
}
