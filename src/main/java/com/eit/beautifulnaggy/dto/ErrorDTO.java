package com.ud.myapp.dto;

/**
 * DTO que encapsula los mensajes en caso de error
 */
public class ErrorDTO {

    private String errorMessage;

    private String uuidError;

    /**
     * Constructor sin parametros
     */
    public ErrorDTO() {
    }

    public ErrorDTO(String errorMessage, String uuidError) {
        this.errorMessage = errorMessage;
        this.uuidError = uuidError;
    }

    public ErrorDTO(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getUuidError() {
        return uuidError;
    }

    public void setUuidError(String uuidError) {
        this.uuidError = uuidError;
    }
}
