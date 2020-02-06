import { Component, OnInit, HostBinding, OnChanges } from '@angular/core';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { CartService } from 'app/home/cart.service';
import { SaleService } from '../sale.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ISale } from 'app/shared/model/sale.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
    selector: 'jhi-sale-client',
    templateUrl: './sale-client.component.html',
    styles: []
})
export class SaleClientComponent implements OnInit, OnChanges {
    sales: ISale[];
    currentAccount: any;

    constructor(protected saleService: SaleService, protected accountService: AccountService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            console.log(this.currentAccount);
            console.log(this.currentAccount.email);
            this.loadAll();
        });
    }

    loadAll() {
        this.saleService.getSaleByEmail(this.currentAccount.email).subscribe(
            (res: any) => {
                this.sales = res.body;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
    }
    ngOnChanges() {}
}
