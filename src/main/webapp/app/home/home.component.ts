import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { ProductService } from 'app/entities/product/product.service';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IProduct, Product } from 'app/shared/model/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { CartService } from './cart.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    products: IProduct[];

    productSaleList: ProductSale[] = [];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private readonly productService: ProductService,
        private readonly sanitizer: DomSanitizer,
        protected jhiAlertService: JhiAlertService,
        private cartService: CartService
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.getProducts();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getProducts() {
        this.productService
            .query()
            .pipe(
                filter((res: HttpResponse<IProduct[]>) => res.ok),
                map((res: HttpResponse<IProduct[]>) => res.body)
            )
            .subscribe(
                (res: IProduct[]) => {
                    this.products = res;
                    if (this.products != null && this.products !== undefined && this.products.length > 0) {
                        this.settingImagesToHtml();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private settingImagesToHtml() {
        this.products.forEach(element => {
            const objectURL = 'data:image/jpeg;base64,' + element.image;
            //element.packaging
            element.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    managementToCart(productLocal: IProduct) {
        if (!this.isAuthenticated()) {
            this.login();
        } else {
            if (productLocal.requestCount > productLocal.available) {
                alert('la cantidad requerida es mayor a la disponible del producto ' + productLocal.nombre);
            } else {
                if (!productLocal.isAdded) {
                    if (productLocal.requestCount === 0 || productLocal.requestCount === undefined) {
                        productLocal.requestCount = 1;
                    }
                    this.addProductSale(productLocal);
                    productLocal.isAdded = true;
                } else {
                    this.dismissProduct(productLocal);
                    productLocal.isAdded = false;
                }
            }
        }
    }

    dismissProduct(product: IProduct) {
        for (let i = 0; i < this.productSaleList.length; i++) {
            if (product.codigo === this.productSaleList[i].products[0].codigo) {
                this.productSaleList.splice(i, 1);
                this.cartService.changeSaleCart(this.productSaleList);
            }
        }
    }

    private addProductSale(productLocal: any) {
        this.productSaleList.push({
            countProduct: productLocal.requestCount,
            totalProduct: productLocal.requestCount * productLocal.priceBeauty,
            products: [productLocal]
        });
        this.cartService.changeSaleCart(this.productSaleList);
    }
}
