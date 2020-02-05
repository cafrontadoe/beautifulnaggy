/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SaleService } from 'app/entities/sale/sale.service';
import { ISale, Sale } from 'app/shared/model/sale.model';

describe('Service Tests', () => {
    describe('Sale Service', () => {
        let injector: TestBed;
        let service: SaleService;
        let httpMock: HttpTestingController;
        let elemDefault: ISale;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(SaleService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Sale(0, currentDate, 0, 'AAAAAAA', currentDate, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        managementDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Sale', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        managementDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        managementDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Sale(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Sale', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        total: 1,
                        description: 'BBBBBB',
                        managementDate: currentDate.format(DATE_TIME_FORMAT),
                        totalCost: 1,
                        iva: 1,
                        discount: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        managementDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Sale', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        total: 1,
                        description: 'BBBBBB',
                        managementDate: currentDate.format(DATE_TIME_FORMAT),
                        totalCost: 1,
                        iva: 1,
                        discount: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        managementDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Sale', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
