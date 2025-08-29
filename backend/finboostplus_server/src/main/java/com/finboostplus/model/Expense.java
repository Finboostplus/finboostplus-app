package com.finboostplus.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@SequenceGenerator(name = "seq_expense", sequenceName = "seq_expense", allocationSize = 1, initialValue = 1)
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_expense")
    private Long id;

    private Double value;

    private String title;

    private String description;

    @Column(name = "deadline_date")
    private LocalDateTime deadlineDate;

    @Column(name = "creat_at")
    private LocalDateTime creatAt; // Talvez mudar para instant

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "group_id")

    private Group group;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Expense)) return false;
        Expense that = (Expense) o;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
