import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, Principal, Account } from 'app/core';
import { INews } from 'app/shared/model/news.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { NewsService } from 'app/entities/news/news.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
 account: Account;
 eventSubscriber: Subscription;
 modalRef: NgbModalRef;

 message = 'Welcome in our shop!!!';
 news: INews[];
 newsOfTheDay: INews = {};
 nextNews: INews = {};
 trustedUrl: string;

    constructor(private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private newsService: NewsService) {}

    loadAll() {
        this.newsService.query().subscribe(
             (res: HttpResponse<INews[]>) => {
                            this.news = res.body;
                            // select on news as the news of the day
                            const randomInt = Math.floor(Math.random() * this.news.length);
                            console.log('randomInt:' + randomInt + '/' + this.news.length);
                            this.newsOfTheDay = this.news[randomInt];
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
        this.registerChangeInNews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    addLike(news: INews)  {
        news.likes = news.likes + 1;
        this.save(news);
}

 deleteNews(news: INews) {
        this.newsService.delete(news.id).subscribe(
            response => {
            this.eventManager.broadcast({
                name: 'newsListModification',
                content: 'Deleted an news'
            });
        });
    }

    addNews() {
        this.nextNews.likes = 0;
        this.save(this.nextNews);
    }

    save(news: INews) {
        if (news.id !== undefined) {
            this.subscribeToSaveResponse(this.newsService.update(news));
        } else {
            this.subscribeToSaveResponse(this.newsService.create(news));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INews>>) {
        result.subscribe((res: HttpResponse<INews>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.eventManager.broadcast({
            name: 'newsListModification',
            content: 'User updated'
        });
        console.log('onSaveSuccess');
    }

    private onSaveError() {
        console.log('onSaveError');
    }

    registerChangeInNews() {
    this.eventSubscriber = this.eventManager.subscribe('newsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
