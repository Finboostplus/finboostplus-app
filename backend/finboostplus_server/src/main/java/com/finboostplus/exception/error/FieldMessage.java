package com.finboostplus.exception.error;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FieldMessage {
    private String fieldName;
    private String message;
}