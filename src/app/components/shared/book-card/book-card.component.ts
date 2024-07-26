import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Book} from "../../../interfaces/book.interface";

@Component({
  selector: 'app-book-card',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {

  @Input() book!: Book;

}
