import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { quiz, site } from "@/content/site";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: `${quiz.title} — ${site.name}` },
      { name: "description", content: quiz.intro },
      { property: "og:title", content: quiz.title },
      { property: "og:description", content: quiz.intro },
      { property: "og:url", content: "/quiz" },
    ],
    links: [{ rel: "canonical", href: "/quiz" }],
  }),
  component: QuizPage,
});

type Answer = { id: string; correct: boolean; signal: string };

function QuizPage() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<"true" | "false" | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const total = quiz.questions.length;
  const current = step >= 0 && step < total ? quiz.questions[step] : null;

  function pick(value: "true" | "false") {
    if (picked || !current) return;
    setPicked(value);
    const correct = value === current.answer;
    setAnswers((a) => [
      ...a,
      { id: current.id, correct, signal: current.signal.label },
    ]);
  }

  function next() {
    setPicked(null);
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers([]);
    setPicked(null);
    setStep(0);
  }

  const correctCount = answers.filter((a) => a.correct).length;
  const missedSignals = Array.from(
    new Set(answers.filter((a) => !a.correct).map((a) => a.signal)),
  );

  return (
    <Shell>
      <section className="bg-royal text-vanilla px-5 md:px-10 py-16 md:py-24 min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto">

          {/* QUESTION */}
          {current && (
            <div key={step} className="reveal">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-canary mb-5">
                Verdadeiro ou Falso?
              </p>
              {/* progress */}
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-vanilla/60 whitespace-nowrap">
                  {step + 1} / {total}
                </span>
                <div className="flex-1 h-1.5 bg-vanilla/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-canary transition-all duration-500 ease-out"
                    style={{ width: `${((step + (picked ? 1 : 0)) / total) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-vanilla/60 mb-5">
                Manchete
              </p>
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] mb-5">
                “{current.headline}”
              </h2>
              {current.standfirst && (
                <p className="italic text-base md:text-lg text-vanilla/75 leading-relaxed mb-10">
                  {current.standfirst}
                </p>
              )}

              {/* buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
                {(["true", "false"] as const).map((val) => {
                  const isPicked = picked === val;
                  const isCorrectAnswer = current.answer === val;
                  const showState = picked !== null;
                  let cls =
                    "border-vanilla/25 hover:border-canary hover:bg-canary hover:text-royal";
                  if (showState && isCorrectAnswer)
                    cls = "border-canary bg-canary text-royal";
                  else if (showState && isPicked && !isCorrectAnswer)
                    cls = "border-vanilla/40 bg-vanilla/10 text-vanilla/60 line-through";
                  else if (showState)
                    cls = "border-vanilla/15 text-vanilla/40";
                  return (
                    <button
                      key={val}
                      onClick={() => pick(val)}
                      disabled={picked !== null}
                      className={`py-6 md:py-7 text-xl md:text-2xl font-bold uppercase tracking-[0.18em] border-2 rounded-sm transition-all active:scale-[0.98] disabled:cursor-default ${cls}`}
                    >
                      {val === "true" ? "Verdadeiro" : "Falso"}
                    </button>
                  );
                })}
              </div>

              {/* feedback */}
              {picked && (
                <div className="reveal border-t border-vanilla/15 pt-8">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] rounded-full ${
                        picked === current.answer
                          ? "bg-canary text-royal"
                          : "bg-vanilla text-royal"
                      }`}
                    >
                      {picked === current.answer ? "✔️ Você acertou" : "✖️ Não foi dessa vez"}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] rounded-full border border-canary/60 text-canary">
                      {current.signal.icon} {current.signal.label}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-vanilla/90 leading-relaxed mb-8">
                    {current.feedback}
                  </p>
                  <button
                    onClick={next}
                    className="px-8 py-5 bg-canary text-royal text-sm font-bold uppercase tracking-[0.18em] hover:bg-vanilla active:scale-[0.98] transition-all rounded-sm"
                  >
                    {step + 1 === total ? "Ver resultado →" : "Próxima →"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RESULT */}
          {step >= total && (
            <div className="reveal">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-canary mb-6">
                Resultado
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-vanilla/60 mb-3">
                RESULTADO: VOCÊ É UM
              </p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] mb-4">
                {correctCount <= 1
                  ? "Compartilhador Impulsivo"
                  : correctCount <= 3
                    ? "Leitor Cauteloso"
                    : correctCount === 4
                      ? "Analisador"
                      : "Detector de Fake News"}
              </h2>
              <div className="mb-10 max-w-2xl">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-canary">
                    Seu desempenho
                  </span>
                  <span className="font-serif text-2xl md:text-3xl text-vanilla">
                    <span className="text-canary">{correctCount}</span>
                    <span className="text-vanilla/60"> / {total}</span>
                    <span className="text-vanilla/60 text-base md:text-lg ml-2">
                      acerto{correctCount === 1 ? "" : "s"}
                    </span>
                  </span>
                </div>
                <div
                  className="h-2 bg-vanilla/15 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={correctCount}
                >
                  <div
                    className="h-full bg-canary transition-all duration-700 ease-out"
                    style={{ width: `${(correctCount / total) * 100}%` }}
                  />
                </div>
              </div>
              <p className="italic text-lg md:text-xl text-vanilla/85 mb-10 leading-relaxed max-w-2xl">
                {correctCount <= 1
                  ? "Você tende a confiar rapidamente em conteúdos alarmantes ou emocionais. Antes de compartilhar, vale verificar a fonte da informação."
                  : correctCount <= 3
                    ? "Você já percebeu alguns sinais de desinformação, mas algumas manchetes ainda conseguem parecer confiáveis."
                    : correctCount === 4
                      ? "Você demonstra atenção aos sinais de credibilidade e costuma analisar informações antes de acreditar nelas."
                      : "Você identificou os principais sinais de desinformação e mostrou atenção às estratégias usadas em conteúdos enganosos."}
              </p>

              <div className="border-t border-vanilla/15 pt-8 mb-10">
                <p className="text-base md:text-lg text-vanilla/90 leading-relaxed max-w-2xl">
                  Em períodos eleitorais, informações falsas costumam circular mais rápido e explorar medo, urgência e emoção. Verificar fontes e desconfiar de conteúdos alarmistas é parte fundamental da participação democrática.
                </p>
              </div>

              <button
                onClick={restart}
                className="px-8 py-5 bg-canary text-royal text-sm font-bold uppercase tracking-[0.18em] hover:bg-vanilla active:scale-[0.98] transition-all rounded-sm"
              >
                Refazer o quiz
              </button>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}