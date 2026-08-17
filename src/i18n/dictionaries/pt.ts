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
    scale: "Tamanho da Base",
    material: "Material",
    sizeGuide: "Guia de tamanhos",
    materialDisclaimer:
      "Impresso em resina cinzenta. Requer montagem — algumas peças poderão ter de ser coladas.",
    },
  sizeCategories: {
    tiny: "Minúsculo",
    small: "Pequeno",
    medium: "Médio",
    large: "Grande",
    huge: "Enorme",
    gargantuan: "Gigantesco",
    unknown: "Desconhecido",
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
    shopByTheme: "Comprar por Tema",
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
    priceMin: "Preço mín.",
    priceMax: "Preço máx.",
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
    addAllVariations: "Adicionar todas as variações",
  },
  productGallery: {
    previousImage: "Imagem anterior",
    nextImage: "Imagem seguinte",
    scrollThumbnailsLeft: "Deslizar miniaturas para a esquerda",
    scrollThumbnailsRight: "Deslizar miniaturas para a direita",
    viewImageOf: "Ver imagem {index} de {total}",
    zoomImage: "Ampliar imagem",
    closeZoom: "Fechar imagem ampliada",
    zoomIn: "Mais zoom",
    zoomOut: "Menos zoom",
  },
  cart: {
    title: "O Seu Carrinho",
    empty: "O seu carrinho está vazio.",
    each: "{price} cada",
    removeAria: "Remover {name}",
    clearCart: "Esvaziar Carrinho",
    requestToOrder: "Pedido de Encomenda",
    freeShippingInfo: "Envio grátis em encomendas acima de 50€ para Portugal, ou acima de 100€ para o resto da UE.",
    orderNotice:
      "Ao submeter este carrinho, está a enviar um pedido de encomenda — não um pagamento. Vamos analisá-lo e confirmá-lo primeiro; só paga as miniaturas e o envio depois de aceitarmos a encomenda, e a produção começa após o pagamento.",
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
      "Isto envia um pedido de encomenda, não um pagamento. Vamos analisá-lo e responder para confirmar — só paga as miniaturas e o envio depois de aceitarmos a encomenda, e a produção começa após o pagamento.",
    orderSummary: "Resumo da Encomenda",
    shippingLabel: "Envio",
    freeShipping: "Grátis",
    genericError: "Algo correu mal.",
    genericSendError: "Algo correu mal ao enviar o seu pedido.",
  },
  thankYou: {
    title: "Pedido de Encomenda Enviado",
    orderLabel: "Encomenda {order}",
    message:
      "Obrigado! Recebemos o seu pedido de encomenda. Vamos analisá-lo e responder por email para confirmar — depois de aceite, combinamos o pagamento e o envio, e a produção começa após o pagamento.",
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
  policiesNav: {
    faq: "Perguntas Frequentes",
    returns: "Devoluções e Cancelamentos",
    privacy: "Política de Privacidade",
    shipping: "Envio",
    terms: "Termos de Serviço",
    contact: "Contacto",
    help: "Ajuda",
  },
  contact: {
    metaTitle: "Contacto",
    title: "Contacte-nos",
    subtitle:
      "Tem uma pergunta sobre uma encomenda, uma miniatura, ou outra coisa qualquer? Adorávamos ouvir de si.",
    intro:
      "A Pangolin Resinworks somos só nós os dois, por isso cada mensagem recebe uma resposta pessoal e verdadeira — pedimos apenas um pouco de paciência se demorarmos um dia ou dois a responder.",
    emailLabel: "Email",
  },
  faq: {
    metaTitle: "Perguntas Frequentes",
    title: "Perguntas Frequentes",
    subtitle: "Respostas às perguntas que mais nos fazem.",
    items: [
      {
        question: "Onde está a minha encomenda? Quanto tempo demora?",
        answer:
          "Pode ficar descansado, imprimimos, limpamos e enviamos a sua encomenda o mais depressa possível. A Pangolin Resinworks somos só nós os dois, por isso em períodos de maior procura pode formar-se uma pequena fila de espera. O tempo médio de expedição é de 1 a 2 semanas. Se precisar da sua encomenda mais depressa, contacte-nos antes de encomendar e faremos o possível, dentro do razoável, para ajudar!",
      },
      {
        question: "Como são embaladas as minhas miniaturas?",
        answer:
          "Usamos esferovite resistente e leve para acolchoar e proteger as nossas miniaturas durante o envio, juntamente com caixas de parede dupla e reforço extra quando necessário. Testámos praticamente todos os métodos nos últimos dois anos, e esta é a combinação mais eficaz e ecológica que encontrámos. São peças extremamente frágeis e, de vez em quando, há uma baixa durante o transporte — basta avisar-nos de imediato com fotografias do problema e resolveremos a situação com uma substituição ou reembolso. É algo que acontece quando se trabalha com o envio de peças delicadas.\n\nVerifique com atenção se recebeu tudo o que encomendou antes de deitar fora qualquer embalagem — mãos e armas pequenas podem ficar facilmente escondidas lá dentro!",
      },
      {
        question: "Que tipo de cola devo usar?",
        answer:
          "Gostamos de usar cola gel super forte (cianoacrilato em gel). Cola de cimento para plástico não resulta.",
      },
      {
        question: "Que preparação preciso de fazer antes de pintar?",
        answer:
          "As miniaturas já vêm prontas para receber uma demão de primário, mas recomendamos sempre uma lavagem extra rápida com água morna e detergente, seguida de secagem num parapeito ensolarado. Pode pintar diretamente sobre a miniatura, mas recomendamos aplicar primário para um acabamento mais suave e duradouro.",
      },
      {
        question: "Porque é que algumas miniaturas vêm com os suportes de impressão?",
        answer:
          "Enviamos algumas peças especialmente delicadas ou pequenas — como armas — com os suportes de impressão ainda ligados. Descobrimos que, se não o fizermos, as peças partem-se ou perdem-se. Se as mergulhar em água quente durante cerca de 20 segundos, os suportes devem soltar-se facilmente à mão. Vá com calma, devagar, e habitue o olhar a distinguir o que é suporte do que é parte da miniatura. Verifique bem todos os suportes antes de os deitar fora — mãos e armas pequenas podem passar facilmente despercebidas.",
      },
      {
        question: "A minha miniatura está pegajosa ao toque — o que se passa?",
        answer:
          "Por vezes, a humidade na embalagem faz com que a nossa solução de limpeza deixe a superfície um pouco pegajosa. Isto resolve-se com uma lavagem em álcool isopropílico ou simplesmente água quente com detergente — deixe secar num local quente e ensolarado e ficará bem. Muito raramente, miniaturas ocas podem reter solução de limpeza que se liberta durante o transporte; se as suas miniaturas chegarem muito molhadas, aplique o mesmo método.",
      },
    ],
  },
  returns: {
    metaTitle: "Devoluções e Cancelamentos",
    title: "Devoluções e Cancelamentos",
    intro:
      "Lembre-se, somos duas pessoas reais a gerir este pequeno negócio, e por vezes acontecem erros! Precisamente por sermos só nós, temos a liberdade de corrigir a situação e discutir qualquer problema diretamente e com bom senso. Trate-nos com simpatia e paciência — queremos sempre clientes satisfeitos, mesmo quando alguma coisa corre mal pelo caminho.",
    sections: [
      {
        heading: "Cancelamento de Encomendas",
        paragraphs: [
          "Devido à natureza de produção por encomenda (print-to-order), só podemos aceitar cancelamentos dentro de 3 horas após a colocação da encomenda. Depois desse período, o cancelamento pode estar sujeito a uma taxa de reposição de stock de 3€ por artigo.",
          "O período de reflexão de 3 horas é respeitado desde que recebamos o primeiro contacto dentro dessas 3 horas após a colocação da encomenda — por isso não se preocupe se não respondermos de imediato (também precisamos de dormir!).",
          "Esta política existe porque temos um inventário de milhares de produtos e simplesmente não podemos manter stock parado, o que ocuparia um espaço que não temos e que poderá nunca mais ser vendido exatamente na configuração que encomendou. Isso causaria prejuízo financeiro, além de não ser a opção mais sustentável do ponto de vista ambiental.",
          "Se precisar de alterar uma encomenda — quantidades, tamanhos, trocar uma miniatura, etc. — envie-nos um email para customerservice@pangolinresinworks.com o mais rapidamente possível e faremos os possíveis para satisfazer o pedido.",
        ],
      },
      {
        heading: "Devoluções",
        paragraphs: [
          "Por serem artigos feitos por encomenda, só são elegíveis para devolução se chegarem diferentes do descrito, com defeito, ou danificados. Não existe direito de devolução por simples arrependimento depois de a peça entrar em produção (ou seja, após o período de reflexão de 3 horas).",
          "A nossa política pode parecer diferente daquilo a que está habituado nos grandes retalhistas genéricos. Ao abrigo da legislação portuguesa e europeia de defesa do consumidor (Decreto-Lei n.º 24/2014, que transpõe a Diretiva 2011/83/UE relativa aos direitos dos consumidores), o direito de livre resolução de 14 dias não se aplica a bens confecionados segundo as especificações do consumidor ou claramente personalizados — o que abrange todas as miniaturas que imprimimos por encomenda.",
          "Para ter direito a uma devolução por um motivo válido, deve contactar-nos no prazo de 7 dias após a entrega. Ser-lhe-ão pedidas fotografias do artigo tal como o recebeu, juntamente com fotografias da embalagem original (isto ajuda-nos a reclamar junto da transportadora em caso de dano no transporte), além do recibo ou comprovativo de compra.",
          "Para discutir qualquer problema com a sua encomenda, contacte-nos em customerservice@pangolinresinworks.com. Se for necessária uma devolução, enviaremos uma etiqueta de devolução, juntamente com instruções sobre como e para onde enviar a sua encomenda. Artigos devolvidos sem pedido prévio de devolução não serão aceites nem reembolsados.",
        ],
      },
      {
        heading: "Danos e Problemas",
        paragraphs: [
          "Inspecione a sua encomenda assim que a receber e contacte-nos imediatamente se algum artigo estiver com defeito, danificado, ou se tiver recebido o artigo errado, para que possamos avaliar a situação e encontrar uma solução.",
        ],
      },
    ],
  },
  privacy: {
    metaTitle: "Política de Privacidade",
    title: "Política de Privacidade",
    updated: "Última atualização: 16 de agosto de 2026",
    sections: [
      {
        heading: "Quem Somos",
        paragraphs: [
          "A Pangolin Resinworks (Caminho de Sto António nº87, 9020-001 Funchal, Portugal) é um pequeno estúdio, sediado em Portugal e gerido por duas pessoas, que vende miniaturas em resina feitas por encomenda. Pode contactar-nos em customerservice@pangolinresinworks.com.",
        ],
      },
      {
        heading: "Informação que Recolhemos",
        paragraphs: [
          "Quando submete um pedido de encomenda através do nosso formulário de checkout, recolhemos o seu nome completo, endereço de email, número de telefone (opcional), morada de envio, cidade, código postal, país, e quaisquer notas que decida adicionar. Não recolhemos nem armazenamos dados de cartões de pagamento no nosso site — o pagamento é combinado diretamente consigo por email assim que a sua encomenda for confirmada.",
        ],
      },
      {
        heading: "Como Usamos a Sua Informação",
        paragraphs: [
          "Usamos a sua informação para analisar e confirmar pedidos de encomenda, combinar o pagamento e o envio, contactá-lo sobre o estado da sua encomenda, e manter registos para fins contabilísticos e legais.",
        ],
      },
      {
        heading: "Como Armazenamos a Sua Informação",
        paragraphs: [
          "Os dados das encomendas são guardados na nossa base de dados de encomendas. Os emails de notificação de encomendas são enviados através do nosso fornecedor de email. O acesso a estes dados é limitado ao estritamente necessário para gerir a loja.",
        ],
      },
      {
        heading: "Durante Quanto Tempo Guardamos a Sua Informação",
        paragraphs: [
          "Guardamos os registos de encomendas pelo tempo necessário para cumprir a sua encomenda e as nossas obrigações contabilísticas e fiscais nos termos da lei portuguesa — geralmente 10 anos para documentos de faturação e contabilidade. Pode pedir-nos, a qualquer momento, para eliminarmos dados pessoais que já não precisemos de guardar para estes fins.",
        ],
      },
      {
        heading: "Com Quem Partilhamos a Sua Informação",
        paragraphs: [
          "Só partilhamos a sua informação com os fornecedores de serviços que nos ajudam a gerir a loja — atualmente os nossos fornecedores de base de dados de encomendas e de envio de email — e quando exigido por lei. Nunca vendemos os seus dados.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "O nosso site utiliza apenas um pequeno cookie para memorizar a sua preferência de idioma (português ou inglês). Não usamos cookies de rastreio, análise ou publicidade.",
        ],
      },
      {
        heading: "Os Seus Direitos",
        paragraphs: [
          "Ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de aceder, corrigir ou solicitar a eliminação dos seus dados pessoais, bem como de se opor a ou restringir determinados usos dos mesmos. Tem também o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), a entidade reguladora portuguesa. Para exercer qualquer um destes direitos, envie um email para customerservice@pangolinresinworks.com.",
        ],
      },
      {
        heading: "Alterações a Esta Política",
        paragraphs: [
          "Podemos atualizar esta política periodicamente. Quaisquer alterações serão publicadas nesta página.",
        ],
      },
      {
        heading: "Contacte-nos",
        paragraphs: [
          "Tem dúvidas sobre esta política ou sobre os seus dados? Envie-nos um email para customerservice@pangolinresinworks.com.",
        ],
      },
    ],
  },
  terms: {
    metaTitle: "Termos de Serviço",
    title: "Termos de Serviço",
    updated: "Última atualização: 16 de agosto de 2026",
    sections: [
      {
        heading: "Quem Somos",
        paragraphs: [
          "A Pangolin Resinworks (Caminho de Sto António nº87, 9020-001 Funchal, Portugal) é um pequeno estúdio, sediado em Portugal e gerido por duas pessoas, que vende miniaturas em resina feitas por encomenda através deste site. Pode contactar-nos em customerservice@pangolinresinworks.com.",
        ],
      },
      {
        heading: "Aceitação Destes Termos",
        paragraphs: [
          "Ao utilizar este site ou submeter um pedido de encomenda, aceita estes Termos de Serviço, bem como a nossa Política de Privacidade, a Política de Envio e a política de Devoluções e Cancelamentos. Se não concordar com alguma parte destes termos, por favor não utilize o site.",
        ],
      },
      {
        heading: "Pedidos de Encomenda, Não Compra Instantânea",
        paragraphs: [
          "Submeter o formulário de checkout envia-nos um pedido de encomenda — não é um pagamento nem uma venda vinculativa. Analisamos cada pedido e respondemos por email para o confirmar. Só paga pelas miniaturas e pelo envio depois de confirmarmos a encomenda, e a produção só começa depois de recebermos o pagamento. Reservamo-nos o direito de recusar qualquer pedido de encomenda, por exemplo se um artigo estiver indisponível ou se um anúncio contiver um erro.",
        ],
      },
      {
        heading: "Produtos e Natureza de Produção por Encomenda",
        paragraphs: [
          "Todas as miniaturas são impressas em 3D, limpas e acabadas por encomenda em resina. Como cada peça é produzida individualmente e fotografada sob diferentes condições de luz, pequenas variações na cor, nos suportes ou no acabamento em relação às fotografias do produto são normais e não são consideradas defeitos. Os anúncios dos produtos descrevem apenas a miniatura física — não estão incluídas tintas, cola ou outros acessórios, salvo indicação em contrário.",
        ],
      },
      {
        heading: "Licenciamento dos Designs",
        paragraphs: [
          "Os designs (esculturas digitais) das miniaturas que imprimimos são licenciados junto de escultores digitais e estúdios terceiros para venda por impressão sob encomenda — não reivindicamos ter criado nós próprios os designs subjacentes.",
        ],
      },
      {
        heading: "Preços e Pagamento",
        paragraphs: [
          "Os preços são apresentados em euros e podem ser atualizados a qualquer momento; o preço confirmado com a sua encomenda no momento em que a aceitamos é o preço que irá pagar. Não recolhemos nem armazenamos dados de cartões de pagamento neste site — assim que a sua encomenda for confirmada, combinamos o pagamento diretamente consigo por email.",
        ],
      },
      {
        heading: "Envio e Entrega",
        paragraphs: [
          "Os destinos, custos e prazos de envio estão definidos na nossa Política de Envio, que faz parte destes Termos.",
        ],
      },
      {
        heading: "Devoluções e Cancelamentos",
        paragraphs: [
          "O cancelamento de encomendas, as devoluções e a forma como tratamos artigos danificados ou com defeito estão definidos na nossa política de Devoluções e Cancelamentos, que faz parte destes Termos. Como as nossas miniaturas são feitas por encomenda, o direito de livre resolução de 14 dias previsto na UE não se aplica assim que a produção tenha começado.",
        ],
      },
      {
        heading: "Utilização do Site",
        paragraphs: [
          "Compromete-se a utilizar este site apenas para fins lícitos e a não tentar perturbar o seu funcionamento, submeter pedidos de encomenda falsos, ou fazer uso indevido de qualquer conteúdo do site.",
        ],
      },
      {
        heading: "Limitação de Responsabilidade",
        paragraphs: [
          "Somos um pequeno estúdio gerido por duas pessoas e disponibilizamos este site e os nossos produtos tal como se encontram (\"as is\"). Na medida permitida pela lei portuguesa, não somos responsáveis por perdas indiretas ou consequenciais decorrentes da utilização do site ou da sua encomenda. Nada nestes Termos limita qualquer responsabilidade que não possa ser excluída ao abrigo da legislação de defesa do consumidor aplicável.",
        ],
      },
      {
        heading: "Lei Aplicável e Resolução de Litígios",
        paragraphs: [
          "Estes Termos regem-se pela lei portuguesa. Se um litígio não puder ser resolvido diretamente connosco, os consumidores da UE podem também recorrer à plataforma de Resolução de Litígios Online da Comissão Europeia, em ec.europa.eu/consumers/odr, para procurar uma solução extrajudicial.",
        ],
      },
      {
        heading: "Alterações a Estes Termos",
        paragraphs: [
          "Podemos atualizar estes Termos periodicamente. Quaisquer alterações serão publicadas nesta página, e continuar a utilizar o site depois de as alterações serem publicadas significa que aceita os Termos atualizados.",
        ],
      },
      {
        heading: "Contacte-nos",
        paragraphs: [
          "Tem dúvidas sobre estes Termos? Envie-nos um email para customerservice@pangolinresinworks.com.",
        ],
      },
    ],
  },
  shipping: {
    metaTitle: "Política de Envio",
    title: "Política de Envio",
    intro:
      "Cada miniatura que vendemos é impressa, limpa e acabada por encomenda — aqui fica o que pode esperar depois de fazer um pedido.",
    sections: [
      {
        heading: "Tempos de Expedição",
        paragraphs: [
          "O tempo médio de expedição é de 1 a 2 semanas a partir da confirmação e pagamento da encomenda. A Pangolin Resinworks somos só nós os dois, por isso em períodos de maior procura pode formar-se uma pequena fila de espera. Se precisar da sua encomenda mais depressa, contacte-nos antes de encomendar e faremos o possível, dentro do razoável, para ajudar.",
        ],
      },
      {
        heading: "Embalagem",
        paragraphs: [
          "Embalamos todas as encomendas em espuma de esferovite resistente e leve, com caixas de parede dupla e reforço extra quando necessário. É a combinação mais fiável e ecológica que encontrámos ao longo de dois anos a enviar miniaturas em resina.",
        ],
      },
      {
        heading: "Destinos e Custos de Envio",
        paragraphs: [
          "Atualmente enviamos para Portugal e para o resto da União Europeia através dos CTT. O envio custa uma tarifa fixa de 10€ para Portugal e 20€ para o resto da UE, com envio gratuito em encomendas acima de 50€ (Portugal) e 100€ (UE).",
        ],
      },
      {
        heading: "Direitos Alfandegários e de Importação",
        paragraphs: [
          "Encomendas enviadas dentro da União Europeia não estão sujeitas a taxas alfandegárias. Para encomendas enviadas para fora da UE, o pacote pode estar sujeito a direitos alfandegários, impostos ou taxas de importação cobrados pela autoridade aduaneira do país de destino. Estes custos são da responsabilidade do destinatário e não estão incluídos no valor da encomenda ou do envio.",
        ],
      },
      {
        heading: "Encomendas Perdidas, Atrasadas ou Danificadas",
        paragraphs: [
          "Se a sua encomenda chegar danificada, contacte-nos no prazo de 7 dias com fotografias do artigo e da respetiva embalagem — consulte a nossa política de Devoluções e Cancelamentos para o processo completo. Se a sua encomenda não chegar dentro de 15 dias úteis após o envio, contacte-nos e trataremos do assunto junto da transportadora.",
        ],
      },
      {
        heading: "Rastreio",
        paragraphs: [
          "O rastreio é opcional. Ao confirmarmos a sua encomenda, pode escolher uma opção de envio com rastreio por um custo adicional, ou uma opção mais económica sem rastreio. Se escolher envio com rastreio, enviaremos o número de rastreio por email assim que a encomenda for expedida.",
        ],
      },
    ],
  },
  countries: {
    Portugal: "Portugal",
    Austria: "Áustria",
    Belgium: "Bélgica",
    Bulgaria: "Bulgária",
    Croatia: "Croácia",
    Cyprus: "Chipre",
    Czechia: "Chéquia",
    Denmark: "Dinamarca",
    Estonia: "Estónia",
    Finland: "Finlândia",
    France: "França",
    Germany: "Alemanha",
    Greece: "Grécia",
    Hungary: "Hungria",
    Ireland: "Irlanda",
    Italy: "Itália",
    Latvia: "Letónia",
    Lithuania: "Lituânia",
    Luxembourg: "Luxemburgo",
    Malta: "Malta",
    Netherlands: "Países Baixos",
    Poland: "Polónia",
    Romania: "Roménia",
    Slovakia: "Eslováquia",
    Slovenia: "Eslovénia",
    Spain: "Espanha",
    Sweden: "Suécia",
  },
};

export default pt;
