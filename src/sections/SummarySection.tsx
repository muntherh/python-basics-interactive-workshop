import { motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import {
  PresentationSection,
  type SectionProps,
} from "@/components/PresentationSection";
import { Reveal } from "@/components/Reveal";
import { SUMMARY_CONCEPTS } from "@/data/lesson";
import { SLIDE_INDEX } from "@/data/slides";
import { useDeck } from "@/hooks/useDeckContext";

/** Slide 12 — everything covered, the closing line, and the way back. */
export function SummarySection({ index, registerRef }: SectionProps) {
  const reduceMotion = useReducedMotion();
  const { goTo, restart, quizResult } = useDeck();

  return (
    <PresentationSection
      index={index}
      registerRef={registerRef}
      eyebrow="Wrap up"
      title="Summary"
      lead="Here is everything we covered. Click any concept to go back to it."
      width="wide"
    >
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {SUMMARY_CONCEPTS.map((concept, conceptIndex) => (
          <li key={concept.id}>
            <motion.button
              type="button"
              onClick={() => goTo(concept.slideIndex)}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : conceptIndex * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className="glass glass-hover flex h-full w-full cursor-pointer flex-col gap-2 rounded-2xl p-4 text-left sm:p-5"
            >
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ok/45 bg-ok/12 text-ok"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-[clamp(0.92rem,1.2vw,1.25rem)] text-chalk">
                  {concept.label}
                </span>
              </span>
              <span className="text-[clamp(0.82rem,1vw,1.05rem)] leading-snug text-mist">
                {concept.recap}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      <Reveal delay={0.2}>
        <div className="mt-[clamp(1.25rem,3.5vh,2.5rem)] grid items-center gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div>
            <p className="text-[clamp(1.15rem,2.1vw,2.1rem)] leading-tight font-medium tracking-tight text-chalk">
              You have completed your first introduction to Python.
            </p>
            <p className="mt-2 text-[clamp(0.92rem,1.15vw,1.2rem)] text-mist">
              Next step: open a Python editor and print something of your own.
            </p>
          </div>

          {quizResult ? (
            <div className="flex items-center gap-4 rounded-2xl border border-py-yellow/35 bg-py-yellow/6 px-5 py-4">
              <Sparkles
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-py-yellow"
              />
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.24em] text-dim uppercase">
                  Quiz score
                </p>
                <p className="mt-0.5 font-mono text-[clamp(1.35rem,2.2vw,2rem)] text-chalk tabular-nums">
                  <span className="text-py-yellow">{quizResult.score}</span>
                  <span className="mx-1 text-dim">/</span>
                  <span className="text-dim">{quizResult.total}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[clamp(0.88rem,1.05vw,1.08rem)] text-dim">
              Finish the quiz to see your score here.
            </p>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-[clamp(1.1rem,3vh,2rem)] flex flex-wrap gap-3">
          <ActionButton variant="accent" icon={RotateCcw} onClick={restart}>
            Restart Presentation
          </ActionButton>
          <ActionButton
            variant="outline"
            onClick={() => goTo(SLIDE_INDEX["what-is-python"] ?? 1)}
          >
            Review Concepts
          </ActionButton>
        </div>
      </Reveal>
    </PresentationSection>
  );
}
