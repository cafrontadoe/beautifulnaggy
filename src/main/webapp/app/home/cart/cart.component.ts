import { Component, OnInit, ChangeDetectorRef, HostBinding, OnChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductSale } from 'app/shared/model/product-sale.model';
import { SweetAlertResult } from 'sweetalert2';
import { MessageService } from 'app/shared/servicios/message.service';
import { IDaysend } from './day.send.model';
import { SaleService } from 'app/entities/sale/sale.service';
import { ISale } from 'app/shared/model/sale.model';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AccountService } from 'app/core/auth/account.service';
import { UserClientService } from 'app/entities/user-client/user-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const OFFSET_HEIGHT = 170;
const PRODUCT_HEIGHT = 48;

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
    @HostBinding('class.is-open')
    productSaleList: ProductSale[];
    numProducts = 0;
    totalCost = 0;

    products: any[] = [];
    animatePlop = false;
    animatePopout = false;
    expanded = false;
    expandedHeight: string;
    cartTotal = 0;
    inherit: string;

    changeDetectorRef: ChangeDetectorRef;
    dayList: IDaysend[] = [{ id: 1, name: 'Martes' }, { id: 2, name: 'Jueves' }];
    selectDay: IDaysend;

    sale: ISale = {};
    currentAccount: any;
    modalRef: NgbModalRef;

    constructor(
        private cartService: CartService,
        private readonly messageService: MessageService,
        private readonly saleService: SaleService,
        private readonly accountService: AccountService,
        private readonly userClientService: UserClientService,
        private readonly loginModalService: LoginModalService
    ) {}

    ngOnInit() {
        console.log('llega a sale Client');
        this.expandedHeight = '0';
        this.cartService.change.subscribe(productSaleList => {
            this.productSaleList = productSaleList;

            console.log('=====>this.productSaleList');
            console.log(this.productSaleList);
            this.onEventSale();
            this.getCurrentAccount();

            // Make a plop animation
            if (this.numProducts > 0) {
                this.animatePlop = true;
                /*   setTimeout(() => {
  this.animatePlop = false;
}, 160); */
            } else if (this.numProducts === 0) {
                this.animatePopout = true;
                setTimeout(() => {
                    this.animatePopout = false;
                }, 300);
            }
            this.expandedHeight = this.productSaleList.length * PRODUCT_HEIGHT + OFFSET_HEIGHT + 'px';
            if (!this.productSaleList.length) {
                this.expanded = false;
            }
        });
    }

    getCurrentAccount() {
        this.accountService.identity(false).then(account => {
            this.currentAccount = account;
            console.log('this.currentAccount');
            console.log(this.currentAccount);
            this.getUserBusisness();
        });
    }

    getUserBusisness() {
        if (this.currentAccount != null && this.currentAccount !== undefined && this.currentAccount.email) {
            this.userClientService.findByEmail(this.currentAccount.email).subscribe(
                (res: any) => {
                    console.log('===>res');
                    console.log(res);
                    this.sale.userClient = res.body[0];
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                }
            );
        } else {
            this.modalRef = this.loginModalService.open();
        }
    }

    ngOnChanges() {}

    onEventSale() {
        this.numProducts = 0;
        this.productSaleList.forEach(element => {
            this.numProducts = this.numProducts + element.countProduct;

            this.totalCost = (this.totalCost + element.product.priceBeauty) * element.countProduct;
        });
        console.log(this.numProducts);
    }

    onCartClick() {
        this.expanded = !this.expanded;
    }

    sendRequest(event: any) {
        this.messageService.openDayConfirm('que día deseas recibir tu pedido?').then((value: SweetAlertResult) => {
            console.log(value);
            if (value.value) {
                this.sale.description = 'martes';
                this.setSaleObj();
            } else {
                this.sale.description = 'jueves';
                this.setSaleObj();
            }
        });
    }

    setSaleObj() {
        this.sale.creationDate = moment(DATE_TIME_FORMAT);
        console.log(this.sale.creationDate);
        this.sale.discount = 0;
        this.sale.iva = 0;
        this.sale.productSales = this.productSaleList;
        this.sale.total = this.totalCost;
        this.sale.totalCost = this.sale.total;
        console.log('this.sale');
        console.log(this.sale);

        //    this.sale.userClient
        this.callServiceSaveSale();
    }

    callServiceSaveSale() {
        this.saleService.create(this.sale).subscribe(
            (res: any) => {
                console.log(res);
                this.messageService.openSucessConfirm({
                    title: 'El Pedido fue registrado exitosamente.',
                    text: 'podras ver los detalles de tus pedido en la opción de menú "Mis pedidos" ',
                    confirmButtonText: 'Aceptar'
                });
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
}
