# Product Requirements Document: Premium Khajoor E-commerce Experience

**Working project name:** Nakhla Dates  
**Document version:** 1.0  
**Status:** Build-ready product and technical specification  
**Prepared from:** Deep analysis of the supplied 3:49 reference video  
**Primary market assumption:** India, INR pricing, pan-India delivery  
**Primary experience:** Premium, motion-led, responsive direct-to-consumer khajoor store  

> “Nakhla Dates” is a temporary brand name chosen so the design system can be specified completely. It must remain configurable and can be replaced with the final brand name without redesigning the product.

---

## 1. Executive Summary

Build a production-ready e-commerce website for premium khajoor that recreates the reference video's most valuable interaction pattern and visual rhythm while using an original khajoor-specific brand identity, original assets, original copy, and original source code.

The defining experience is a full-screen animated hero in which different date varieties rotate one by one above a premium serving pedestal. Every transition changes the product image, supporting decorative elements, subtle background treatment, active navigation indicator, and accessible product label. The hero should feel cinematic and smooth rather than like a generic carousel.

Below the hero, the site tells the brand story, displays filterable date varieties, opens a quick-view product modal, manages a persistent cart drawer, completes a one-page checkout, and displays an animated order confirmation. The entire flow must work equally well on desktop and mobile.

This is not intended to copy the reference bakery's logo, text, people, photographs, code, or brand identity. The target is high fidelity to the reference's composition, motion language, section rhythm, and shopping flow, with a clearly original dates-focused identity.

## 2. Product Goals

### 2.1 Primary goals

1. Create an instantly memorable premium khajoor shopping experience.
2. Make variety discovery visual, educational, and easy.
3. Allow a customer to move from landing to completed order with minimal friction.
4. Preserve the reference video's cinematic hero and layered motion on capable devices.
5. Maintain excellent performance, accessibility, SEO, and mobile usability.
6. Give the store owner a practical admin interface for products, inventory, pricing, orders, coupons, content, and hero slides.

### 2.2 Business outcomes

- Increase product discovery through the animated variety showcase.
- Improve add-to-cart rate through quick view and clear pack-size selection.
- Increase average order value through gift boxes, bundles, related items, and free-shipping progress.
- Reduce checkout abandonment through guest checkout, UPI, cards, wallets, and COD where enabled.
- Create indexable product and educational pages for organic search.
- Make seasonal campaigns such as Ramadan, Eid, gifting, and corporate hampers configurable without code changes.

### 2.3 Non-goals for the first release

- Marketplace with multiple sellers.
- Subscription billing.
- Native Android or iOS apps.
- International tax and multi-currency logic.
- Complex warehouse management.
- AI-generated medical or health claims.

## 3. Reference Video Analysis

### 3.1 Observed structure

| Approx. video time | Observed pattern | Khajoor implementation |
| --- | --- | --- |
| 00:00–00:21 | Light full-screen hero, left-aligned headline and CTA, product centered on a pedestal, decorative objects, repeated product swaps | Warm sand hero, khajoor variety on a stone/brass platter, date leaves and small ingredient accents, automatic and manual slide navigation |
| 00:22–00:33 | Dark story/about section with an image cutout, organic color shape, copy, CTA, and floating decorations | Deep date-brown brand-story section with palm grove/harvest imagery, warm gold shape, sourcing story, “Our Story” CTA |
| 00:34–00:45 | Product heading, pill filters, three-card viewport, horizontal movement between categories | Filterable variety catalog with responsive grid/carousel, category pills, product cards, wishlist and quick-add actions |
| 00:46–00:55 | Centered quick-view modal over a dimmed/blurred page; image, title, price, quantity, CTA | Quick-view modal with date image, origin, texture note, pack size, quantity, stock and add-to-cart |
| 01:00–01:18 | Right-side cart drawer; backdrop; item row, quantity management, subtotal and checkout CTA; persistence after refresh is demonstrated | Persistent cart drawer backed by server cart for signed-in users and local storage for guests |
| 01:19–01:46 | Large centered checkout modal; customer details, payment choices, summary and final total | One-page checkout sheet/page optimized for India with address, pincode validation, UPI/card/wallet/COD and order summary |
| 01:47–01:55 | Order-confirmed card with confetti and order details | Accessible success animation, order number, summary, tracking CTA and WhatsApp/email confirmation status |
| 01:56 onward | Mobile emulation, responsive fixes, code walkthrough, final desktop preview and contact section | Mobile-first responsive implementation, visual regression coverage, final footer/contact block |

### 3.2 Visual behavior to preserve

- Clean top navigation over the hero.
- Strong contrast between a soft/light hero and a rich/dark story section.
- Editorial headline on the left and oversized hero product on the right.
- Product isolated as a transparent cutout, not trapped inside a rectangular photograph.
- Organic background blob behind the hero product.
- Stable pedestal/platter that visually anchors changing products.
- Small decorative objects that animate independently and create depth.
- Pill-shaped CTAs and filters.
- White product cards with large rounded corners and a bold organic image panel.
- Quick-view modal, cart drawer, checkout, and success state kept inside one coherent design system.
- Layered entrance and exit animation rather than instant content replacement.

### 3.3 Improvements over the reference

- Real product detail URLs and shareable product pages.
- Proper keyboard navigation, focus trapping, ARIA labels, and reduced-motion mode.
- Server-authoritative prices and inventory.
- Real payment verification using signed webhooks.
- Search, sorting, pack-size variants, inventory states, delivery checking, and order tracking.
- Production-quality image optimization and performance budgets.
- CMS/admin control rather than hard-coded products.
- SEO metadata, structured data, sitemap, robots rules, canonical URLs, and indexable collection pages.

## 4. Target Customers and Key Jobs

### 4.1 Primary personas

**Premium household buyer**  
Wants trusted, fresh khajoor in 250 g, 500 g, or 1 kg packs, with clear quality and origin information.

