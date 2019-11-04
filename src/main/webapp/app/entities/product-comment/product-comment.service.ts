import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductComment } from 'app/shared/model/product-comment.model';

type EntityResponseType = HttpResponse<IProductComment>;
type EntityArrayResponseType = HttpResponse<IProductComment[]>;

@Injectable({ providedIn: 'root' })
export class ProductCommentService {
  public resourceUrl = SERVER_API_URL + 'api/product-comments';

  constructor(protected http: HttpClient) {}

  create(productComment: IProductComment): Observable<EntityResponseType> {
    return this.http.post<IProductComment>(this.resourceUrl, productComment, { observe: 'response' });
  }

  update(productComment: IProductComment): Observable<EntityResponseType> {
    return this.http.put<IProductComment>(this.resourceUrl, productComment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductComment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductComment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
