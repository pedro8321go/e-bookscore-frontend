import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BookService {
 private http = inject(HttpClient);
  private dataUrl = 'data/books_source.json';

  findBook: Book | undefined


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.dataUrl)
      .pipe(
                catchError(err => of(err))
            );
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.http.get<Book[]>(this.dataUrl)
      .pipe(
        tap(resp => {
          let index = resp.findIndex((book) => book['bookId'] == id);
          if (index > -1) {
            this.findBook = resp[index];
          }
        }),
        map( resp => this.findBook),
        catchError(err => of(err))
      )
  }


}
