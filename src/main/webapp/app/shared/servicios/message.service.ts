import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Message } from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor() {}

    openSuccess(message: Message): Promise<SweetAlertResult> {
        return Swal.fire({
            title: message.title,
            text: message.text,
            type: 'success',
            timer: 4000,
            showConfirmButton: false,
            allowOutsideClick: false
        });
    }

    openSucessConfirm(message: Message): Promise<SweetAlertResult> {
        return Swal.fire({
            title: message.title,
            text: message.text,
            type: 'success',
            confirmButtonText: message.confirmButtonText,
            confirmButtonColor: '#409',
            focusCancel: false,
            allowOutsideClick: false
        });
    }

    openWarning(message: string): Promise<SweetAlertResult> {
        return Swal.fire({
            text: message,
            type: 'warning',
            showConfirmButton: true,
            allowOutsideClick: false
        });
    }

    openSuccessWithParam(message: Message, param: string) {
        Swal.fire({
            title: message.title,
            text: message.text,
            type: 'success',
            timer: 4000,
            showConfirmButton: false
        });
    }

    openSuccessInput(message: Message, placeholder: string = 'Nombre del reporte'): Promise<SweetAlertResult> {
        return Swal.fire({
            title: message.title,
            text: message.text,
            input: 'text',
            inputPlaceholder: placeholder,
            showCancelButton: true,
            focusCancel: true
        });
    }

    openError(message: Message) {
        this.fireError(message, message.text);
    }

    openGeneralConfirm(textArg: string): Promise<SweetAlertResult> {
        return Swal.fire({
            text: textArg,
            type: 'question',
            confirmButtonText: 'Si',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#409',
            focusCancel: true
        });
    }

    openDayConfirm(textArg: string): Promise<SweetAlertResult> {
        return Swal.fire({
            text: textArg,
            type: 'question',
            confirmButtonText: 'Martes',
            showCancelButton: true,
            cancelButtonText: 'Jueves',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: 'royalblue',
            focusCancel: true
        });
    }

    openConfirm(message: Message): Promise<SweetAlertResult> {
        return Swal.fire({
            title: message.title,
            text: message.text,
            type: 'warning',
            confirmButtonText: message.confirmButtonText,
            confirmButtonColor: '#409',
            focusCancel: false
        });
    }

    private fireError(message: Message, res: any) {
        Swal.fire({
            title: message.title,
            text: res,
            type: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}
