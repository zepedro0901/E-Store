const en = {
  common: {
    allProducts: "All Products",
    addToCart: "Add to Cart",
    added: "Added",
    addedToCart: "Added to Cart",
    soldOut: "Sold Out",
    outOfStock: "Out of stock",
    browseAllProducts: "Browse All Products",
    continueShopping: "Continue Shopping",
    quantity: "Quantity",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    total: "Total",
    subtotal: "Subtotal",
    previous: "Previous",
    next: "Next",
    cart: "Cart",
    scale: "Base Size",
    material: "Material",
    sizeGuide: "Size guide",
  },
  sizeCategories: {
    tiny: "Tiny",
    small: "Small",
    medium: "Medium",
    large: "Large",
    huge: "Huge",
    gargantuan: "Gargantuan",
    unknown: "Unknown",
  },
  header: {
    searchPlaceholder: "Search miniatures...",
  },
  footer: {
    tagline:
      "Hand-finished resin miniatures, printed to order. Every figure is printed fresh — no warehouse of pre-made stock, just careful work on your piece.",
    bottomTagline: "Hand-finished resin miniatures, printed to order.",
    studios: "Studios",
    themes: "Themes",
    shop: "Shop",
    newestArrivals: "Newest Arrivals",
  },
  home: {
    heroKicker: "001 — Resin Miniatures",
    heroTitleLine1: "Printed to",
    heroTitleLine2: "order",
    heroSubtitle:
      "Printed, cured, and finished by hand — one miniature at a time. A growing catalog of dark fantasy characters, monsters, and dragons.",
    exploreCollections: "Explore Collections",
    statMiniatures: "Miniatures in the catalog",
    statCollections: "Curated collections",
    shopByTheme: "Shop By Theme",
    featured: "Featured",
    featuredSubtitle: "A hand-picked look at what our resin can do.",
    viewAllProducts: "View all products",
    processTitle: "From File to Finish",
    processSubtitle: "No pre-printed stock — every order starts at Step 01",
    processSteps: [
      {
        title: "Print",
        description:
          "Your chosen miniature is sliced and printed fresh, layer by layer, on our resin printer.",
      },
      {
        title: "Wash",
        description:
          "Straight off the plate, the piece is washed clean of every trace of uncured resin.",
      },
      {
        title: "Cure",
        description:
          "It sets under UV light until fully hardened, locking in every sculpted detail.",
      },
      {
        title: "Finish",
        description:
          "Supports are trimmed, the piece is inspected by hand, then packed to ship.",
      },
    ],
    ctaTitle: "Ready to find your next miniature?",
    ctaSubtitle:
      "{count} miniatures across {collections} collections, waiting to be printed.",
  },
  products: {
    productsCount: "{count} products",
  },
  filterBar: {
    search: "Search",
    searchPlaceholder: "Search products…",
    studio: "Studio",
    allStudios: "All studios",
    theme: "Theme",
    allThemes: "All themes",
    sortBy: "Sort by",
    sortNewest: "Newest",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortNameAsc: "Name: A–Z",
    apply: "Apply",
  },
  pagination: {
    pageOf: "Page {page} of {totalPages}",
  },
  productGrid: {
    noProductsMatch: "No products match these filters.",
  },
  productCard: {
    fromPrice: "From {price}",
  },
  addToCart: {
    ariaAdd: "Add {name} to cart",
    ariaOutOfStock: "{name} is out of stock",
    ariaChooseVariation: "Choose a variation of {name} to add to cart",
  },
  productOptions: {
    variation: "Variation",
    outOfStockSuffix: " (out of stock)",
  },
  productGallery: {
    previousImage: "Previous image",
    nextImage: "Next image",
    scrollThumbnailsLeft: "Scroll thumbnails left",
    scrollThumbnailsRight: "Scroll thumbnails right",
    viewImageOf: "View image {index} of {total}",
  },
  cart: {
    title: "Your Cart",
    empty: "Your cart is empty.",
    each: "{price} each",
    removeAria: "Remove {name}",
    clearCart: "Clear Cart",
    requestToOrder: "Request to Order",
  },
  checkout: {
    title: "Request an Order",
    subtitle:
      "Fill in your details below and we'll email you back to arrange payment and shipping for the miniatures in your cart.",
    emptyCart:
      "Your cart is empty — add some miniatures before requesting an order.",
    fullName: "Full name",
    email: "Email",
    phoneOptional: "Phone (optional)",
    shippingAddress: "Shipping address",
    city: "City",
    postalCode: "Postal code",
    country: "Country",
    notesOptional: "Notes (optional)",
    notesPlaceholder:
      "Anything else we should know — color choices, delivery instructions, etc.",
    sending: "Sending…",
    submit: "Submit Order Request",
    disclaimer:
      "This sends your order details to us by email — it doesn't charge you anything here. We'll reply with payment and shipping details.",
    orderSummary: "Order Summary",
    genericError: "Something went wrong.",
    genericSendError: "Something went wrong sending your request.",
  },
  thankYou: {
    title: "Order Request Sent",
    orderLabel: "Order {order}",
    message:
      "Thanks! We've received your order request and will email you shortly to confirm payment and shipping details.",
    continueBrowsing: "Continue Browsing",
  },
  metadata: {
    product: "Product",
    category: "Category",
    theme: "Theme",
  },
  api: {
    rateLimit: "Too many order requests. Please try again in a few minutes.",
    invalidBody: "Invalid request body",
    invalidOrder: "Invalid order request",
    sendFailed: "Failed to send order request",
  },
};

export default en;
export type Dictionary = typeof en;
