import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductComment } from 'app/shared/model/product-comment.model';
import { ProductCommentService } from './product-comment.service';

@Component({
    selector: 'jhi-product-comment-delete-dialog',
    templateUrl: './product-comment-delete-dialog.component.html'
})
export class ProductCommentDeleteDialogComponent {
    productComment: IProductComment;

    constructor(
        private productCommentService: ProductCommentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productCommentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productCommentListModification',
                content: 'Deleted an productComment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-comment-delete-popup',
    template: ''
})
export class ProductCommentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productComment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductCommentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productComment = productComment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
