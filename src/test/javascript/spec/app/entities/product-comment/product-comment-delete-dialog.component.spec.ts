import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BookstoreTestModule } from '../../../test.module';
import { ProductCommentDeleteDialogComponent } from 'app/entities/product-comment/product-comment-delete-dialog.component';
import { ProductCommentService } from 'app/entities/product-comment/product-comment.service';

describe('Component Tests', () => {
  describe('ProductComment Management Delete Component', () => {
    let comp: ProductCommentDeleteDialogComponent;
    let fixture: ComponentFixture<ProductCommentDeleteDialogComponent>;
    let service: ProductCommentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookstoreTestModule],
        declarations: [ProductCommentDeleteDialogComponent]
      })
        .overrideTemplate(ProductCommentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCommentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCommentService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