**Gift buyer**  
Wants a beautiful gift box for Ramadan, Eid, weddings, office gifting, or family occasions. Needs elegant packaging, a message option, and predictable delivery.

**Variety explorer**  
Knows that date varieties differ but needs simple explanations of texture, sweetness, size, origin, and best use.

**Repeat customer**  
Wants quick reordering, saved addresses, order history, and reliable stock information.

### 4.2 Core jobs to be done

- “Help me understand which date variety suits my taste.”
- “Let me compare sizes, origins, textures, and prices quickly.”
- “Let me purchase in a few steps without creating an account.”
- “Help me send premium khajoor as a gift.”
- “Let me trust the product through clear imagery, sourcing, packing, and delivery information.”

## 5. Information Architecture

### 5.1 Public routes

| Route | Purpose |
| --- | --- |
| `/` | Motion-led homepage and featured shopping journey |
| `/shop` | All products with filters, search, sorting, and pagination |
| `/collections/[slug]` | Variety/category collection page |
| `/products/[slug]` | Indexable product detail page |
| `/gift-boxes` | Gift collection and customization entry point |
| `/our-story` | Brand, sourcing, handling, and packaging story |
| `/date-guide` | Educational variety comparison guide |
| `/track-order` | Order lookup and shipment status |
| `/contact` | Support form, WhatsApp, email, address, business hours |
| `/checkout` | Accessible full-page fallback for modal checkout |
| `/order/[public-token]` | Secure order confirmation/status view |
| `/privacy`, `/terms`, `/shipping`, `/returns` | Required legal and commerce policies |

### 5.2 Account routes

- `/account`
- `/account/orders`
- `/account/addresses`
- `/account/wishlist`
- `/account/profile`

### 5.3 Admin routes

- `/admin/dashboard`
- `/admin/products`
- `/admin/collections`
- `/admin/orders`
- `/admin/customers`
- `/admin/inventory`
- `/admin/coupons`
- `/admin/content`
- `/admin/hero-slides`
- `/admin/settings`

## 6. Original Brand and Art Direction

### 6.1 Brand personality

- Premium but warm.
- Natural but not rustic.
- Rooted in heritage without becoming visually old-fashioned.
- Gift-worthy and trustworthy.
- Minimal, tactile, appetizing, and calm.

### 6.2 Color system

| Token | Hex | Usage |
| --- | --- | --- |
| `--sand-50` | `#FFF8ED` | Main hero and page background |
| `--sand-100` | `#F7E9D3` | Secondary surfaces and form fields |
| `--date-900` | `#2A120D` | Main text and deepest backgrounds |
| `--date-800` | `#3B1A12` | Story/footer background |
| `--date-700` | `#572A1D` | Product image panels and hover surfaces |
| `--caramel-500` | `#B86B2B` | Primary brand action |
| `--gold-400` | `#D5A24B` | Highlights, icons, badges, focus accents |
| `--palm-600` | `#355B3E` | Natural secondary accent |
| `--cream` | `#FFFDF8` | Cards and modal surfaces |
| `--danger` | `#B42318` | Errors and destructive actions |
| `--success` | `#287A4B` | Success and in-stock states |

Contrast ratios must satisfy WCAG AA. Gold cannot be used for small body text on a light background unless contrast is verified.

### 6.3 Typography

Use self-hosted or properly licensed web fonts.

- **Display serif:** Fraunces, Cormorant Garamond, or an approved equivalent for major headlines.
- **UI sans:** Manrope or Inter for navigation, price, forms, and body copy.
- **Optional restrained accent script:** Only for one- to three-word decorative accents. Never use it for navigation, long headings, forms, or product names.

Recommended type scale:

- Hero desktop: `clamp(3.5rem, 6.2vw, 7rem)` with tight line height.
- Section title: `clamp(2.25rem, 4vw, 4.5rem)`.
- Product title: `1.125rem–1.375rem`.
- Body: `1rem–1.125rem`.
- Small/meta: minimum `0.8125rem`; do not go smaller for essential content.

### 6.4 Shapes and surfaces

- Main card radius: 24 px desktop, 20 px mobile.
- Buttons: fully rounded or 14–18 px radius depending on height.
- Organic blobs: custom SVG paths, never copied from the reference.
- Shadows: warm, diffuse, low-opacity brown; avoid cold grey shadows.
- Product images: transparent WebP/AVIF cutouts, consistent visual scale and bottom alignment.

### 6.5 Photography direction

- Hero products must be shot or rendered from a consistent front three-quarter angle.
- Each product cutout should be 1800 px or greater on the longest side before optimization.
- Preserve realistic texture, wrinkles, gloss, and natural variation.
- Avoid excessive saturation or artificial plastic shine.
- Create separate lifestyle images for harvest, packing, gifting, and serving.
- The pedestal/platter should be original: dark stone, brushed brass, or warm ceramic.

## 7. Homepage Specification

### 7.1 Announcement bar

Optional, CMS-controlled.

- Example: “Free shipping above ₹999 • Freshly packed after your order”.
- Height: 32–36 px.
- Can be disabled without leaving empty space.
- Only one concise message at a time on mobile.

### 7.2 Header

**Desktop layout**

- Maximum content width: 1440 px.
- Height: 76–88 px.
- Left: logo/wordmark.
- Center: Home, Shop, Date Guide, Gift Boxes, Our Story, Contact.
- Right: search, account, wishlist, and cart icons.
- Cart icon includes an animated item-count badge.
- Header is initially transparent or sand-colored and becomes a blurred solid surface after 24 px of scroll.

**Mobile layout**

- Height: 64–72 px.
- Left: menu trigger.
- Center: compact wordmark.
- Right: search and cart.
- Menu opens as an accessible full-height drawer.

**Behavior**

- Active route indicator.
- Keyboard focus ring visible on every interactive item.
- Escape closes open menus.
- Body scroll locks while a drawer is open.
- Cart count is optimistic but reconciles with the server.

