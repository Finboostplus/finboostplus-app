package com.finboostplus.model;

import com.finboostplus.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

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

    private BigDecimal value;

    private String title;

    private String description;

    @Column(name = "deadline_date")
    private LocalDate deadlineDate;

    @Column(name = "creat_at")
    private Instant creatAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

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

    public Expense(String title, String description, BigDecimal value, Category category, Group group, LocalDate deadlineDate, Status status) {
        this.title = title;
        this.description = description;
        this.value = value;
        this.category = category;
        this.group = group;
        this.deadlineDate = deadlineDate;
        this.creatAt = Instant.now();
        this.status = status;
    }
}
