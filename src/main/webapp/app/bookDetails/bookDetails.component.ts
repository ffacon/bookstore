import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductCommentService } from '../entities/product-comment/product-comment.service';
import { ProductService } from '../entities/product/product.service';
import { BooksService } from './booksService';
import { Observable } from 'rxjs';

@Component({
 selector: 'jhi-book-details',
 templateUrl: './bookDetails.html',
 styleUrls: ['bookDetails.css']
})
export class BookDetailsComponent implements OnInit {

 public book: IProduct;

 constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private productService: ProductService,
  private productCommentService: ProductCommentService,
  public bookService: BooksService) {}

 ngOnInit() {
  this.activatedRoute.data.subscribe(({ product }) => {
  this.book = product;
 });
}

 getImagePath(): string {
  if (!this.book) { return ''; }
  return '../../content/images/books/' + this.book.id + '.jpg';
 }

 getStarsImagePath(): string {
  if (!this.book) { return ''; }
  return '../../content/styles/ktheme/img/' + this.bookService.convertFromRating(this.bookService.getRatingAverage(this.book)) + '-stars.svg';
 }
}
