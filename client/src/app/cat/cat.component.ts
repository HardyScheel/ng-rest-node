import { Component, OnInit } from '@angular/core';
import { Cat, CatService } from '../services/cat.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  Cat: Cat;
  catName: string = 'keine Katze';

  constructor(private catService: CatService){
    this.Cat = this.catService.getCat("lucy");
    // ToDo: this.catName = this.Cat.name;
  };

  ngOnInit(): void {
  }
}
