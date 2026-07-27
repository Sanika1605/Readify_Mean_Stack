import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{
    bookForm!:FormGroup;

    get controlName() {
      return this.bookForm?.get('name');
    }

    constructor(private fb:FormBuilder,private bookService:BookService,private toastr:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.bookForm=this.fb.group({
      name:['',Validators.required],
      author:['',Validators.required],
      price:[null,[Validators.required,Validators.min(1)]],
      stockQuantity:[null,[Validators.required,Validators.min(0)]],
      category:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required]
    })
  }
  onSubmit(){
    console.log(this.bookForm);
    if(this.bookForm.valid){
      
      this.bookService.addBook(this.bookForm.value).subscribe({
        next:()=>{
          this.toastr.success('Booked added succesfully')
          this.router.navigate(['/adminviewbooks'])
        },
        error:()=>{
          this.toastr.error('Something went wrong')
        }
      })
    }
  }

  onImageSelected(event:Event):void{
    const file=(event.target as HTMLInputElement).files?.[0];
    if(file){
      const reader=new FileReader();
      reader.onload=()=>{
        const base64String=reader.result as string;
        this.bookForm.patchValue({image:base64String});
      };
      reader.readAsDataURL(file);
    }
  }
}
