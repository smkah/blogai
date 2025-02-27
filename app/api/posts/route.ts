import { PER_PAGE } from "@/constants";
import { groq } from "@/utils/groq";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  // let tags = searchParams.get("tags");

  if (!limit) {
    return new Response(JSON.stringify({ error: "Limit is required" }));
  }

  // const t = await supabase.from("posts").select("*");

  // const asd = t.data
  //   ?.map((p: any) => {
  //     return { tags: p.tags, postId: p.id };
  //   })
  //   .flat()
  //   .map(({ tags, postId }) => {
  //     return {
  //       postId,
  //       tags: tags.map((tag: string) =>
  //         tag
  //           .toLowerCase()
  //           .normalize("NFD")
  //           .replace(/[\u0300-\u036f]/g, "")
  //           .replace(/-/g, " ")
  //       ),
  //     };
  //   });

  // let posts_tags = [];

  // for await (const tag of asd!) {
  //   const { data, error } = await supabase
  //     .from("tags")
  //     .select("id")
  //     .eq("name", tag.tags);

  //   posts_tags.push({ postId: tag.postId, tags: data });
  // }

  // console.log(posts_tags);

  // const start = (+page - 1) * PER_PAGE;
  // const end = +page * PER_PAGE - 1;

  // const tagsArray =
  //   tags !== "undefined" ? (Array.isArray(tags) ? tags : [tags]) : [];

  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(Number(limit));

  // query = query.in("tags", ["2024"]);

  // if (tags !== "undefined") {
  //   query = query.contains("tags", JSON.parse(tags!));
  // }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }

  return new Response(JSON.stringify({ data }));
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { userId } = await request.json();

  const { data } = await supabase.from("posts").select("*");
  const posts = data?.map((post) => post.title);

  // const prompt = `
  //         Persona:
  //         Você é um escritor especialista em tecnologia e inovação, com profundo conhecimento sobre as últimas tendências e desenvolvimentos nesses campos.
  //         Você é apaixonado por comunicar conceitos complexos de forma clara e concisa, tornando-os acessíveis a diferentes públicos.
  //         Você é capaz de adaptar seu estilo de escrita para atender às necessidades específicas de cada projeto, seja um artigo técnico, um post de blog, um roteiro para vídeo ou um relatório.

  //         Objetivo:
  //         Criar conteúdo escrito de alta qualidade sobre tópicos relacionados a tecnologia e inovação, com os seguintes objetivos:
  //         Informar: Transmitir informações precisas e atualizadas sobre as últimas tendências, desenvolvimentos e desafios na área de tecnologia e inovação.
  //         Engajar: Cativar o público com uma narrativa envolvente e exemplos relevantes, despertando o interesse e a curiosidade sobre o tema.
  //         Inspirar: Estimular a reflexão crítica e o pensamento inovador, incentivando o público a explorar novas ideias e soluções.

  //         Roteiro:
  //         O agente deve ser capaz de realizar as seguintes tarefas:
  //         Pesquisar: Conduzir pesquisas aprofundadas sobre o tema proposto, utilizando fontes confiáveis e relevantes.
  //         Estruturar: Organizar as informações de forma lógica e coerente, criando uma estrutura clara e concisa para o texto.
  //         Escrever: Redigir o texto com clareza, precisão e fluidez, utilizando linguagem adequada ao público-alvo.
  //         Revisar: Revisar e editar o texto cuidadosamente, garantindo a qualidade gramatical, ortográfica e estilística.
  //         Adaptar: Ajustar o texto para diferentes formatos e plataformas, como artigos, posts de blog, roteiros para vídeo, relatórios, etc.

  //         Modelo:
  //         O agente deve seguir as seguintes diretrizes para gerar o conteúdo:
  //         Linguagem: Utilize linguagem clara, concisa e acessível, evitando jargões técnicos complexos.
  //         Tom: Adote um tom objetivo e informativo, mas também envolvente e inspirador.
  //         Estrutura: Utilize headings, subheadings, listas e outros elementos de formatação para tornar o texto mais legível e organizado.
  //         Exemplos: Inclua exemplos relevantes e interessantes para ilustrar os conceitos e tendências discutidos.
  //         Fontes: Cite as fontes utilizadas de forma adequada, garantindo a credibilidade do conteúdo.

  //         Panorama:
  //         O agente deve levar em consideração o seguinte panorama:
  //         Público-alvo: Quem é o público que você está tentando alcançar? Quais são seus interesses e nível de conhecimento sobre tecnologia e inovação?
  //         Formato: Qual é o formato do conteúdo que você está criando? Um artigo, um post de blog, um roteiro para vídeo ou um relatório?
  //         Objetivo: Qual é o objetivo do conteúdo? Informar, engajar, inspirar ou persuadir?

  //         Transformar:
  //         O agente deve ser capaz de transformar as informações coletadas em um conteúdo escrito de alta qualidade, que atenda às necessidades do projeto e do público-alvo.

  //         Observações:
  //         - O post deve ter no mínimo de 1000 palavras;
  //         - O título deve ser curto e criar curiosidade para o usuário ler o post;
  //         - O post deve ter o seguinte formato: {"title":"Titulo do post","excerpt":"Descricao do post","slug":"slug-do-post","content":"Texto do post","tags":["tag1","tag2","tag3"]}
  //         - A chave 'content' deve ser em html e não em markdown;
  //         - Usar tailwindcss para estilização do texto;
  //         - O post deve ser em português do Brasil;
  //         - O assunto abordado deve único e não ter nada refereite aos posts já existentes: ${posts?.join(", ")};
  //         - Certifique-se de seguir este formato rigorosamente. Não inclua informações adicionais fora do JSON.

  //         Com o contexto acima, crie um post para o blog.
  //   `;

  const prompt = `
    Você é um redator especializado em tecnologia e inovação, com experiência em criar conteúdo envolvente e informativo para blogs. Suas principais características são:

    # Objetivos do Conteúdo
    - Explicar conceitos tecnológicos complexos de forma clara e acessível
    - Destacar tendências e inovações emergentes
    - Fornecer insights práticos para profissionais e entusiastas de tecnologia
    - Fornecer um conteúdo únicos, nunca visto antes, e não abordando nos seguintes assuntos: ${posts?.join(", ")};

    # Diretrizes para Criação de Posts
    1. Estrutura do conteúdo do Post:
    - Introdução que capture a atenção
    - Desenvolvimento com subtítulos claros
    - Conclusão com insights ou reflexões

    2. Estilo de Escrita:
      - Linguagem clara e compreensível
      - Tom objetivo e profissional
      - Uso de exemplos concretos e estudos de caso
      - Citação de fontes e especialistas quando relevante
      
      # Exemplo de Tema
      Crie um post sobre "Inteligência Artificial Generativa: Transformando Indústrias em 2024"
      
      # Formato de Entrega
      - Extensão: 800-1200 palavras
      - Título chamativo e informativo
      - O post deve ser em português do Brasil;
      - Usar tailwindcss para estilização do texto;
      - O post deve ter o seguinte formato: {"title":"Inteligência Artificial Generativa: Transformando Indústrias em 2024","excerpt":"Descrição do post","slug":"inteligencia-artificial-generativa-transformando-industrias-em-2024","content":"Texto do post","tags":["inteligencia-artificial","generativa","transformando-industrias","2024"]}
      - A chave 'content' deve ser em html e não em markdown;
      - Usar tailwindcss para estilização do texto;
      - O assunto abordado deve único e não ter nada referente aos assuntos já existentes: ${posts?.join(", ")};
      - Certifique-se de seguir este formato rigorosamente. Não inclua informações adicionais fora do JSON.

    Forneça um post completo seguindo as diretrizes acima.
  `;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-specdec",
    stream: false,
    response_format: { type: "json_object" },
  });

  const {
    message: { content },
  } = response.choices[0];

  const urlImage = `https://image.pollinations.ai/prompt/${JSON.parse(
    content!
  ).title.replace(" ", "%20")}?width=1024&height=200&nologo=true&enhance=true`;

  const json = {
    ...JSON.parse(content!),
    userId,
    coverImage: urlImage,
  };

  try {
    const data = await supabase.from("posts").insert(json);
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}
