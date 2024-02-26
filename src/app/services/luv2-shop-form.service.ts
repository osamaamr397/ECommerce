import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }
  /*we are using observable because our angular component going to subscribe to this method to get result
  of the async call
  */
  getCreditCardMonths(startMonth:number):Observable<number[]>{
    let data:number[]=[];
    //build an array for "Month" dropdown list
    //-start at currnent month and loop until 
    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);//the "of" operation from rxjs, will wrap an object as an observable

  }
  getCreditCardYears():Observable<number[]>{
    let data:number[]=[];
    //build an array for year downlist list
    //-start at current year and loop for next 10 years
    const startYear:number=new Date().getFullYear();//getFullYear this get the current year
    const endYear:number=startYear+10;
    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
