package com.ud.myapp.dto;

/**
 * Clase para encapsular datos genericos del web-api
 */
public class GenericResponseDTO {

    private ErrorDTO errorMessage;

    /**
     * Constructor sin parametros
     */
    public GenericResponseDTO() {
    }

    /**
     * Constructor
     *
     * @param errorMessage
     * @param uuidError
     */
    public GenericResponseDTO(String errorMessage, String uuidError) {
        this.errorMessage = new ErrorDTO(errorMessage, uuidError);
    }

    public GenericResponseDTO(ErrorDTO errorMessage) {
        this.errorMessage = errorMessage;
    }

    public ErrorDTO getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(ErrorDTO errorMessage) {
        this.errorMessage = errorMessage;
    }
}
