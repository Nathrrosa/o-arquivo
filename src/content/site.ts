import heroRally from "@/assets/hero-rally.jpg";
import podcast01 from "@/assets/podcast-01.jpg";
import podcast02 from "@/assets/podcast-02.jpg";
import podcast03 from "@/assets/podcast-03.jpg";

// ============================================================
// CONTEÚDO EDITÁVEL — edite este arquivo para trocar textos,
// matérias, citações, áudios, vídeos, podcasts e quiz.
// ============================================================

export const site = {
  name: "O Arquivo",
  description:
    "Reportagem multimídia sobre a eleição brasileira de 2026.",
  social: {
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    spotify: "https://open.spotify.com/",
  },
};

export type InlineLink = { text: string; href: string };

export type Block =
  | { type: "paragraph"; text: string; dropCap?: boolean; bold?: boolean; links?: InlineLink[]; emphasis?: string[] }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author: string }
  | { type: "audio"; title: string; src: string; duration?: string }
  | { type: "video"; title: string; embedUrl: string }
  | { type: "embed"; title: string; embedUrl: string; caption?: string; intro?: string }
  | { type: "callout"; title: string; items: string[] }
  | { type: "cta"; text: string }
  | { type: "shortsCarousel"; title?: string; videoIds: string[] }
  | { type: "statsCards" }
  | { type: "aiGrowthInfographic" }
  | { type: "ibictInfographic" }
  | { type: "quiz"; title: string; description: string; href: string };

