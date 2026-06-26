import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { site } from "@/content/site";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre — ${site.name}` },
      { name: "description", content: `O projeto editorial ${site.name}: manifesto e equipe.` },
      { property: "og:title", content: `Sobre — ${site.name}` },
      { property: "og:description", content: `Manifesto e história do projeto ${site.name}.` },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <Shell>
      <section className="bg-royal text-vanilla px-5 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-12">
          <p className="md:col-span-3 text-[10px] font-bold uppercase tracking-[0.25em] text-canary">
            Quem somos
          </p>
          <div className="md:col-span-9 space-y-6 text-lg md:text-xl leading-relaxed text-vanilla/85 font-light">
            <p>
              O Arquivo é um projeto desenvolvido por estudantes da Universidade Estadual de Londrina (UEL), com o propósito de produzir e disponibilizar conteúdo informativo de interesse público.
            </p>

            <p className="font-bold uppercase tracking-wider text-sm mt-8 mb-2">Equipe</p>
            <p>
              Ana Clara Oliveira Silva<br />
              Eduardo Matsubara Freazin<br />
              Gustavo Manoel<br />
              Malu Pullin<br />
              Manuela Dutil Pereira<br />
              Melissa Zanqueta Cortellassi<br />
              Nathalia Rosa<br />
              Pedro Rodrigues<br />
              Sofia Araújo Bosquesi<br />
              Victoria Del Massa
            </p>

            <p className="text-sm mt-4">
              Projeto orientado pelos professores: Ayoub Hanna Ayoub, Maria Luiza Hoffmann, Rafael Reis e Roberto Mancuzo.
            </p>

            <p className="font-bold uppercase tracking-wider text-sm mt-8 mb-2">Sobre a universidade</p>
            <p>
              A Universidade Estadual de Londrina é uma instituição pública de ensino superior reconhecida pela excelência acadêmica, pela pesquisa e pela extensão universitária. Este projeto integra as atividades desenvolvidas no ambiente universitário, unindo formação profissional e compromisso social.
            </p>
          </div>
        </div>
      </section>

    </Shell>
  );
}