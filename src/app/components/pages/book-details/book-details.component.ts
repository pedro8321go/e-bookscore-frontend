import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {Book} from "../../../interfaces/book.interface";
import {switchMap} from "rxjs";
import {JsonPipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  book!: Book | undefined;
  ngOnInit() {
    this.route.params.pipe(
      switchMap(({bookId}) => this.bookService.getBookById(bookId)))
      .subscribe(resp => {
        if(resp){
          this.book = resp;
        }
        else {
          this.router.navigate(['/not-found'])
        }
      })

  }

  returnEvent(){
    this.router.navigate(['/books'])
  }
}
