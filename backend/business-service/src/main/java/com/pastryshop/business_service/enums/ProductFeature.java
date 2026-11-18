package com.pastryshop.business_service.enums;
// "Has an option": the product can also be made in this variant on request.
// Whether the product itself contains an allergen is stored in Product.allergens.
public enum ProductFeature {
    VEGAN_OPTIONS,
    GLUTEN_FREE_OPTIONS,
    SUGAR_FREE_OPTIONS,
    LACTOSE_FREE_OPTIONS,
}
