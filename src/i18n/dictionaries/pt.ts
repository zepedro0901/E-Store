import type { Dictionary } from "./en";

const pt: Dictionary = {
  common: {
    allProducts: "Todos os Produtos",
    addToCart: "Adicionar ",
    added: "Adicionado",
    addedToCart: "Adicionado ao Carrinho",
    soldOut: "Esgotado",
    outOfStock: "Fora de stock",
    browseAllProducts: "Ver Todos os Produtos",
    continueShopping: "Continuar a Comprar",
    quantity: "Quantidade",
    decreaseQuantity: "Diminuir quantidade",
    increaseQuantity: "Aumentar quantidade",
    total: "Total",
    subtotal: "Subtotal",
    previous: "Anterior",
    next: "Seguinte",
    cart: "Carrinho",
    scale: "Escala",
    material: "Material",
  },
  header: {
    searchPlaceholder: "Pesquisar miniaturas...",
  },
  footer: {
    tagline:
      "Miniaturas em resina acabadas à mão, impressas por encomenda. Cada figura é impressa de raiz — esqueça o stock impresso em massa, apenas trabalho personalizado e cuidado na sua peça.",
    bottomTagline: "Miniaturas em resina acabadas à mão, impressas por encomenda.",
    studios: "Estúdios",
    themes: "Temas",
    shop: "Loja",
    newestArrivals: "Novidades",
  },
  home: {
    heroKicker: "001 — Miniaturas em Resina",
    heroTitleLine1: "Impressas por",
    heroTitleLine2: "encomenda",
    heroSubtitle:
      "Impressas, curadas e acabadas à mão — uma miniatura de cada vez. Um catálogo crescente de personagens de fantásticos, monstros e dragões.",
    exploreCollections: "Explorar Coleções",
    statMiniatures: "Miniaturas no catálogo",
    statCollections: "Coleções selecionadas",
    shopByCategory: "Comprar por Categoria",
    featured: "Em Destaque",
    featuredSubtitle: "Uma seleção do que a nossa resina consegue fazer.",
    viewAllProducts: "Ver todos os produtos",
    processTitle: "Do Ficheiro ao Acabamento",
    processSubtitle: "Sem stock pré-impresso — cada encomenda começa no Passo 01",
    processSteps: [
      {
        title: "Imprimir",
        description:
          "A miniatura escolhida é processada e impressa de raiz, camada a camada, na nossa impressora de resina.",
      },
      {
        title: "Lavar",
        description:
          "Assim que sai da placa, a peça é lavada até remover todos os vestígios de resina não curada.",
      },
      {
        title: "Curar",
        description:
          "Endurece sob luz UV até ficar totalmente sólida, destacando cada detalhe esculpido.",
      },
      {
        title: "Acabar",
        description:
          "Os suportes são removidos, a peça é inspecionada e depois embalada para envio.",
      },
    ],
    ctaTitle: "Pronto para encontrar a sua próxima miniatura?",
    ctaSubtitle:
      "{count} miniaturas em {collections} coleções, à espera de serem impressas.",
  },
  products: {
    productsCount: "{count} produtos",
  },
  filterBar: {
    search: "Pesquisar",
    searchPlaceholder: "Pesquisar produtos…",
    studio: "Estúdio",
    allStudios: "Todos os estúdios",
    theme: "Tema",
    allThemes: "Todos os temas",
    sortBy: "Ordenar por",
    sortNewest: "Mais recentes",
    sortPriceAsc: "Preço: Menor para Maior",
    sortPriceDesc: "Preço: Maior para Menor",
    sortNameAsc: "Nome: A–Z",
    apply: "Aplicar",
  },
  pagination: {
    pageOf: "Página {page} de {totalPages}",
  },
  productGrid: {
    noProductsMatch: "Nenhum produto corresponde a estes filtros.",
  },
  productCard: {
    fromPrice: "A partir de {price}",
  },
  addToCart: {
    ariaAdd: "Adicionar {name} ao carrinho",
    ariaOutOfStock: "{name} está fora de stock",
    ariaChooseVariation: "Escolher uma variação de {name} para adicionar ao carrinho",
  },
  productOptions: {
    variation: "Variação",
    outOfStockSuffix: " (fora de stock)",
  },
  productGallery: {
    previousImage: "Imagem anterior",
    nextImage: "Imagem seguinte",
    scrollThumbnailsLeft: "Deslizar miniaturas para a esquerda",
    scrollThumbnailsRight: "Deslizar miniaturas para a direita",
    viewImageOf: "Ver imagem {index} de {total}",
  },
  cart: {
    title: "O Seu Carrinho",
    empty: "O seu carrinho está vazio.",
    each: "{price} cada",
    removeAria: "Remover {name}",
    clearCart: "Esvaziar Carrinho",
    requestToOrder: "Pedido de Encomenda",
  },
  checkout: {
    title: "Preencher dados de encomenda",
    subtitle:
      "Preencha os seus dados abaixo e responderemos por email para combinar o pagamento e o envio das miniaturas no seu carrinho.",
    emptyCart:
      "O seu carrinho está vazio — adicione algumas miniaturas antes de pedir uma encomenda.",
    fullName: "Nome completo",
    email: "Email",
    phoneOptional: "Telefone (opcional)",
    shippingAddress: "Morada de envio",
    city: "Cidade",
    postalCode: "Código postal",
    country: "País",
    notesOptional: "Notas (opcional)",
    notesPlaceholder:
      "Mais alguma coisa que devamos saber — escolha de cores, instruções de entrega, etc.",
    sending: "A enviar…",
    submit: "Enviar Pedido de Encomenda",
    disclaimer:
      "Isto envia os detalhes da sua encomenda por email — não implica qualquer pagamento aqui. Responderemos com os detalhes de pagamento e envio.",
    orderSummary: "Resumo da Encomenda",
    genericError: "Algo correu mal.",
    genericSendError: "Algo correu mal ao enviar o seu pedido.",
  },
  thankYou: {
    title: "Pedido de Encomenda Enviado",
    orderLabel: "Encomenda {order}",
    message:
      "Obrigado! Recebemos o seu pedido de encomenda e entraremos em contacto em breve por email para confirmar o pagamento e os detalhes de envio.",
    continueBrowsing: "Continuar a Explorar",
  },
  metadata: {
    product: "Produto",
    category: "Categoria",
    theme: "Tema",
  },
  api: {
    rateLimit: "Demasiados pedidos de encomenda. Tente novamente dentro de alguns minutos.",
    invalidBody: "Corpo do pedido inválido",
    invalidOrder: "Pedido de encomenda inválido",
    sendFailed: "Falha ao enviar o pedido de encomenda",
  },
};

export default pt;
