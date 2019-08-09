import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { AccountService } from 'app/core/auth/account.service';
import { NewsService } from './news.service';

@Component({
  selector: 'jhi-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit, OnDestroy {
  news: INews[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected newsService: NewsService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.newsService
      .query()
      .pipe(
        filter((res: HttpResponse<INews[]>) => res.ok),
        map((res: HttpResponse<INews[]>) => res.body)
      )
      .subscribe((res: INews[]) => {
        this.news = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
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
}
