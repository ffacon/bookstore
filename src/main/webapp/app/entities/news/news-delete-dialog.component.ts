import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
    selector: 'jhi-news-delete-dialog',
    templateUrl: './news-delete-dialog.component.html'
})
export class NewsDeleteDialogComponent {
    news: INews;

    constructor(private newsService: NewsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.newsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'newsListModification',
                content: 'Deleted an news'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-news-delete-popup',
    template: ''
})
export class NewsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ news }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NewsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.news = news;
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