### 7.3 Hero: animated khajoor variety stage

This is the signature component and the highest visual priority.

#### Desktop composition

- Minimum height: `calc(100svh - header)`; lower bound 680 px.
- Content grid: 44% copy, 56% product stage.
- Headline block positioned left with max width 620 px.
- Product stage fills most of the right side without clipping the active product.
- Pedestal remains visually stable across slides.
- Organic shape sits behind the product and shifts slightly per variety.
- Decorative objects occupy foreground and background layers.

#### Mobile composition

- Minimum height: 760–860 px depending on viewport.
- Headline centered at top; product stage below.
- CTA remains above the fold on common devices.
- Product image uses `clamp(260px, 74vw, 420px)`.
- Decorative pieces are reduced from five or six to two or three.
- Swipe navigation enabled with a drag threshold; vertical page scrolling must not be blocked.

#### Initial hero slides

| Slide | Variety | Visual tone | Supporting microcopy |
| --- | --- | --- | --- |
| 1 | Ajwa | Near-black brown, muted gold | “Deep, soft and distinct” |
| 2 | Medjool | Rich caramel and amber | “Large, soft and naturally luscious” |
| 3 | Mabroom | Mahogany and copper | “Slender, chewy and refined” |
| 4 | Safawi | Dark cocoa and palm green | “Soft texture with deep flavour” |
| 5 | Sukkari | Honey gold and cream | “Golden, tender and delicately sweet” |
| 6 | Khudri | Chestnut and sandstone | “Balanced texture for everyday enjoyment” |

All descriptive and origin claims must be reviewed against actual supplier data before publication.

#### Hero copy

**Eyebrow:** “Premium dates, carefully selected”  
**Headline:** “Khajoor worth slowing down for.”  
**Supporting copy:** “Explore distinctive varieties selected for texture, taste and gifting—packed fresh and delivered across India.”  
**Primary CTA:** “Shop the collection”  
**Secondary text link:** “Find your variety”

Copy must be editable from the CMS.

#### Motion choreography

The animation must feel like the reference, but use original assets and timing refinements.

1. Initial page reveal: headline mask-up, 500 ms; supporting copy, 450 ms with 90 ms delay; CTA, 350 ms with 160 ms delay.
2. Product entrance: opacity `0 → 1`, horizontal offset `10vw → 0`, scale `0.94 → 1`, slight rotation `-2deg → 0deg`.
3. Product exit: opacity `1 → 0`, horizontal offset `0 → -8vw`, scale `1 → 0.96`.
4. Transition duration: 760–900 ms using a custom smooth cubic-bezier or spring with no visible bounce.
5. The pedestal does not fully exit; it may settle vertically by 4–8 px during transition.
6. The organic background blob morphs or cross-fades over 700–900 ms.
7. Decorative date, seed, palm-leaf, and blossom elements travel on separate paths with 40–140 ms stagger.
8. Copy for the variety may cross-fade with a 120 ms overlap after the product begins entering.
9. Autoplay interval: 4.5–5.5 seconds, paused on hover, keyboard focus, touch interaction, modal open, or background browser tab.
10. Manual previous/next controls and pagination dots are required.
11. Swiping changes one slide only per gesture.
12. Respect `prefers-reduced-motion`: replace directional travel and morphing with a 150–220 ms cross-fade; disable autoplay by default.

#### Hero state requirements

- `activeIndex`
- `direction` (`1` next, `-1` previous)
- `isAnimating`
- `isPaused`
- `prefersReducedMotion`
- `hasUserInteracted`

No second transition may start until the current transition has safely completed. Rapid clicks should queue at most one next action, not create overlapping products.

#### Hero asset layer order

1. Background color/gradient.
2. Fine texture/noise at less than 3% opacity.
3. Background organic blob.
4. Rear decorative elements.
5. Product.
6. Pedestal/platter foreground edge.
7. Front decorative elements.
8. Controls and accessible labels.

### 7.4 Trust strip

Four short proof points immediately below the hero:

- Carefully selected lots.
- Hygienically packed.
- Secure payments.
- Pan-India delivery.

Each item uses an original line icon. On mobile, use a two-column grid or a horizontally scrollable row with visible next content.

### 7.5 Brand story section

**Desktop**

- Full-bleed deep date-brown background.
- Two-column split with an image collage or cutout on the left and copy on the right.
- Large warm gold/palm organic shape behind the image.
- Sparse decorative palm/date elements near section edges.
- Section min-height approximately 720 px.

**Content**

- Eyebrow: “From grove to gift box”.
- Heading: “Selected with care. Packed with purpose.”
- Two concise paragraphs about sourcing, sorting, packing, and customer trust.
- CTA: “Read our story”.

**Motion**

- Reveal when 25–35% of the section enters the viewport.
- Image rises 30 px while fading in.
- Organic background grows from scale 0.9 to 1.
- Copy reveals line-by-line or block-by-block, not character-by-character.
- Run once per session unless explicitly replayed.

### 7.6 Featured products and filters

**Heading:** “Explore the collection”  
**Intro:** One sentence explaining different textures, sweetness levels, and uses.

Initial filter pills:

- All
- Premium
- Soft & Juicy
- Semi-Dry
- Gift Boxes
- Everyday

Filter selection must update the URL query string, for example `/shop?collection=premium`, when the section is being used as a shop entry point. The homepage may animate between filtered sets while still providing “View all products”.

**Desktop grid**

- Three cards at reference-like width on 1024–1279 px.
- Four cards on wide screens if cards remain at least 270 px.
- 24–32 px gap.

**Mobile**

- 1.15 cards visible to signal horizontal movement, or a one-column grid when reduced motion/data mode is preferred.
- Scroll snap and visible focus states.

### 7.7 Product card

Each product card contains:

