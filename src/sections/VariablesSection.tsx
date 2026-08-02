import { motion, useReducedMotion } from "framer-motion";
import { Box, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { ActionButton } from "@/components/ActionButton";
import { CodeBlock } from "@/components/CodeBlock";
import { OutputPanel } from "@/components/OutputPanel";
import {
  PresentationSection,
  type SectionProps,
} from "@/components/PresentationSection";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  cleanInput,
  parseWholeNumber,
  printInteger,
  printText,
  stringLiteral,
} from "@/lib/simulate";

const DEFAULT_NAME = "Ali";
const DEFAULT_AGE = "18";

/** Slide 05 — variables as labelled boxes the learner can refill. */
export function VariablesSection({ index, registerRef }: SectionProps) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState(DEFAULT_NAME);
  const [age, setAge] = useState(DEFAULT_AGE);

  const safeName = name.trim() === "" ? DEFAULT_NAME : name;
  const safeAge = parseWholeNumber(age, Number(DEFAULT_AGE));

  const code = useMemo(
    () =>
      [
        `name = ${stringLiteral(safeName)}`,
        `age = ${safeAge}`,
        "",
        "print(name)",
        "print(age)",
      ].join("\n"),
    [safeName, safeAge],
  );

  const output = [printText(safeName), printInteger(safeAge)];

  return (
    <PresentationSection
      index={index}
      registerRef={registerRef}
      eyebrow="Storing values"
      title="Variables"
      lead="A variable stores information so we can use it later."
      width="wide"
    >
      <div className="grid items-start gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="min-w-0">
          <Reveal delay={0.22}>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
              <StorageBox
                label="name"
                value={stringLiteral(safeName)}
                accent="blue"
                reduceMotion={reduceMotion}
              />
              <StorageBox
                label="age"
                value={String(safeAge)}
                accent="yellow"
                reduceMotion={reduceMotion}
              />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                id="variable-name"
                label="Change the name"
                value={name}
                onChange={(next) => setName(cleanInput(next, 18))}
                placeholder={DEFAULT_NAME}
              />
              <Field
                id="variable-age"
                label="Change the age"
                value={age}
                onChange={(next) => setAge(cleanInput(next, 3))}
                placeholder={DEFAULT_AGE}
                inputMode="numeric"
              />
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <ActionButton
              icon={RotateCcw}
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setName(DEFAULT_NAME);
                setAge(DEFAULT_AGE);
              }}
            >
              Reset
            </ActionButton>
          </Reveal>
        </div>

        <div className="grid min-w-0 gap-4">
          <Reveal delay={0.26}>
            <CodeBlock
              code={code}
              fileName="variables.py"
              size="md"
              showLineNumbers
            />
          </Reveal>
          <Reveal delay={0.34}>
            <OutputPanel lines={output} minLines={2} placeholder="" />
          </Reveal>
        </div>
      </div>
    </PresentationSection>
  );
}

/** A labelled box holding one value — the mental model for a variable. */
function StorageBox({
  label,
  value,
  accent,
  reduceMotion,
}: {
  label: string;
  value: string;
  accent: "blue" | "yellow";
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative flex-1">
      <span
        className={cn(
          "absolute -top-2.5 left-4 z-10 rounded-md border px-2.5 py-0.5 font-mono text-[0.78rem]",
          accent === "blue"
            ? "border-py-blue/45 bg-navy-900 text-py-blue"
            : "border-py-yellow/45 bg-navy-900 text-py-yellow",
        )}
      >
        {label}
      </span>

      <div
        className={cn(
          "flex min-h-[clamp(6rem,14vh,8.5rem)] items-center gap-3 rounded-2xl border bg-navy-900/55 px-4 pt-5 pb-4 sm:px-5",
          accent === "blue" ? "border-py-blue/25" : "border-py-yellow/25",
        )}
      >
        <Box
          aria-hidden="true"
          className={cn(
            "h-5 w-5 shrink-0",
            accent === "blue" ? "text-py-blue/60" : "text-py-yellow/60",
          )}
        />
        <motion.span
          key={value}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 truncate font-mono text-[clamp(1.05rem,1.9vw,1.85rem)] text-chalk"
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[0.72rem] tracking-[0.2em] text-dim uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-xl border border-line bg-navy-950/70 px-4 py-3 font-mono text-[clamp(0.95rem,1.15vw,1.2rem)] text-chalk transition-colors duration-200 placeholder:text-dim hover:border-py-blue/40 focus:border-py-blue/70 focus:outline-none"
      />
    </div>
  );
}
