import {Component, inject, OnInit} from '@angular/core';
import {BookService} from "../../../services/book.service";
import {Book} from "../../../interfaces/book.interface";
import {JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{

  public bookService = inject(BookService);
  data!: Book[];

  ngOnInit(){
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe( resp =>{
      this.data = resp;
    })
  }

}