- Product image inside a dark organic shape or rounded image panel.
- Optional badges: Bestseller, New, Limited, Gift-ready, or Low stock.
- Wishlist action.
- Product name.
- Variety/origin short label.
- Starting price and compare-at price when applicable.
- Pack size summary.
- Star rating only if real verified review data exists.
- Quick-view trigger.
- Quick-add button for products with a default available variant.

**Card interactions**

- Image lifts 6–10 px and scales to 1.03 on hover.
- Card shadow and border intensify slightly.
- Wishlist gives immediate feedback and announces the state to screen readers.
- Entire title/image region links to the product page; nested buttons remain valid interactive elements.
- No hover-only information that mobile users cannot access.

### 7.8 Gift banner

A premium dark banner between the catalog and educational content:

- Title: “A gift that feels considered.”
- Copy about customizable date boxes.
- CTA: “Build a gift box”.
- One high-quality gift-box image with optional small ingredient/date cutouts.
- CMS switch for seasonal theme.

### 7.9 Date variety guide

Interactive comparison cards for:

- Texture: soft, chewy, semi-dry.
- Sweetness: subtle, balanced, rich.
- Size: medium, large, extra large.
- Suggested use: daily eating, serving, gifting, pairing.

Avoid nutritional or health promises unless legally approved and evidence-backed. A clear disclaimer should state that general product information is not medical advice.

### 7.10 Reviews

- Display only verified or properly moderated reviews.
- Show customer first name/initial, verified purchase badge, rating, date, product, and review text.
- Horizontal cards on mobile with accessible controls.
- Link to product review section.

### 7.11 Newsletter and WhatsApp opt-in

- Separate consent for promotional email and WhatsApp messages.
- Consent is not pre-checked.
- Explain frequency and unsubscribe/opt-out route.
- Success state is inline and does not block the page.

### 7.12 Contact/footer block

Recreate the reference's final high-contrast contact feeling with original content:

- Dark date-brown background.
- Contact details, business hours, support email, WhatsApp, and social links.
- Shipping, returns, privacy, terms, and track-order links.
- Optional map only when a customer-facing location is relevant; otherwise avoid loading a map SDK.
- Footer includes payment method icons, company/legal name, GST details where applicable, copyright, and accessible social labels.

## 8. Product Quick View

### 8.1 Desktop layout

- Centered modal, maximum width 920–1040 px.
- Two columns: image/gallery left, information and selection right.
- Backdrop: date-brown at 52–64% opacity with 6–10 px blur on capable devices.
- Radius: 28 px.
- Close action in top-right with a minimum 44 × 44 px touch target.

### 8.2 Required content

- Product name.
- Variety and verified origin.
- One-line sensory description.
- Current price and compare-at price.
- Pack-size/variant selector.
- Quantity stepper.
- Stock status.
- Delivery pincode checker.
- Add-to-cart CTA.
- “View full details” link.
- Allergen/packing note when relevant.

### 8.3 Behavior

- Deep-linkable through an intercepting product route where supported.
- Focus moves into the modal and returns to the trigger on close.
- Tab focus cannot escape while open.
- Escape closes unless a payment step is processing.
- Background is inert and non-scrollable.
- Selected price is fetched or validated server-side before cart mutation.
- Add-to-cart success opens the cart drawer or displays an explicit “View cart” action.

## 9. Cart Drawer

### 9.1 Layout

- Slides from the right on desktop and from the bottom or right on mobile depending on viewport.
- Width: 400–460 px desktop; full width on small mobile.
- Backdrop dims the page.
- Header: “Your cart”, item count, close.
- Scrollable line-item list.
- Sticky summary/CTA at the bottom.

### 9.2 Line-item behavior

- Thumbnail, product name, selected pack size, unit price.
- Quantity decrease/increase.
- Remove action with undo toast for a short period.
- Stock validation and maximum purchase quantity.
- Gift message/edit indicator where applicable.
- Price update animation must not shift surrounding layout excessively.

### 9.3 Summary

- Subtotal.
- Discount.
- Shipping estimate or “Calculated at checkout”.
- Free-shipping progress message.
- Checkout CTA.
- Continue-shopping action.

### 9.4 Persistence

- Guest cart stored locally with a versioned schema and anonymous cart ID.
- Signed-in cart stored server-side.
- On sign-in, merge carts deterministically and inform the customer if quantities or availability changed.
- Never trust locally stored price values; keep only product/variant IDs and quantities.

## 10. Checkout

### 10.1 Presentation

Use a modal/sheet to preserve the reference flow on desktop, but maintain `/checkout` as an accessible full-page fallback and direct URL. On mobile, checkout should use a full-page layout instead of a cramped modal.

### 10.2 Steps

The default is a one-page checkout with visually grouped sections:

1. Contact details.
2. Shipping address.
3. Delivery method.
4. Payment method.
5. Order summary.
6. Consent and place-order action.

### 10.3 Fields

- Full name.
- Email.
- Phone number with India validation.
- Address line 1.
- Address line 2 optional.
- Landmark optional.
- City.
- State.
- Pincode.
- Gift message optional.
- Billing same as shipping toggle.

Use correct labels, autocomplete attributes, inline validation, and readable error summaries.

### 10.4 Payments

Initial methods:

- UPI.
- Credit/debit cards.
- Supported wallets/net banking through the gateway.
- Cash on delivery where serviceable and enabled.

Payment provider must be selected during implementation based on the merchant account and target market. For an India-first store, Razorpay is the preferred initial option; Stripe may be retained as an alternative for international expansion.

Requirements:

- Create the payment/order on the server.
- Never expose secret keys to the browser.
- Verify payment signature and webhook authenticity.
- Use idempotency keys for order and payment creation.
- Do not mark an order paid from the client callback alone.
- Reconcile delayed or duplicate webhook events safely.
- Display a recoverable retry flow for interrupted payments.

### 10.5 Shipping and pincode rules

- Serviceability check before payment.
- Configurable shipping zones and fees.
- Free-shipping threshold.
- Optional COD availability by pincode/order value.
- Estimated delivery range based on carrier data or configured rules.
- Re-validate shipping method and total before final order creation.

