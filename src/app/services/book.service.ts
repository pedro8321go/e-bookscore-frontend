import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BookService {
 private http = inject(HttpClient);
  private dataUrl = 'data/books_source.json';


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.dataUrl)
      .pipe(
                catchError(err => of(err))
            );
  }


}
