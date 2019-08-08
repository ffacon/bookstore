import { IProductComment } from 'app/shared/model/product-comment.model';

export interface IProduct {
  id?: number;
  name?: string;
  author?: string;
  price?: string;
  description?: string;
  category?: string;
  isNew?: boolean;
  mainPicture?: string;
  comments?: IProductComment[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public author?: string,
    public price?: string,
    public description?: string,
    public category?: string,
    public isNew?: boolean,
    public mainPicture?: string,
    public comments?: IProductComment[]
  ) {
    this.isNew = this.isNew || false;
  }
}
