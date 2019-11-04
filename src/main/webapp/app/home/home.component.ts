import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { INews } from '../shared/model/news.model';
import { JhiEventManager } from 'ng-jhipster';
import { NewsService } from '../entities/news/news.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;

  message = 'Welcome in our shop!!!';
  news: INews[];
  newsOfTheDay: INews = {};
  nextNews: INews = {};
  trustedUrl: string;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private newsService: NewsService
  ) {}

  loadAll() {
    this.newsService.query().subscribe(
      (res: HttpResponse<INews[]>) => {
        this.news = res.body;
        // select on news as the news of the day
        const randomInt = Math.floor(Math.random() * this.news.length);
        // console.log('randomInt:' + randomInt + '/' + this.news.length);
        this.newsOfTheDay = this.news[randomInt];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.loadAll();
    this.registerChangeInNews();
  }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  addLike(news: INews) {
    news.likes = news.likes + 1;
    this.save(news);
  }

  deleteNews(news: INews) {
    this.newsService.delete(news.id).subscribe(response => {
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
    // console.log('onSaveSuccess');
  }

  private onSaveError() {
    // console.log('onSaveError');
  }

  registerChangeInNews() {
    this.eventManager.subscribe('newsListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    // console.log(errorMessage, null, null);
  }
}
