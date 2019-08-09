import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductComment } from 'app/shared/model/product-comment.model';
import { AccountService } from 'app/core';
import { ProductCommentService } from './product-comment.service';

@Component({
  selector: 'jhi-product-comment',
  templateUrl: './product-comment.component.html'
})
export class ProductCommentComponent implements OnInit, OnDestroy {
  productComments: IProductComment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected productCommentService: ProductCommentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.productCommentService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductComment[]>) => res.ok),
        map((res: HttpResponse<IProductComment[]>) => res.body)
      )
      .subscribe(
        (res: IProductComment[]) => {
          this.productComments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProductComments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductComment) {
    return item.id;
  }

  registerChangeInProductComments() {
    this.eventSubscriber = this.eventManager.subscribe('productCommentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