## 11. Order Confirmation

### 11.1 Visual state

- Centered success card with darkened background.
- Gold/green confirmation icon.
- Subtle confetti using original shapes/colors.
- Confetti is decorative, brief, and disabled in reduced-motion mode.

### 11.2 Content

- “Order confirmed”.
- Human-readable order number.
- Masked contact email/phone.
- Item count, payment method, total, delivery estimate, and address summary.
- “Track order” primary CTA.
- “Continue shopping” secondary action.
- Email/WhatsApp notification state.

The public confirmation route must use a non-guessable token and must not expose private order data through sequential IDs.

## 12. Product Detail Page

### 12.1 Above the fold

- Breadcrumbs.
- Image gallery with zoom.
- Product name, variety, origin, short sensory note.
- Rating and review count when available.
- Price, discount, tax note.
- Pack-size variants.
- Stock state.
- Quantity.
- Pincode checker.
- Add to cart and buy now.
- Wishlist.
- Dispatch/packing information.

### 12.2 Below the fold

- Product story.
- Taste and texture profile.
- Verified origin and sourcing information.
- Pack and storage instructions.
- Ingredients and allergen/packing information.
- Nutritional panel uploaded from verified packaging data.
- Shipping and returns accordion.
- Reviews and questions.
- Related varieties.
- Recently viewed products.

### 12.3 Variant behavior

- Each variant has its own SKU, price, compare-at price, weight, inventory, barcode optional, dimensions, and image set.
- URL or state should preserve the selected variant.
- Out-of-stock variants remain visible but disabled, with optional restock notification.

## 13. Search, Filters, and Sorting

### 13.1 Search

- Search product name, variety, SKU, collection, origin, and keywords.
- Typo-tolerant suggestions.
- Recent searches stored only with appropriate privacy handling.
- Keyboard-accessible command-style overlay on desktop; full-screen search on mobile.
- Empty state suggests popular varieties and gift boxes.

### 13.2 Filters

- Collection.
- Texture.
- Sweetness level.
- Origin.
- Pack size.
- Price range.
- Availability.
- Gift-ready.

### 13.3 Sort

- Featured.
- Best selling.
- Newest.
- Price low to high.
- Price high to low.
- Customer rating when real review volume is sufficient.

Filter and sort state must be represented in the URL for sharing, back/forward navigation, and index-control decisions.

## 14. Admin and Content Management

### 14.1 Product management

- Create, edit, archive, and duplicate products.
- Manage variants, SKUs, prices, images, inventory, attributes, SEO fields, badges, and collections.
- Preview before publishing.
- Draft/published/archived states.
- Bulk inventory and price import/export via CSV.

### 14.2 Hero management

Each hero slide supports:

- Product/variety reference.
- Desktop and mobile cutout assets.
- Alt text.
- Accent colors.
- Blob SVG/color.
- Decorative assets and positions.
- Eyebrow, headline override, description, CTA label/link.
- Sort order.
- Active date window.
- Draft/published state.

### 14.3 Order management

- Search by order number, customer, phone, email, payment ID, or tracking number.
- Status pipeline: pending, payment pending, confirmed, packed, shipped, delivered, cancelled, returned, refunded.
- Internal notes and customer-visible notes separated.
- Partial/full refund support where gateway permits.
- Invoice generation.
- Shipment/tracking fields and notification trigger.

### 14.4 Content management

- Homepage sections.
- Story page.
- Date guide.
- FAQ.
- Policies.
- Announcement bar.
- Contact details.
- Seasonal campaigns.

## 15. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-001 | User can navigate hero slides automatically, by button, keyboard, and swipe | Must |
| FR-002 | Hero displays a distinct product, accent state, accessible label, and CTA per slide | Must |
| FR-003 | Reduced-motion preference disables complex motion and autoplay | Must |
| FR-004 | User can filter and sort products with URL-preserved state | Must |
| FR-005 | User can open quick view without losing page context | Must |
| FR-006 | User can select variant and quantity before adding to cart | Must |
| FR-007 | Cart persists for guests and signed-in users | Must |
| FR-008 | Prices and inventory are validated on the server | Must |
| FR-009 | User can check pincode serviceability | Must |
| FR-010 | Guest checkout is supported | Must |
| FR-011 | Online payments are verified by server/webhook | Must |
| FR-012 | COD can be enabled by rules | Should |
| FR-013 | Order confirmation and tracking are available | Must |
| FR-014 | Admin can manage products, slides, inventory, orders, coupons, and content | Must |
| FR-015 | User can create an account and view order history | Should |
| FR-016 | User can save wishlist items | Should |
| FR-017 | Gift box can include message and recipient details | Should |
| FR-018 | Back-in-stock notification is available | Could |
| FR-019 | Corporate/bulk enquiry flow is available | Could |

## 16. Data Model

### 16.1 Core entities

**User**

- `id`, `email`, `phone`, `name`, `role`, `emailVerifiedAt`, `createdAt`, `updatedAt`.

**Address**

- `id`, `userId`, `name`, `phone`, `line1`, `line2`, `landmark`, `city`, `state`, `postalCode`, `country`, `isDefault`.

**Product**

- `id`, `slug`, `name`, `shortDescription`, `description`, `status`, `variety`, `origin`, `texture`, `sweetness`, `featured`, `seoTitle`, `seoDescription`, timestamps.

**ProductVariant**

- `id`, `productId`, `sku`, `label`, `weightGrams`, `priceMinor`, `compareAtPriceMinor`, `inventoryQuantity`, `reservedQuantity`, `allowBackorder`, `active`.

**ProductImage**

- `id`, `productId`, optional `variantId`, `url`, `alt`, `width`, `height`, `sortOrder`, `role`.

**Collection**

- `id`, `slug`, `name`, `description`, `image`, `active`, `seoTitle`, `seoDescription`.

