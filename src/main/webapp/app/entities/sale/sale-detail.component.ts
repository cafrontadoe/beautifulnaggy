import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISale } from 'app/shared/model/sale.model';
import { ProductSaleService } from '../product-sale';
import { ProductSale, IProductSale } from 'app/shared/model/product-sale.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../product/product.service';
import { Product } from 'app/shared/model/product.model';

@Component({
    selector: 'jhi-sale-detail',
    templateUrl: './sale-detail.component.html'
})
export class SaleDetailComponent implements OnInit {
    sale: ISale;
    productSales: IProductSale[];
    productList: Product[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        private readonly productSaleService: ProductSaleService,
        private readonly productService: ProductService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sale }) => {
            this.sale = sale;
            this.sale.creationDateString = this.sale.creationDate.format('M/D/YYYY hh:mm:ss a');
        });
        this.getPruductSaleBySale();
    }

    getPruductSaleBySale() {
        this.productSaleService.getProductSaleListByProduct(this.sale.id).subscribe(
            (resp: any) => {
                this.productSales = resp.body;
                this.productSales.forEach(element => {
                    this.getProductById(element.idProduct, element);
                });
                console.log(this.productSales);
            },
            (error: HttpErrorResponse) => {
                throw error;
            }
        );
    }

    getProductById(idProduct: number, element: IProductSale) {
        this.productService.find(idProduct).subscribe(
            (resp: any) => {
                console.log(resp);
                element.nameProduct = resp.body.nombre;
                element.singleValue = resp.body.priceBeauty;
            },
            (error: HttpErrorResponse) => {
                throw error;
            }
        );
    }

    previousState() {
        window.history.back();
    }
}
