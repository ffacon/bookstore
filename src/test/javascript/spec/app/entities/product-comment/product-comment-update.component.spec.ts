import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BookstoreTestModule } from '../../../test.module';
import { ProductCommentUpdateComponent } from 'app/entities/product-comment/product-comment-update.component';
import { ProductCommentService } from 'app/entities/product-comment/product-comment.service';
import { ProductComment } from 'app/shared/model/product-comment.model';

describe('Component Tests', () => {
  describe('ProductComment Management Update Component', () => {
    let comp: ProductCommentUpdateComponent;
    let fixture: ComponentFixture<ProductCommentUpdateComponent>;
    let service: ProductCommentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookstoreTestModule],
        declarations: [ProductCommentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductCommentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCommentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCommentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductComment(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductComment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
