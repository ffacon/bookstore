import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProductComment } from 'app/shared/model/product-comment.model';
import { ProductCommentService } from './product-comment.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
    selector: 'jhi-product-comment-update',
    templateUrl: './product-comment-update.component.html'
})
export class ProductCommentUpdateComponent implements OnInit {
    private _productComment: IProductComment;
    isSaving: boolean;

    products: IProduct[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private productCommentService: ProductCommentService,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productComment }) => {
            this.productComment = productComment;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productComment.id !== undefined) {
            this.subscribeToSaveResponse(this.productCommentService.update(this.productComment));
        } else {
            this.subscribeToSaveResponse(this.productCommentService.create(this.productComment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductComment>>) {
        result.subscribe((res: HttpResponse<IProductComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }
    get productComment() {
        return this._productComment;
    }

    set productComment(productComment: IProductComment) {
        this._productComment = productComment;
    }
}
