package com.pastryshop.business_service;

import com.pastryshop.business_service.enums.BusinessFeature;
import com.pastryshop.business_service.enums.BusinessType;
import com.pastryshop.business_service.enums.Currency;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "businesses", indexes = {
        @Index(name = "idx_business_city", columnList = "city"),
        @Index(name = "idx_business_type", columnList = "business_type"),
        @Index(name = "idx_business_owner", columnList = "owner_id")
})
public class Business extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 10, scale = 7)
    private BigDecimal longitude;

    private String phone;

    @Column(length = 1000)
    private String coverImageUrl;

    @ElementCollection
    @CollectionTable(
            name = "business_images",
            joinColumns = @JoinColumn(name = "business_id")
    )
    @Column(name = "image_url", nullable = false)
    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Currency currency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusinessType businessType;

    @ElementCollection
    @CollectionTable(
            name = "business_features",
            joinColumns = @JoinColumn(name = "business_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "feature", nullable = false)
    @Builder.Default
    private Set<BusinessFeature> businessFeatures = new HashSet<>();

    @ElementCollection
    @CollectionTable(
            name = "business_opening_hours",
            joinColumns = @JoinColumn(name = "business_id")
    )
    @Builder.Default
    private List<BusinessOpeningHours> openingHours = new ArrayList<>();

    @Column(nullable = false)
    @Builder.Default
    private String timezone = "Europe/Sofia";

    // Reservations: totalSeats == null or 0 means, that the business does not accept reservations
    private Integer totalSeats;

    @Column(nullable = false)
    @Builder.Default
    private int reservationDurationMinutes = 90;

    @Version
    private Long version;
}
