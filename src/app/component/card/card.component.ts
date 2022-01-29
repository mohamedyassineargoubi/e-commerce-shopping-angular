import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  total: number = 0;
  products: any = []
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.total = this.cartService.getTotalPrice();
      })
  }
  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }
  emptyCart() {
    this.cartService.removeAll()
  }

}
