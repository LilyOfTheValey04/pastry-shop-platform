package com.pastryshop.business.service;

import com.pastryshop.business.service.enums.Allergen;
import com.pastryshop.business.service.enums.ProductCategory;
import com.pastryshop.business.service.enums.ProductFeature;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_product_business", columnList = "business_id")
})
public class Product extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;

    @Column(length = 2000)
    private String ingredients;

    @ElementCollection
    @CollectionTable(
            name = "product_allergens",
            joinColumns = @JoinColumn(name = "product_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "allergen", nullable = false)
    @Builder.Default
    private Set<Allergen> allergens = new HashSet<>();
    @Column(length = 1000)
    private String imageUrl;

    @ElementCollection
    @CollectionTable(
            name = "product_features",
            joinColumns = @JoinColumn(name = "product_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "feature", nullable = false)
    @Builder.Default
    private Set<ProductFeature> productFeatures = new HashSet<>();

    @Column(nullable = false)
    @Builder.Default
    private boolean available = true;

}