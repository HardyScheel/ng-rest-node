import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat, CatService } from '../services/cat.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  cats: Cat[];

  loading: boolean = false;
  errorMessage;

  constructor(private catService: CatService) {
  };

  ngOnInit(): void {
  }

  getAllCats() {
    this.catService.getAllCats()
      .subscribe(
        (response: Cat) => {
          console.log('response received');
          // We will get an object with an array of objects from the server.
          this.cats = response.cats;
          // this.cats = Object.keys(response);
          // this.cats = Array.of(response) // convert JSON to Array
        },
        (error) => {
          console.error('Request failed with error');
          this.errorMessage = error;
          this.loading = false;
        },
        () => {
          console.error('Request completed');
          this.loading = false;
        })
  }
}
