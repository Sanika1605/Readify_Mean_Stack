
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-admin-view-books',
  templateUrl: './admin-view-books.component.html',
  styleUrls: ['./admin-view-books.component.css']
})
export class AdminViewBooksComponent implements OnInit {

  @ViewChild('closeModalButton') closeModalBtn!: ElementRef;

  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  selectedBook: Book = {
    name: '',
    author: '',
    price: 0,
    stockQuantity: 0,
    category: '',
    image: '',
    description: ''
  }
  constructor(private bookService: BookService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.fetchBooks();
  }
  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe((value) => {
      this.books = value;
      this.extractUniqueCategories();
      this.applyFilters();
    });
  }
  extractUniqueCategories(): void {
    const categorySet = new Set(this.books.map(book => book.category));
    this.categories = Array.from(categorySet);
  }
  applyFilters(): void {
    this.filteredBooks = this.books.filter(book => {
      const matchesName = book.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? book.category === this.selectedCategory : true;
      return matchesName && matchesCategory;
    });
    if (this.sortBy === 'price') {
      this.filteredBooks.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'stock') {
      this.filteredBooks.sort((a, b) => a.stockQuantity - b.stockQuantity);
    }
  }
  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }
  onCategoryChange(value: string): void {
    this.selectedCategory = value;
    this.applyFilters();
  }
  onSortChange(value: string): void {
    this.sortBy = value;
    this.applyFilters();
  }
  deleteBook(id?: string) {
    if (!id) {
      return;
    }
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.toastr.success('Book deleted successfully')
        this.fetchBooks();
      },
      error: () => {
        this.toastr.error('Something went wrong')
      }
    })
  }

  openUpdateModal(book: Book): void {
    this.selectedBook = { ...book }
  }
  submitUpdateBook(): void {
    this.updateBook(this.selectedBook)
  }

  updateBook(book: Book) {
    this.bookService.updateBook(book).subscribe({
      next: () => {
        this.toastr.success('Book updated successfully')
        this.fetchBooks();
        this.closeModalBtn.nativeElement.click();
      },
      error: () => {
        this.toastr.error('Something went wrong')
      }
    })
  }

  onImageSelected(event:Event):void{
    const file=(event.target as HTMLInputElement).files?.[0];
    if(file){
      const reader=new FileReader();
      reader.onload=()=>{
        // const base64String=reader.result as string;
        this.selectedBook.image=reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Book } from 'src/app/models/book.model';
// import { BookService } from 'src/app/services/book.service';

// @Component({
//   selector: 'app-admin-view-books',
//   templateUrl: './admin-view-books.component.html',
//   styleUrls: ['./admin-view-books.component.css']
// })
// export class AdminViewBooksComponent implements OnInit{
//   books:Book[]=[];
//   filteredBooks:Book[];
//   constructor(private bookService:BookService){}
//   ngOnInit(): void {
//     this.fetchBooks()
//     console.log("inn",this.books);
//   }
//   fetchBooks():void{
//     this.bookService.getAllBooks().subscribe((value)=>{
//       this.books=value;
//       console.log(this.books);
//     })
//   }
//   sample(){

//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Book } from 'src/app/models/book.model';
// import { BookService } from 'src/app/services/book.service';

// @Component({
//   selector: 'app-admin-view-books',
//   templateUrl: './admin-view-books.component.html',
//   styleUrls: ['./admin-view-books.component.css']
// })
// export class AdminViewBooksComponent implements OnInit {
//   books: Book[] = [];
//   filteredBooks: Book[] = [];
//   searchTerm: string = '';
//   selectedCategory: string = '';
//   sortBy: string = '';

//   constructor(private bookService: BookService) { }

//   ngOnInit(): void {
//     this.fetchBooks();
//   }

//   fetchBooks(): void {
//     this.bookService.getAllBooks().subscribe((value) => {
//       this.books = value;
//       this.applyFilters();
//     });
//   }

//   applyFilters(): void {
//     this.filteredBooks = this.books.filter(book => {
//       const matchesName = book.name.toLowerCase().includes(this.searchTerm.toLowerCase());
//       const matchesCategory = this.selectedCategory ? book.category === this.selectedCategory : true;
//       return matchesName && matchesCategory;
//     });

//     if (this.sortBy === 'price') {
//       this.filteredBooks.sort((a, b) => a.price - b.price);
//     } else if (this.sortBy === 'stock') {
//       this.filteredBooks.sort((a, b) => a.stockQuantity - b.stockQuantity);
//     }
//   }

//   onSearchChange(value: string): void {
//     this.searchTerm = value;
//     this.applyFilters();
//   }

//   onCategoryChange(value: string): void {
//     this.selectedCategory = value;
//     this.applyFilters();
//   }

//   onSortChange(value: string): void {
//     this.sortBy = value;
//     this.applyFilters();
//   }
// }