export type Article = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  assistant?: string;
  date: string;
  cover: string;
  coverAlt: string;
  formats: string;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "desinformacao-e-fact-checking",
    category: "Especial Multimídia",
    title: "Como a desinformação pode mudar os rumos das eleições de 2026",
    subtitle:
      "Em meio ao avanço das redes sociais e da inteligência artificial, a disputa pela informação ganha protagonismo",
    author: "Malu Pullin",
    assistant: "Ana Clara Oliveira Silva, Melissa Zanqueta Cortellassi e Nathalia Rosa",
    date: "19 de Junho, 2026",
    cover: heroRally,
    coverAlt: "Multidão segurando bandeiras ao entardecer em comício político.",
    formats: "Texto, Áudio e Vídeo",
    blocks: [
      {
        type: "paragraph",
        dropCap: true,
        text:
          "O processo eleitoral é um dos mecanismos criados para que a sociedade se organize. É também um símbolo de democracia. No Brasil, 2026 é um ano eleitoral e, segundo dados do Tribunal Superior Eleitoral (TSE), em outubro, mais de 155 milhões de brasileiros vão às urnas. Mas a corrida eleitoral começa muito antes do voto: ela se inicia na disputa pela informação.",
      },
      {
        type: "paragraph",
        text:
          "A menos de seis meses das eleições de 2026, uma das maiores ameaças à democracia brasileira não está nas urnas, está nas telas. O Instituto Locomotiva afirmou em pesquisa que 63% das notícias falsas em que as pessoas acreditam dizem respeito à propostas eleitorais.",
      },
      {
        type: "paragraph",
        text:
          "Segundo dados do IBGE, a desinformação na sociedade brasileira está atrelada ao alcance das redes sociais. De acordo com os dados apresentados, 93% da população com 16 anos ou mais utiliza redes sociais e aplicativos de mensagens, como WhatsApp e Telegram. Entre esses usuários, 72% afirmaram ter tido contato com notícias que suspeitavam ser falsas.",
      },
      {
        type: "statsCards",
      },
      {
        type: "paragraph",
        text:
          "A seguir, entenda o mecanismo da desinformação, os motivos por trás de sua rápida propagação e quais instrumentos — jurídicos, educacionais e individuais — podem ajudar a impedir que a mentira determine o voto.",
      },
      {
        type: "heading",
        text: "Por que mentira vende mais que a verdade?",
      },
      {
        type: "paragraph",
        text:
          "A desinformação não é mais um ruído de fundo nas eleições brasileiras, mas sim um motor calculando que opera antes mesmo das campanhas de voto. É o que revela um estudo do NetLab (UFRJ), ao mapear a sofisticação de um esquema que testa versões de fake news em grupos fechados e de nicho antes de lançá-las em escala industrial nas grandes plataformas. Em um cenário marcado pela circulação acelerada de conteúdos, distingui o que é fato do que foi manipulado se tornou um dos principais desafios para a democracia brasileira nas eleições de 2026.",
        links: [
          {
            text: "estudo",
            href: "https://ufrj.br/2023/09/combate-a-industria-da-desinformacao/",
          },
        ],
      },
      {
        type: "paragraph",
        text:
          "O professor André Azevedo da Fonseca, jornalista e professor Dr. do Departamento de Comunicação na Universidade Estadual de Londrina (UEL), desenvolve pesquisas com foco em temas como imaginário tecnológico e mitologias políticas e nas mídias. Ele explica que, diferente do que muitos imaginam, a desinformação não circula por falha técnica. Ela é, na verdade, o modelo de negócio das plataformas.",
        links: [
          {
            text: "André Azevedo",
            href: "https://www.escavador.com/sobre/363805/andre-azevedo-da-fonseca",
          },
        ],
      },
      {
        type: "quote",
        text:
          "Redes sociais são empresas que lucram com a atenção dos seus usuários [...] Sem o falso, o sensacionalista, sem as fake news, sem o discurso de ódio, a rede social não lucraria tanto quanto lucra.",
        author: "André Azevedo da Fonseca, professor e pesquisador da UEL",
      },
      {
        type: "paragraph",
        text:
          "Fonseca traz também para o debate a questão do rage bait. Segundo ele, a estratégia de incitar o ódio para chamar atenção se tornou uma das principais táticas políticas nas redes.",
        links: [
          {
            text: "rage bait",
            href: "https://corp.oup.com/news/the-oxford-word-of-the-year-2025-is-rage-bait/",
          },
        ],
      },
      {
        type: "heading",
        text: "Campanhas eleitorais e estratégias digitais",
      },
      {
        type: "paragraph",
        text:
          "O uso de estratégias digitais durante o período eleitoral tem se intensificado. Candidatos que antes se restringiam a jornais, debates televisivos e à propaganda eleitoral gratuita passaram a utilizar as redes sociais para divulgar propostas e dialogar diretamente com os participantes. O advogado eleitoral Nilso Paulo aponta o desafio desse cenário: as tecnologias avançam em um ritmo mais acelerado do que a capacidade de adaptação da Justiça Eleitoral consegue acompanhar.",
        links: [
          {
            text: "Nilso Paulo",
            href: "https://www.escavador.com/sobre/2824882/nilso-paulo-da-silva",
          },
        ],
      },
      {
        type: "quote",
        text:
          "Cada vez mais o desafio de trabalhar com tecnologias tem sido bastante relevante […] Essas mudanças demoram um pouco para chegar nos próprios partidos políticos, o que acaba trazendo até um desequilíbrio com a realidade.",
        author: "Nilso Paulo, advogado eleitoral",
      },
      {
        type: "paragraph",
        text:
          'Porém, ele ressalva que o problema não é a tecnologia em si, mas sim o que fazem dela: "Usar ferramentas tecnológicas será cada vez mais importante, porém com muito cuidado para que a ferramenta tecnológica não faça a influência direta na formação da vontade do eleitor."',
        emphasis: ["Usar ferramentas tecnológicas será cada vez mais importante, porém com muito cuidado para que a ferramenta tecnológica não faça a influência direta na formação da vontade do eleitor."],
      },
      {
        type: "paragraph",
        text: "Confira abaixo 5 momentos em que a desinformação prejudicou ou manipulou uma eleição:",
        bold: true,
      },
      {
        type: "shortsCarousel",
        title: "Vídeos: desinformação em pauta",
        videoIds: [
          "6y-RLiPsJ9A",
          "DfEeuypAi7M",
          "8jQ0_D7rpjU",
          "zIxQKO3SPY4",
          "riCt6mgu_XI",
        ],
      },
      {
        type: "heading",
        text: "Polarização e o voto emocional",
      },
      {
        type: "paragraph",
        text:
          "Para Nilso Paulo, o maior problema que será enfrentado nas eleições de 2026 é a polarização extrema, influenciada, também, pela desinformação eleitoral.",
      },
      {
        type: "paragraph",
        text:
          "Ele explica que quando a emoção é influenciada por fake news, o resultado é uma escolha que não reflete o real interesse do eleitor.",
        links: [
          { text: "fake news", href: "https://www.camara.leg.br/tv/camara-debate/678469-fake-news-o" },
        ],
      },
      {
        type: "quote",
        text:
          "Esta é uma eleição que a gente vai encaminhar com uma dicotomia ideológica muito grande, novamente. A polarização acaba atrapalhando muito e tira aquela vontade real do eleitor. O voto tem muita carga de emoção e pouca carga de razão.",
        author: "Nilso Paulo, advogado eleitoral",
      },
      {
        type: "paragraph",
        text:
          'O advogado esclarece que a justiça tem buscado maneiras de reduzir esse problema, como "A proibição do uso de IA 72 horas antes das eleições é um mecanismo de segurança, mas os mecanismos jurídicos ainda são muito tímidos."',
        links: [
          { text: "IA 72 horas", href: "https://g1.globo.com/politica/noticia/2026/03/02/eleicoes-2026-tse-proibe-disseminacao-de-conteudo-novo-feito-por-ia-72-horas-antes-do-pleito.ghtml" },
        ],
      },
      {
        type: "heading",
        text: "A Inteligência Artificial",
      },
      {
        type: "paragraph",
        text:
          "Na última década, esse cenário foi agravado pelo atravessamento da inteligência artificial no nosso cotidiano. Um levantamento do Observatório Lupa mostrou que, em 2024, 4,65% dos conteúdos falsos eram produzidos por IA. Porém, em 2025 esses números já atingiram 25,77%.",
        links: [
          {
            text: "Observatório Lupa",
            href: "https://www.agencialupa.org/noticias/2026/02/05/fakes-com-ia-crescem-308-em-um-ano-revela-estudo-inedito-da-lupa/",
          },
        ],
      },
      {
        type: "aiGrowthInfographic",
      },
      {
        type: "paragraph",
        text:
          'Enquanto as redes sociais tradicionais se alimentavam de cliques, as inteligências artificiais absorvem os dados que entregamos de bandeja. "A gente pergunta coisas e com isso eles vão ter dado sobre os nossos interesses, nossos desejos e isso promove uma um ambiente de controle social individual muito perigoso, inclusive, para nossa autonomia, para nossa experiência como ser humano", explica o professor André Fonseca.',
        emphasis: ["A gente pergunta coisas e com isso eles vão ter dado sobre os nossos interesses, nossos desejos e isso promove uma um ambiente de controle social individual muito perigoso, inclusive, para nossa autonomia, para nossa experiência como ser humano"],
      },
      {
        type: "embed",
        title: "Boletim de Rádio — Desinformação nas Eleições",
        embedUrl: "https://open.spotify.com/embed/episode/0q8T3ZTNMymFlKITNXUgv7?utm_source=generator",
        caption: "Spotify",
        intro: "Como a inteligência artificial influencia as eleições? Ouça e descubra.",
      },
      {
        type: "heading",
        text: "Como a vulnerabilidade social pode afetar as eleições?",
      },
      {
        type: "paragraph",
        text:
          "O pesquisador André Azevedo argumenta que atribuir a onda de desinformação apenas aos mais velhos é etarismo e empobrece o debate. “Eu desconfio que atribuir só aos idosos o estrago que a internet tem feito nas eleições é etarismo. Os mais suscetíveis são as pessoas mais socialmente fragilizadas que não têm muitas outras fontes […] trabalhadores que estão na luta o dia inteiro.”, afirma.",
        emphasis: ["Eu desconfio que atribuir só aos idosos o estrago que a internet tem feito nas eleições é etarismo. Os mais suscetíveis são as pessoas mais socialmente fragilizadas que não têm muitas outras fontes […] trabalhadores que estão na luta o dia inteiro."],
      },
      {
        type: "paragraph",
        text:
          "Ele destaca o conceito do \"trabalhador exausto\": pessoas que passam o dia na luta pela sobrevivência e não possuem tempo livre nem oportunidades de acesso a referências diversas para se educar ou checar informações. Esse público é o alvo ideal para o extremismo, que são alimentados pelo modelo de negócio das redes sociais.",
      },
      {
        type: "paragraph",
        text:
          "Nilso Paulo reforça esse entendimento: “Quanto menos informação, maior a vulnerabilidade. E essa informação é cultural, acadêmica, econômica. Quanto maior a necessidade do cidadão, mais vulnerável ele está no voto.”",
        emphasis: ["Quanto menos informação, maior a vulnerabilidade. E essa informação é cultural, acadêmica, econômica. Quanto maior a necessidade do cidadão, mais vulnerável ele está no voto."],
      },
      {
        type: "paragraph",
        bold: true,
        text: "Você se lembra em quem votou na última eleição? A repórter Victoria Del Massa foi às ruas para descobrir se os cidadãos ainda se lembram.",
      },
      {
        type: "embed",
        title: "Entenda a desinformação nas eleições",
        embedUrl: "https://www.youtube.com/embed/kgJxp1vkELQ",
        caption: "YouTube",
      },
      {
        type: "heading",
        text: "O que o eleitor pode fazer?",
      },
      {
        type: "paragraph",
        text:
          "Ao ser questionado sobre hábitos para verificar informações, a primeira e mais direta recomendação de André Azevedo foi: \"Procurar fontes\". Ele sugere: “Qualquer coisa que chegar, refletir de onde veio essa informação e se certificar se a fonte é confiável.”",
        emphasis: ["Qualquer coisa que chegar, refletir de onde veio essa informação e se certificar se a fonte é confiável."],
      },
      {
        type: "paragraph",
        text:
          "O advogado Nilso Paulo reflete, também, sobre o papel do Estado nessa questão: “O eleitor vai ter que ficar correndo atrás disso? Não. Precisamos de mecanismos jurídicos mais rigorosos e ferramentas de checagem pela própria Justiça Eleitoral.”",
        emphasis: ["O eleitor vai ter que ficar correndo atrás disso? Não. Precisamos de mecanismos jurídicos mais rigorosos e ferramentas de checagem pela própria Justiça Eleitoral."],
      },
      {
        type: "paragraph",
        text:
          'Ele menciona uma novidade para 2026: o novo presidente do TSE, ministro Nunes Marques, sinalizou que universidades e faculdades devem ser chamadas para auxiliar na checagem de informações. "Vamos torcer para que essas ferramentas sejam eficientes."',
        emphasis: ["Vamos torcer para que essas ferramentas sejam eficientes."],
      },
      {
        type: "paragraph",
        text:
          "Entre algoritmos, inteligência artificial e polarização, o combate à desinformação se tornou um desafio que ultrapassa as telas e atinge diretamente a democracia brasileira.",
      },
      {
        type: "heading",
        text: "Fique esperto, não caia em fake news!",
      },
      {
        type: "paragraph",
        text:
          "É importante se manter atento aos sinais de que uma “notícia” pode ter um viés falso ou tendencioso. Uma pesquisa do Datasenado revelou o que os brasileiros pensam sobre esse assunto:",
      },
      {
        type: "ibictInfographic",
      },
      {
        type: "paragraph",
        text: "Em 2016 foi criado um sistema de checagem de fatos reconhecido internacionalmente. O Código de Princípios da IFCN é um conjunto de diretrizes éticas que orienta os processos de verificação de notícias. Atualmente, três agências brasileiras fazem parte da IFCN e possuem o selo ativo: Agência Lupa, Aos Fatos e Estadão Verifica.",
        links: [
          { text: "Agência Lupa", href: "https://www.agencialupa.org/" },
          { text: "Aos Fatos", href: "https://www.aosfatos.org/" },
          { text: "Estadão Verifica", href: "https://www.estadao.com.br/estadao-verifica/?srsltid=AfmBOoq5jNc6Z33Nae2qtOz5ojqm6MQwDoqftIdaqGAA0gGfiGKwJokC" },
        ],
      },
      {
        type: "paragraph",
        text: "Esses três portais concordam com os princípios da IFCN, que são: apartidarismo e imparcialidade; transparência das fontes; transparência do financiamento e da organização; transparência da metodologia; e política de correções aberta e honesta.\n\nAssim, esses veículos podem ser usados como referência na busca pela veracidade das informações.",
      },
      {
        type: "paragraph",
        bold: true,
        text: "É importante estar atento a sinais de que uma notícia pode ser enganosa. Separamos algumas recomendações para você não cair em fake news:",
      },

      {
        type: "embed",
        title: "Podcast: Entenda a desinformação nas eleições",
        embedUrl: "https://open.spotify.com/embed/episode/6DjYfX9uW6Vmh03dKq4YkW?utm_source=generator",
        caption: "Spotify",
      },
      {
        type: "cta",
        text: "Agora é sua vez: responda ao quiz e teste seus conhecimentos.",
      },
      {
        type: "quiz",
        title: "Você sabe reconhecer uma fake news?",
        description:
          "Teste sua percepção com manchetes sobre as eleições de 2026 e descubra como a desinformação tenta parecer confiável.",
        href: "/quiz",
      },
    ],
  },
];

