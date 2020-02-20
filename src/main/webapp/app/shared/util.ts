import $ from 'jquery';
import { NgForm } from '@angular/forms';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ElementRef } from '@angular/core';
import { IFilter } from './model/filter';
import { LoginRequest } from '@shared/model/login-request.model';
import * as CryptoJS from 'crypto-js';

export class Util {
    static readonly decryptHash = ")M&'2Jr%?7'Xuspk";
    static cookieName = '_xm_sess';

    /**
     * Encripta las credenciales ingresadas
     * @param cred objeto de loginRequest
     */
    static encryptCredentials(cred: LoginRequest): string {
        let hash = '';
        try {
            hash = CryptoJS.AES.encrypt(JSON.stringify(cred), this.decryptHash).toString();
        } catch (e) {
            console.error(e);
        }
        return hash;
    }

    /**
     * Desencripta las credenciales pasadas por parametro
     * @param creds string de credenciales en formato json
     */
    static decryptCredentials(creds: string): any {
        let obj = {};
        try {
            if (!creds) {
                return {};
            }

            obj = JSON.parse(CryptoJS.AES.decrypt(creds, this.decryptHash).toString(CryptoJS.enc.Utf8));
        } catch (e) {
            console.error(e);
        }
        return obj;
    }

    static getMonthName(date: string) {
        const monthNames = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];

        const d = new Date(date);
        return monthNames[d.getMonth()];
    }

    static downloadFile(base64: string, name: string) {
        if (this.isUrl(base64)) {
            this.createAnchor(base64, name);
        }
        const blob = this.b64toBlob(base64);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
            return;
        }

        const data = window.URL.createObjectURL(blob);
        this.createAnchor(data, name);
    }

    private static createAnchor(dataOrLink: any, name: string) {
        const link = document.createElement('a');
        document.body.appendChild(link); // firefox support
        link.href = dataOrLink;
        link.target = '_blank';
        link.download = name;
        link.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(dataOrLink);
        }, 100);
        return;
    }

    private static isUrl(str: string): boolean {
        return new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g).test(str);
    }

    private static b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    /**
     * Convierte una cadena base64 a bufferArray, esto
     * porque para poder visualizar un archivo .tif
     * se necesita en este formato
     *
     * @param base64 archivo tif en base64
     */
    static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    /**
     * Valida si un objeto por lo menos tiene una propiedad con valor
     * @param obj objeto a validar
     */
    static objectHasValue(obj: object) {
        return Object.values(obj).find((value: any) => value != '' && value !== null && value !== undefined);
    }

    static getActualDay() {
        const date = new Date();
        return {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth() + 1
        };
    }

    static getBeforeDay() {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        return {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth() + 1
        };
    }

    static scrollTop(id: string) {
        window.scrollTo(0, $(`#${id}`).offset().top - 90);
    }

    static resetForm(form: NgForm) {
        for (const obj in form.form.controls) {
            if (obj) {
                form.form.controls[obj].reset();
            }
        }
    }

    static validDate(date: Date): boolean {
        console.log(date);
        console.log(date.getUTCDate);

        const day = date.getDay;
        const year = date.getFullYear;
        const month = date.getMonth;

        // cambiamos al estandar de fecha yyyy/mm/dd (de otra forma no te podrá convertir un string a fecha de forma apropiada)
        const dateConversion = new Date(date);
        console.log(dateConversion);
        /* if (dateConversion == "Invalid Date") {
       return false;
     }
     return true; */
        return true;
    }

    /**
     * Convierte una fecha dada en string y la convierte a un objeto ngbDate
     * @param datetime datetime
     */
    static formatDateTime(datetime: string): NgbDateStruct {
        if (!datetime) {
            return null;
        }

        const splittedDateTime = datetime.split('T');
        const date = splittedDateTime[0].split('-');
        return new NgbDate(+date[0], +date[1], +date[2]);
    }

    static convertNgStructToDate(dateStruct: NgbDateStruct): Date {
        return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    }

    static setFocus(name, aForm: ElementRef) {
        const ele = aForm.nativeElement[name];
        if (ele) {
            ele.focus();
        }
    }

    /**
     *  Create Query to metadata search by (API)
     */
    static filterAccion(filter: IFilter): string {
        let filterQuery = '';

        if (filter.limit) {
            filterQuery = '?limit=' + filter.limit;
        }

        if (filter.numberPage) {
            if (filterQuery == null || filterQuery === '') {
                filterQuery = '?numberPage=' + filter.numberPage;
            } else {
                filterQuery = filterQuery + '&numberPage=' + filter.numberPage;
            }
        }

        if (filter.keyParameter != null && filter.keyParameter !== '') {
            if (filterQuery == null || filterQuery === '') {
                filterQuery = '?keyParameter=' + filter.keyParameter;
            } else {
                filterQuery = filterQuery + '&keyParameter=' + filter.keyParameter;
            }
        }

        if (filter.projectId && filter.projectId !== '') {
            if (filterQuery == null || filterQuery === '') {
                filterQuery = '?projectId=' + filter.projectId;
            } else {
                filterQuery = filterQuery + '&projectId=' + filter.projectId;
            }
        }

        if (filter.sort && filter.sort.direction !== '') {
            if (filterQuery == null || filterQuery === '') {
                filterQuery = '?sort=' + filter.sort.active + '%2B' + filter.sort.direction.toLocaleUpperCase();
            } else {
                filterQuery = filterQuery + '&sort=' + filter.sort.active + '%2B' + filter.sort.direction.toLocaleUpperCase();
            }
        } else {
            filterQuery = filterQuery + '';
        }

        return filterQuery;
    }

    static deleteElement(arrayList: any[], index: number): any[] {
        arrayList.splice(index, 1);
        return arrayList;
    }

    static integersOfNumber(numberIntegers: number, text: string): string {
        if (text.trim().indexOf('.') < 0 && text.length >= numberIntegers) {
            text = text.substr(0, numberIntegers);
        }
        return text;
    }

    /**
     * Función que valida que el keycode pasado esté entre el rango
     * esto para validar que solo acepte numeros y algunas excepciones.
     * Para revisar los keycodes https://keycode.info/
     * @param e evento keyboard
     * @param allowedCodes keycodes aceptados
     */
    static validateKeyPressInput(e: KeyboardEvent, allowedCodes: number[]) {
        if (allowedCodes.indexOf(e.keyCode) !== -1) {
            return;
        }
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }

    static filterAccionPlus(filter: IFilter, obj: any) {
        let url = '';
        // tslint:disable-next-line: forin
        for (const prop in obj) {
            url = `${url}&${prop}=${obj[prop]}`;
        }
        return `${this.filterAccion(filter)}${url}`;
    }

    static url(baseUrl: string, relativeUrl: string, filterQuery?: { [name: string]: any }): string {
        let url: string;
        url = /\/$/.test(baseUrl) ? baseUrl : `${baseUrl}/`;
        url = `${url}${relativeUrl}`;

        if (filterQuery) {
            url = `${url}?`;
            // tslint:disable-next-line: forin
            for (const name in filterQuery) {
                url = `${url}&${name}=${filterQuery[name]}`;
            }
        }
        return url;
    }
}
