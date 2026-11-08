# PastryShop – Domain Model

## 1. Architecture Overview

PastryShop uses two independent backend microservices:

- **identity-service** – responsible for user registration, authentication, and account management.
- **business-service** – responsible for businesses, products, orders, reviews, and related business logic.

**Microservice communication rule:** Since users are managed by `identity-service`, `business-service` stores user IDs (e.g. `customerId`, `ownerId`) instead of creating direct JPA relationships with entities from another microservice.

## 2. User

Managed by `identity-service`.

**Responsibilities:**
- User registration and authentication.
- User profile management.
- Role-based access control.
- Providing user identity for business-related operations.

**Business rules:**
1. Users can register and authenticate.
2. Each user has an assigned role.
3. Registered users can browse businesses and their products.
4. Registered users can submit reviews.
5. A user can own one or more businesses.

## 3. Business

Represents a registered business on the platform, such as a pastry shop, bakery, or café.

**Business rules:**
1. Each business has one owner.
2. One owner can manage multiple businesses.
3. Each business has its own product catalog.
4. Products belong to exactly one business.
5. Each business has its own opening hours and location.
6. A business can have multiple images and one main image.
7. Businesses can receive reviews from registered users.
8. The business rating is calculated based on the average rating of its reviews.

**Additional decisions:**
- Images will be stored using Cloudinary.
- Opening hours will be represented using an embedded structure with days of the week and opening/closing times.
- Business features will be represented using the `BusinessFeature` enum.

Examples of `BusinessFeature`:
- `PET_FRIENDLY`
- `WHEELCHAIR_ACCESSIBLE`
- `VEGAN_OPTIONS`
- `GLUTEN_FREE_OPTIONS`
- `TAKEAWAY`

## 4. Product

Represents an individual product offered by a specific business.

**Business rules:**
1. Each product belongs to exactly one business.
2. A business can have multiple products.
3. Different businesses can offer products with the same name but different prices and characteristics.
4. Each product has its own price.
5. Products can be marked as available or unavailable.
6. Products should be marked as unavailable instead of being deleted when temporarily out of stock.
7. Each product has a main image stored through a Cloudinary URL.

Product-specific characteristics will be represented using the `ProductFeature` enum.

*Note: A separate `ProductCategory` entity has not yet been finalized.*

## 5. Order

Represents an order placed by a customer with a specific business.

**Business rules:**
1. Each order belongs to exactly one customer.
2. Each order belongs to exactly one business.
3. An order can contain multiple different products.
4. All products within an order must belong to the same business.
5. The total price is calculated from all order items.
6. Each order has a status that changes throughout the order processing lifecycle.

**Important decision:** An order cannot contain products from multiple businesses. If a customer wants to purchase products from different businesses, separate orders must be created.

## 6. OrderItem

Represents an individual product within an order.

**Business rules:**
1. Each order item belongs to exactly one order.
2. Each order item references exactly one product.
3. An order can contain multiple order items.
4. The quantity must be a positive integer.
5. The unit price is stored at the time of ordering to preserve historical prices.
6. The item subtotal is calculated by multiplying the quantity by the unit price.

**Design decision:** `OrderItem` is used instead of a simple list of products in `Order`, because each product in an order requires its own quantity and unit price.

## 7. Review

Represents a rating and optional written feedback submitted by a registered user about a business.

Reviews are displayed on the corresponding business page and contribute to its overall rating.

**Business rules:**
1. Only registered users can submit reviews.
2. Each user can have only one active review per business.
3. Reviews must contain a rating between 1 and 5 stars.
4. Written comments are optional.
5. Users can edit or delete their own reviews.
6. The business rating is calculated as the average of all its reviews.
7. Users do not need to have placed an order through the platform to submit a review. They may have visited and purchased something directly from the physical business.

**Additional decisions:**
- No separate `Comment` entity will be created.
- A unique constraint will be applied to the combination of `business_id` and `customer_id`.
- The average rating and review count will be calculated from the existing reviews.

## 8. Entity Relationships

The main relationships between the entities are:

| Relationship | Cardinality |
|---|---|
| User → Business (as owner) | 1:N |
| Business → Product | 1:N |
| Business → Review | 1:N |
| User → Review | 1:N |
| User → Order | 1:N |
| Business → Order | 1:N |
| Order → OrderItem | 1:N |
| Product → OrderItem | 1:N |

**Note:** Relationships involving `User` across microservices are maintained through IDs rather than direct JPA associations.

## 9. Enums

The following enums are planned:

- `BusinessType` – defines the type of business.
- `BusinessFeature` – defines business characteristics.
- `ProductFeature` – defines product characteristics.
- `Currency` – defines the currency used by a business.
- `OrderStatus` – defines the current order status.
- `Role` – defines user roles.

Additional enums may be introduced as the domain model evolves.

## 10. Pending Decisions

The following aspects still need to be clarified:

- **ProductCategory:** How products will be organized into categories.
- **OrderStatus:** Final order statuses and allowed transitions.
- **BusinessStatus:** Business registration and activation statuses.

---

*This document describes the current domain model and the architectural decisions made during the initial design phase. It may be updated as the project evolves.*