**Cart / CartItem**

- Cart: `id`, optional `userId`, `currency`, `status`, `expiresAt`, timestamps.
- Item: `id`, `cartId`, `variantId`, `quantity`, optional `giftMetadata`.

**Order / OrderItem**

- Order: `id`, `publicToken`, `orderNumber`, optional `userId`, customer snapshot, address snapshots, monetary totals, currency, payment status, fulfilment status, coupon snapshot, timestamps.
- Item: immutable product/variant snapshot, SKU, title, weight, unit price, quantity, tax, discount, total.

**Payment**

- `id`, `orderId`, `provider`, `providerOrderId`, `providerPaymentId`, `status`, `amountMinor`, `currency`, sanitized provider metadata, timestamps.

**Shipment**

- `id`, `orderId`, `carrier`, `trackingNumber`, `trackingUrl`, `status`, `estimatedDeliveryAt`, events.

**Coupon**

- `id`, `code`, `type`, `value`, limits, minimum subtotal, active window, usage count, applicable collections/products.

**HeroSlide**

- `id`, optional `productId`, copy fields, asset fields, color tokens, decoration configuration, sort order, active window, status.

**Review**

- `id`, `productId`, optional `userId`, optional `orderItemId`, rating, title, body, verifiedPurchase, moderation status, timestamps.

### 16.2 Monetary rules

- Store money in integer minor units, never floating point.
- Currency is explicit on carts, orders, payments, refunds, and coupons.
- Order records preserve immutable price, tax, discount, and product-name snapshots.
- Recalculate totals on the server whenever cart contents, address, coupon, shipping, or payment method changes.

## 17. API and Server Actions

Suggested endpoints or equivalent server actions:

- `GET /api/products`
- `GET /api/products/[slug]`
- `GET /api/collections/[slug]`
- `POST /api/cart`
- `GET /api/cart/[id]`
- `POST /api/cart/[id]/items`
- `PATCH /api/cart/[id]/items/[itemId]`
- `DELETE /api/cart/[id]/items/[itemId]`
- `POST /api/cart/[id]/coupon`
- `POST /api/delivery/check`
- `POST /api/checkout/prepare`
- `POST /api/payments/create`
- `POST /api/webhooks/payment-provider`
- `GET /api/orders/[publicToken]`
- `POST /api/reviews`
- `POST /api/restock-subscriptions`

Requirements:

- Validate all payloads with a shared schema library.
- Authenticate and authorize admin mutations.
- Apply rate limits to login, search, coupons, checkout, payment creation, contact, review, and notification endpoints.
- Use consistent typed error responses.
- Do not leak stack traces, secrets, internal IDs, or gateway responses to the client.
- Webhooks must preserve raw request body when required for signature verification.

## 18. Technical Architecture

### 18.1 Recommended stack

- **Frontend/full stack:** Next.js App Router with TypeScript, using the stable release frozen at implementation start.
- **Styling:** Tailwind CSS plus CSS custom properties for tokens; CSS Modules or scoped styles for complex hero choreography if clearer.
- **Motion:** Motion for React for presence, layout, modal, drawer, and hero sequencing; CSS transforms for lightweight decorative movement.
- **Database:** PostgreSQL.
- **ORM:** Prisma or Drizzle, selected by the implementation team.
- **Authentication:** Auth.js or a managed provider with email/phone options.
- **Storage:** S3-compatible object storage or a managed image platform.
- **Payments:** Razorpay for India-first launch; abstraction layer to permit Stripe later.
- **Email:** Transactional email provider with domain authentication.
- **WhatsApp/SMS:** Approved provider and explicit user consent.
- **Analytics:** GA4 plus privacy-conscious product analytics if required.
- **Error monitoring:** Sentry or equivalent.
- **Testing:** Vitest/Jest, Testing Library, Playwright, and visual regression snapshots.

The App Router supports file-based layouts/pages, server/client component boundaries, data fetching, metadata, image optimization, route handlers, and deployment patterns. Motion's presence primitives are suitable for coordinated enter/exit states such as the hero, modals, and drawers.

### 18.2 Rendering strategy

- Homepage: server-rendered/static with revalidation; only animated and commerce controls hydrate on the client.
- Product and collection pages: server-rendered with cached catalog data and controlled revalidation.
- Cart: client-interactive with server reconciliation.
- Checkout/account/admin: dynamic, authenticated where applicable, and never cached publicly.
- Structured data generated server-side.

### 18.3 Proposed source structure

```text
src/
  app/
    (storefront)/
      page.tsx
      shop/page.tsx
      products/[slug]/page.tsx
      collections/[slug]/page.tsx
      our-story/page.tsx
      date-guide/page.tsx
      checkout/page.tsx
    account/
    admin/
    api/
    layout.tsx
  components/
    layout/
    hero/
      HeroStage.tsx
      HeroProduct.tsx
      HeroDecorations.tsx
      HeroControls.tsx
    product/
    cart/
    checkout/
    order/
    ui/
  features/
    catalog/
    cart/
    checkout/
    payments/
    orders/
    content/
  lib/
    auth/
    db/
    payments/
    validation/
    analytics/
  styles/
  types/
public/
  brand/
  hero/
  products/
  decorative/
```

### 18.4 Hero implementation approach

- Keep slide content in CMS/database or a typed configuration returned from the server.
- Preload only the first and next product images at high priority.
- Use unique slide IDs as animation keys.
- Coordinate exit-before-enter or carefully overlapped transitions using presence management.
- Animate `transform` and `opacity`; avoid layout properties such as `left`, `top`, `width`, or `height` during motion.
- Isolate the hero stage to prevent rerendering the entire page on every slide change.
- Use image aspect-ratio containers to prevent layout shift.
- Pause timers when `document.visibilityState !== 'visible'`.
- Provide a static server-rendered first slide so the hero is useful before hydration.

## 19. Responsive Requirements

### 19.1 Breakpoints

