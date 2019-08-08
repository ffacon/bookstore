/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BookstoreTestModule } from '../../../test.module';
import { ProductCommentComponent } from 'app/entities/product-comment/product-comment.component';
import { ProductCommentService } from 'app/entities/product-comment/product-comment.service';
import { ProductComment } from 'app/shared/model/product-comment.model';

describe('Component Tests', () => {
  describe('ProductComment Management Component', () => {
    let comp: ProductCommentComponent;
    let fixture: ComponentFixture<ProductCommentComponent>;
    let service: ProductCommentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookstoreTestModule],
        declarations: [ProductCommentComponent],
        providers: []
      })
        .overrideTemplate(ProductCommentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCommentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCommentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductComment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productComments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
