import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductComment } from 'app/shared/model/product-comment.model';
import { Principal } from 'app/core';
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
        private productCommentService: ProductCommentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.productCommentService.query().subscribe(
            (res: HttpResponse<IProductComment[]>) => {
                this.productComments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
