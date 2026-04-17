package com.finboostplus.exception.error;

import lombok.Data;
import java.time.Instant;

@Data
public class CustomError {
    private Instant timestamp;
    private String title;
    private Integer status;
    private String message;

    public CustomError(Instant timestamp, String title, Integer status, String message) {
        this.timestamp = timestamp;
        this.title = title;
        this.status = status;
        this.message = message;
    }
}
