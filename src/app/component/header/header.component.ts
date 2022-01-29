import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public totalItem = 0;
  public searchTerm: string = '';

  constructor(private cartService: CartService) {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
  }

  ngOnInit(): void {
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log("search", this.searchTerm)
    this.cartService.search.next(this.searchTerm);

  }
}
