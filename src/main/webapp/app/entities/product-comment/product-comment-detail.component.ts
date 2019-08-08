import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductComment } from 'app/shared/model/product-comment.model';

@Component({
  selector: 'jhi-product-comment-detail',
  templateUrl: './product-comment-detail.component.html'
})
export class ProductCommentDetailComponent implements OnInit {
  productComment: IProductComment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productComment }) => {
      this.productComment = productComment;
    });
  }

  previousState() {
    window.history.back();
  }
}
