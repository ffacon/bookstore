import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookstoreTestModule } from '../../../test.module';
import { ProductCommentDetailComponent } from 'app/entities/product-comment/product-comment-detail.component';
import { ProductComment } from 'app/shared/model/product-comment.model';

describe('Component Tests', () => {
  describe('ProductComment Management Detail Component', () => {
    let comp: ProductCommentDetailComponent;
    let fixture: ComponentFixture<ProductCommentDetailComponent>;
    const route = ({ data: of({ productComment: new ProductComment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookstoreTestModule],
        declarations: [ProductCommentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductCommentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCommentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productComment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