export type Episode = {
  number: number;
  season: number;
  title: string;
  description: string;
  cover: string;
  duration: string;
  date: string;
  spotifyUrl?: string;
};

export const episodes: Episode[] = [
  {
    number: 4,
    season: 1,
    title: "Boletim Serviço - Grupo 8",
    description:
      "Boletim de serviço de rádio do Grupo 8 — Observatório de Desinformação e Fact-checking.",
    cover: podcast01,
    duration: "2 min",
    date: "16 Jun 2026",
    spotifyUrl: "https://open.spotify.com/episode/6DjYfX9uW6Vmh03dKq4YkW",
  },
  {
    number: 3,
    season: 1,
    title: "Boletim de Rádio — Desinformação nas Eleições",
    description:
      "Boletim de serviço de rádio sobre desinformação, fact-checking e as eleições de 2026.",
    cover: podcast02,
    duration: "2 min",
    date: "16 Jun 2026",
    spotifyUrl: "https://open.spotify.com/episode/0q8T3ZTNMymFlKITNXUgv7",
  },
];

export type QuizQuestion = {
  id: string;
  headline: string;
  standfirst?: string;
  answer: "true" | "false";
  feedback: string;
  signal: { icon: string; label: string };
};

export const quiz: { title: string; intro: string; questions: QuizQuestion[] } = {
  title: "Você sabe reconhecer uma fake news?",
  intro:
    "Teste sua percepção com manchetes sobre as eleições de 2026 e descubra como a desinformação tenta parecer confiável.",
  questions: [
    {
      id: "q1",
      headline:
        "TSE aprova calendário eleitoral e regulamenta uso de IA nas Eleições 2026",
      standfirst:
        "Plenário do Tribunal aprovou resoluções que vão orientar o pleito deste ano",
      answer: "true",
      feedback:
        "A manchete apresenta linguagem objetiva, cita uma instituição oficial e trata de um tema que realmente está sendo debatido nas eleições.",
      signal: { icon: "✔️", label: "Informação confiável" },
    },
    {
      id: "q2",
      headline:
        "URGENTE: Eleitores que não votarem em 2026 terão CPF suspenso automaticamente",
      standfirst:
        "Publicações nas redes sociais afirmam que a Justiça Eleitoral aplicará punições imediatas aos eleitores ausentes.",
      answer: "false",
      feedback:
        "Atenção! Fake news costumam usar medo, punições exageradas e tom alarmista para provocar compartilhamentos impulsivos.",
      signal: { icon: "🚨", label: "Fique atento" },
    },
    {
      id: "q3",
      headline:
        "Redes sociais no radar: influenciadores podem ser punidos nas eleições de 2026",
      standfirst:
        "Atuação desses criadores de conteúdo, especialmente em períodos eleitorais, passou a ser vista como um ponto de atenção",
      answer: "true",
      feedback:
        "A participação de influenciadores nas campanhas é uma preocupação crescente e já gera debates sobre regulamentação.",
      signal: { icon: "🔍", label: "Verifique a fonte" },
    },
    {
      id: "q4",
      headline:
        "Especialistas alertam que urnas eletrônicas serão conectadas à internet para agilizar contagem de votos em 2026",
      standfirst:
        "Pesquisadores afirmam que o novo sistema permitiria transmissão online dos votos em tempo real",
      answer: "false",
      feedback:
        "Desconfie quando a manchete cita \"especialistas\" sem dizer quem são ou apresentar estudos.",
      signal: { icon: "⚠️", label: "Atenção: falsa autoridade" },
    },
    {
      id: "q5",
      headline:
        "TSE proíbe propaganda eleitoral gerada por inteligência artificial 72 horas antes da votação",
      standfirst:
        "Conteúdos manipulados deverão indicar que foram fabricados e qual tecnologia foi usada",
      answer: "true",
      feedback:
        "O crescimento de deepfakes e conteúdos manipulados fez a Justiça Eleitoral criar novas regras para as eleições de 2026.",
      signal: { icon: "✔️", label: "Informação confiável" },
    },
  ],
};