Use content-driven breakpoints approximately aligned to:

- Small mobile: 320–479 px.
- Large mobile: 480–767 px.
- Tablet: 768–1023 px.
- Desktop: 1024–1439 px.
- Wide: 1440 px and above.

### 19.2 Key adaptations

- Hero changes from two columns to vertically stacked.
- Large decorative assets reduce or disappear on small devices.
- Desktop modal quick view becomes a full-height bottom sheet or full-screen dialog.
- Cart becomes full width on small screens.
- Checkout becomes a dedicated page.
- Filter pills scroll horizontally and remain keyboard accessible.
- Forms move from two columns to one.
- Buttons handling critical actions become full width.
- Touch targets are at least 44 × 44 px.
- No horizontal page overflow at 320 px.

## 20. Performance Requirements

### 20.1 Targets at 75th percentile on mobile

- Largest Contentful Paint: 2.5 seconds or better.
- Interaction to Next Paint: 200 ms or better.
- Cumulative Layout Shift: 0.1 or better.
- Initial JavaScript kept intentionally small; animation libraries loaded only where needed.

### 20.2 Budgets

- First hero image: ideally below 180 KB on common mobile viewport.
- Non-critical below-fold images lazy loaded.
- Avoid autoplay background video in the initial release.
- No unbounded third-party scripts.
- Limit font families and weights.
- Defer review, map, chat, and non-essential marketing integrations.

### 20.3 Optimization rules

- AVIF/WebP with responsive `srcset` and declared dimensions.
- CDN caching for images and static assets.
- Preload only the primary display font subset and first hero image.
- Use server components for non-interactive content.
- Use dynamic imports for cart, quick view, and checkout when appropriate.
- Measure real devices on throttled mobile networks before release.

## 21. Accessibility

- Target WCAG 2.2 AA.
- Complete keyboard navigation.
- Visible focus indicators.
- Semantic headings and landmarks.
- Skip-to-content link.
- Meaningful image alt text; decorative elements use empty alt or CSS backgrounds.
- Hero controls have explicit labels such as “Show Medjool dates”.
- Autoplay carousel can be paused.
- Live regions announce cart changes and validation results without excessive interruption.
- Dialog focus trap and focus restoration.
- Forms use persistent labels, descriptions, and error association.
- Color is never the only signal.
- Reduced-motion and high-contrast considerations.
- Confetti and decorative particles are hidden from assistive technology.

## 22. SEO, GEO, and AEO

### 22.1 Technical SEO

- Unique title, description, canonical, Open Graph, and social image per indexable page.
- XML sitemap split by content type when scale requires.
- Correct robots rules for account, cart, checkout, admin, internal search, and unwanted filter combinations.
- Product, Offer, BreadcrumbList, Organization, WebSite/SearchAction, FAQPage, and review structured data only where content supports it.
- Server-rendered product names, prices, availability, and descriptions.
- Human-readable slugs.
- Redirect plan for changed product URLs.

### 22.2 Content clusters

- Ajwa dates guide.
- Medjool vs Ajwa comparison.
- How to store dates.
- Date texture and sweetness guide.
- Choosing dates for gifting.
- Ramadan and Eid gift-box pages.
- Corporate gifting.
- Product-origin stories based on verified supplier information.

### 22.3 Answer-engine readiness

- Put concise factual answers near the top of educational pages.
- Use comparison tables with consistent attributes.
- Clearly separate verified product facts from marketing language.
- Include author/reviewer and updated date on educational content.
- Maintain entity consistency for brand name, address, customer support, shipping rules, and product naming.

Do not publish unsupported health, disease, treatment, or guaranteed-result claims.

## 23. Security, Privacy, and Reliability

- HTTPS everywhere.
- Secure, HTTP-only, same-site cookies.
- CSRF protection where applicable.
- Strong admin authentication and optional MFA.
- Role-based access control.
- Input validation and output encoding.
- Content Security Policy tuned for payment and analytics providers.
- Rate limiting and abuse monitoring.
- Sanitized logs with no card details, passwords, OTPs, or unnecessary personal data.
- Database backups and tested restoration procedure.
- Payment data handled by the provider; never store raw card numbers or CVV.
- Signed webhook verification and replay protection.
- Order creation and stock reservation use transactions/idempotency.
- Privacy policy and consent records for marketing channels.
- Data retention and deletion workflows.

## 24. Analytics and Events

Track at minimum:

- `view_home`
- `hero_slide_view`
- `hero_slide_manual_change`
- `select_hero_cta`
- `view_item_list`
- `select_item`
- `view_item`
- `open_quick_view`
- `select_variant`
- `add_to_wishlist`
- `add_to_cart`
- `remove_from_cart`
- `view_cart`
- `begin_checkout`
- `add_shipping_info`
- `add_payment_info`
- `purchase`
- `payment_failed`
- `search`
- `apply_filter`
- `apply_coupon`
- `delivery_check`

Never send sensitive personal data, full addresses, raw search terms containing personal data, or payment credentials to analytics platforms.

## 25. Error and Empty States

- Hero asset failure: retain headline and CTA; show a styled static fallback image/background.
- Empty search: suggestions and popular collections.
- Empty cart: illustration, helpful copy, and “Explore dates” CTA.
- Out of stock: disabled purchase action, alternate sizes, related items, and restock alert.
- Pincode not serviceable: clear explanation and optional notification.
- Payment failed: preserve cart/order attempt and provide safe retry.
- Network interruption: non-destructive retry with idempotent requests.
- Invalid coupon: explain why without exposing internal rules.
- Admin upload failure: retain entered data and explain asset requirements.

## 26. Testing Strategy

### 26.1 Unit tests

- Cart calculations.
- Discounts and free-shipping thresholds.
- Inventory availability.
- Money formatting.
- Pincode/serviceability rules.
- Schema validation.
- Hero index/direction state transitions.

### 26.2 Integration tests

