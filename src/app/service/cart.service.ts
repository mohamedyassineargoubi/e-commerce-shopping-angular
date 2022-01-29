import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cardItemList: any = [];
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cardItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any) {
    this.cardItemList.push(product);
    this.productList.next(this.cardItemList);
    this.getTotalPrice();
    console.log(this.cardItemList)

  }
  getTotalPrice(): number {
    let total = 0;
    this.cardItemList.map((a: any) => {
      total += a.total;
    })
    return total;
  }
  removeCartItem(product: any) {
    this.cardItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cardItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cardItemList)
  }
  removeAll() {
    this.cardItemList = [];
    this.productList.next(this.cardItemList);
  }
}
