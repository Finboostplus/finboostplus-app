package com.finboostplus.DTO;

import java.time.LocalDateTime;

public record ExpenseResponseDTO(
                                 Long id,

                                 String title,

                                 String description,

                                 Double value,

                                 LocalDateTime deadlineDate,

                                 LocalDateTime createAt) {


}
