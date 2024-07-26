import {Component, inject, OnInit} from '@angular/core';
import {BookService} from "../../../services/book.service";
import {Book} from "../../../interfaces/book.interface";
import {JsonPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BookCardComponent} from "../../shared/book-card/book-card.component";
import {BookCardSkeletonComponent} from "../../shared/book-card-skeleton/book-card-skeleton.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    NgIf,
    FormsModule,
    BookCardComponent,
    BookCardSkeletonComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{

  public bookService = inject(BookService);
  books: Book[] = [];
  filteredBooks: Book[] = [];
  filterText: string = '';
  sortBy: string = 'title';
  loading = true;

  ngOnInit(){
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe( books =>{
      this.filteredBooks = books
      .filter(book => book.title.toLowerCase().includes(this.filterText) || book.editorial.toLowerCase().includes(this.filterText) || book.short_description.toLowerCase().includes(this.filterText) || book.authors.find(author => author.toLowerCase().includes(this.filterText)))
      .sort((a, b) => {
        if(this.sortBy == 'title') {
          return a['title'].localeCompare(b['title'])
        } else {
          return a['editorial'].localeCompare(b['editorial'])
        }
      });
    })
    this.loading = false;
  }

  applyFilterAndSort(): void {
    this.getAllBooks();
    if(this.filterText.length > 0) {
      this.filteredBooks = this.books
      .filter(book => book.title.toLowerCase().includes(this.filterText) || book.editorial.toLowerCase().includes(this.filterText) || book.short_description.toLowerCase().includes(this.filterText) || book.authors.find(author => author.toLowerCase().includes(this.filterText)))
      .sort((a, b) => {
        if(this.sortBy == 'title') {
          return a['title'].localeCompare(b['title'])
        } else {
          return a['editorial'].localeCompare(b['editorial'])
        }

      });
    }

  }

  onFilterValueChanged(filterText: string) {
    this.filterText = filterText.toLowerCase().trim();
    this.getAllBooks();
  }

  onSortByChanged(value: string) {
    this.sortBy = value;
    this.getAllBooks();
  }


}
