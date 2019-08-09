import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductComment, ProductComment } from 'app/shared/model/product-comment.model';
import { ProductCommentService } from './product-comment.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-product-comment-update',
  templateUrl: './product-comment-update.component.html'
})
export class ProductCommentUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    rate: [],
    userName: [null, [Validators.required]],
    userComment: [null, [Validators.required]],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productCommentService: ProductCommentService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productComment }) => {
      this.updateForm(productComment);
    });
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productComment: IProductComment) {
    this.editForm.patchValue({
      id: productComment.id,
      rate: productComment.rate,
      userName: productComment.userName,
      userComment: productComment.userComment,
      product: productComment.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productComment = this.createFromForm();
    if (productComment.id !== undefined) {
      this.subscribeToSaveResponse(this.productCommentService.update(productComment));
    } else {
      this.subscribeToSaveResponse(this.productCommentService.create(productComment));
    }
  }

  private createFromForm(): IProductComment {
    return {
      ...new ProductComment(),
      id: this.editForm.get(['id']).value,
      rate: this.editForm.get(['rate']).value,
      userName: this.editForm.get(['userName']).value,
      userComment: this.editForm.get(['userComment']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductComment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
