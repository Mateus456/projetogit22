import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  informationdb: any[];
  automaticClose = false;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/items', httpOptions).subscribe((res:any) => {
      this.informationdb = res;
    });
  }

 toggleSection(index) {
   this.informationdb[index].open = !this.informationdb[index].open;

   if (this.automaticClose &&  this.informationdb[index].open )  {
     this.informationdb
     .filter ((item, itemIndex) => itemIndex != index)
     .map(item => item.open = false);
   }
 }

 toggleItem(index, childIndex){
  this.informationdb[index].children[childIndex].open = !this.informationdb[index].children[childIndex].open;
 }
}