- Add/update/remove cart item.
- Guest-to-user cart merge.
- Checkout total recalculation.
- Payment intent/order creation.
- Webhook verification and idempotency.
- Order and inventory transaction.
- Admin authorization.

### 26.3 End-to-end tests

- Discover product from hero and purchase.
- Filter catalog, open quick view, select variant, add to cart.
- Cart persists after refresh.
- Guest checkout via online payment test mode.
- COD flow where allowed.
- Failed payment then successful retry.
- Mobile menu, hero swipe, cart, and checkout.
- Keyboard-only shopping journey.

### 26.4 Visual regression

Capture at minimum:

- Desktop widths: 1024, 1280, 1440, 1920.
- Tablet: 768 and 1024.
- Mobile: 320, 360, 390, 430.
- Every hero slide.
- Story section.
- Product filters and cards.
- Quick view.
- Cart drawer.
- Checkout.
- Confirmation.
- Reduced-motion mode.

## 27. Acceptance Criteria

### 27.1 Visual fidelity

- Homepage follows the reference video's overall rhythm: light cinematic hero, dark story section, filterable catalog, modal quick view, cart drawer, checkout, success state, and contact/footer.
- Khajoor identity is unmistakably original and consistent.
- Products are scaled and aligned consistently across hero slides and cards.
- No visible jump, flash, overlap, or double product during transitions.

### 27.2 Hero quality

- Autoplay and all manual controls work.
- Product transition remains smooth at 60 fps on a representative modern mid-range phone where feasible.
- User input pauses autoplay.
- Reduced-motion mode works.
- The first slide is visible and meaningful before client hydration.

### 27.3 Commerce quality

- Variant, quantity, coupon, shipping, discount, tax, and total calculations match server results.
- Cart persists across refresh.
- Inventory prevents overselling under expected load.
- Duplicate payment callbacks/webhooks do not create duplicate orders.
- Successful order produces a confirmation and notification.

### 27.4 Responsive quality

- No horizontal overflow at 320 px.
- Critical actions stay visible and usable.
- Modals/drawers do not trap the viewport incorrectly.
- Mobile hero remains visually balanced and does not hide the product or CTA.

### 27.5 Accessibility and performance

- Automated accessibility checks show no critical violations on core flows.
- Keyboard-only flow can complete an order in test mode.
- Performance targets are measured and documented before release.

## 28. Delivery Plan

### Phase 0: discovery and assets — 3–5 working days

- Finalize brand name, logo, copy tone, products, prices, pack sizes, policies, payment provider, delivery rules, and imagery.
- Produce original hero cutouts and decorative assets.
- Confirm admin/content ownership.

### Phase 1: design system and motion prototype — 5–8 working days

- Tokens, typography, buttons, cards, forms, modals, drawers.
- High-fidelity desktop/mobile homepage design.
- Standalone hero motion prototype across target devices.
- Approve motion timing before building the whole store.

### Phase 2: storefront — 8–12 working days

- App shell, header, hero, story, catalog, filters, quick view, product pages, guide, footer.
- Responsive and accessibility implementation.

### Phase 3: commerce backend — 8–12 working days

- Database, products, variants, inventory, cart, users, addresses, coupons, checkout, payments, webhooks, orders.

### Phase 4: admin and operations — 5–8 working days

- Product/content/order/inventory/hero management.
- Notifications, invoice, tracking, operational settings.

### Phase 5: QA and launch — 5–7 working days

- E2E, visual regression, payment tests, webhook tests, accessibility, performance, SEO, analytics, backups, monitoring, content proofreading, launch checklist.

Estimated production timeline: approximately 5–8 weeks for a focused small team, depending mainly on asset readiness, payment/shipping integrations, admin depth, and review speed.

## 29. Asset Checklist

- Final logo: light, dark, icon, and wordmark variants.
- Favicon and app icons.
- Six hero product cutouts plus mobile-optimized variants.
- Stable pedestal/platter asset.
- Organic SVG backgrounds per hero slide.
- Decorative transparent assets: date pieces, seeds, palm leaves, blossoms, gift ribbon, texture fragments.
- At least four images per product where possible.
- Story/harvest image set.
- Packaging and gift-box photos.
- Social sharing templates.
- Verified nutrition/ingredient/label data.
- Shipping, return, privacy, and terms text.

## 30. Decisions Required Before Development Freeze

1. Final brand name and logo.
2. Exact launch product list and variants.
3. Verified origins and descriptive claims.
4. Actual price, tax, shipping, free-shipping, and COD rules.
5. Payment provider and merchant-account readiness.
6. Shipping aggregator/carrier integration.
7. Whether checkout is India-only at launch.
8. Whether customer accounts use email, phone OTP, or both.
9. Whether reviews launch immediately.
10. Whether gift-box customization is in MVP or Phase 2.
11. Admin users and roles.
12. Final analytics and marketing consent requirements.

## 31. Definition of Done

The project is complete only when:

- All Must requirements pass acceptance tests.
- Original brand assets replace every placeholder.
- Hero motion is approved on desktop and mobile.
- Real products, prices, inventory, legal copy, and delivery rules are loaded.
- Payment test cases and webhook verification pass.
- Admin can operate the store without developer intervention for routine tasks.
- Core flows pass automated and manual accessibility checks.
- Performance, security, SEO, analytics, backup, and monitoring checks are documented.
- Production deployment, domain, SSL, email authentication, payment live keys, and operational alerts are verified.

## 32. Official Technical References

- Next.js App Router: https://nextjs.org/docs/app
- Motion for React presence animations: https://motion.dev/docs/react-animate-presence
- Razorpay web integration documentation: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
- Stripe Checkout alternative: https://docs.stripe.com/payments/checkout

---

**Implementation principle:** Match the reference's polish, composition, and flow; do not reuse its protected brand assets, text, logo, photographs, or source. The final result should be recognizably inspired by the experience but unmistakably built for the khajoor brand.
