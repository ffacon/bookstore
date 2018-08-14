import { IProduct } from 'app/shared/model//product.model';

export interface IProductComment {
    id?: number;
    rate?: number;
    userName?: string;
    userComment?: string;
    product?: IProduct;
}

export class ProductComment implements IProductComment {
    constructor(
        public id?: number,
        public rate?: number,
        public userName?: string,
        public userComment?: string,
        public product?: IProduct
    ) {}
}
