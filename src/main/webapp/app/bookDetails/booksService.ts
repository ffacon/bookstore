import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, IProduct } from '../shared/model/product.model';
import { ProductService } from '../entities/product/product.service';
import { ProductCommentService } from '../entities/product-comment/product-comment.service';
import { ProductComment } from 'app/shared/model/product-comment.model';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private books: Observable<Product[]>;
  private classes = ['zero', 'one', 'two', 'three', 'four', 'five'];

  constructor(private http: HttpClient, private productService: ProductService, private productCommentService: ProductCommentService) {}

  getRatingAverage = (book: Product): number => {
    let total = 0;
    if (!book.comments) {
      return -1;
    }
    book.comments.forEach((comment: ProductComment, indice: number) => {
      if (comment.rate !== undefined) {
        total += comment.rate;
      }
    });
    return Math.floor(total / book.comments.length);
  };

  convertFromRating(rate: number): string {
    if (!rate || rate < 0 || rate > 5) {
      return undefined;
    }
    return this.classes[rate];
  }

  getRatingClass = (book: Product): string => {
    if (!book.comments) {
      return undefined;
    }
    const average = this.getRatingAverage(book);
    return 'rating ' + this.convertFromRating(average);
  };
}
