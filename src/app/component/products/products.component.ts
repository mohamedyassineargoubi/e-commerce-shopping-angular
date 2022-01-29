import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: any;
  searchKey: string = "";
  filterCategory: any;
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
          if (a.category === "men's clothing" || a.category === "women's clothing") {
            a.category = "fashion";
          }
          console.log(this.productList);

        });
      })
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addTocart(product: any) {
    this.cartService.addToCart(product);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category === category || category == '') {
        return a;
      }
    })
  }
}
