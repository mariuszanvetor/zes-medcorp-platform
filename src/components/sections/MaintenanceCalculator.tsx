"use client";

import { useMemo, useState } from "react";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { Button } from "@/components/ui/Button";

type EquipmentType =
  | "imagistica"
  | "radiologie"
  | "ecografe"
  | "laborator"
  | "multimarca";

const equipmentOptions: Array<{ value: EquipmentType; label: string; weight: number }> = [
  { value: "imagistica", label: "Imagistica medicala", weight: 4 },
  { value: "radiologie", label: "Radiologie digitala", weight: 3 },
  { value: "ecografe", label: "Ecografe", weight: 2 },
  { value: "laborator", label: "Laborator / IVD", weight: 3 },
  { value: "multimarca", label: "Inventar multimarca", weight: 4 },
];

function getMaintenancePlan(devices: number, locations: number, type: EquipmentType) {
  const typeWeight = equipmentOptions.find((item) => item.value === type)?.weight ?? 2;
  const score = devices * 1.2 + locations * 2 + typeWeight * 2;

  if (score >= 28) {
    return {
      level: "Plan prioritar multi-locatie",
      visits: "4+ vizite preventive / an, cu prioritizare pe echipamente critice",
      response: "Nivel de raspuns accelerat, stabilit contractual dupa inventar",
      focus: ["flota mare sau critica", "downtime cu impact operational", "responsabilitati clare pe locatie"],
      score: Math.min(100, Math.round(score * 3.2)),
    };
  }

  if (score >= 16) {
    return {
      level: "Plan operational",
      visits: "2-4 vizite preventive / an, in functie de echipamente si utilizare",
      response: "Prioritate medie spre ridicata pentru cazuri care afecteaza programul clinicii",
      focus: ["continuitate operationala", "revizii planificate", "triere rapida pentru defecte recurente"],
      score: Math.round(score * 3.4),
    };
  }

  return {
    level: "Plan preventiv de baza",
    visits: "1-2 vizite preventive / an, cu evaluare initiala a inventarului",
    response: "Raspuns standard, cu optiune de prioritate pentru echipamente critice",
    focus: ["inventar compact", "preventie de baza", "clarificarea riscurilor principale"],
    score: Math.round(score * 3.6),
  };
}

export function MaintenanceCalculator({
  sourcePage = "/contracte-mentenanta",
}: {
  sourcePage?: string;
}) {
  const [devices, setDevices] = useState(6);
  const [locations, setLocations] = useState(1);
  const [equipmentType, setEquipmentType] = useState<EquipmentType>("imagistica");

  const plan = useMemo(
    () => getMaintenancePlan(devices, locations, equipmentType),
    [devices, equipmentType, locations],
  );

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_22px_60px_rgba(15,65,118,0.08)] sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
            Calculator mentenanta
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Estimeaza nivelul de contract potrivit.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Rezultatul este orientativ si ajuta la prima discutie comerciala.
            Planul final depinde de inventar, producatori, piese, istoric si
            conditii reale de exploatare.
          </p>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Numar echipamente: {devices}
              </span>
              <input
                className="accent-[#0057b8]"
                max={50}
                min={1}
                onChange={(event) => setDevices(Number(event.target.value))}
                type="range"
                value={devices}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Numar locatii: {locations}
              </span>
              <input
                className="accent-[#0057b8]"
                max={8}
                min={1}
                onChange={(event) => setLocations(Number(event.target.value))}
                type="range"
                value={locations}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Tip echipamente
              </span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setEquipmentType(event.target.value as EquipmentType)}
                value={equipmentType}
              >
                {equipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <article className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Recomandare orientativa
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                {plan.level}
              </h3>
            </div>
            <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-white">
              <p className="text-xs text-slate-300">criticitate</p>
              <p className="text-2xl font-semibold">{plan.score}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-xl border border-blue-100 bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">Ritm recomandat</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{plan.visits}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">Nivel de raspuns</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{plan.response}</p>
            </div>
          </div>

          <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700">
            {plan.focus.map((item) => (
              <li className="flex items-start gap-2" key={item}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="#solicitare-mentenanta" size="md">
              Cere oferta mentenanta
            </Button>
            <OpenZESButton
              ctaLabel="Discutie mentenanta din calculator"
              pageIntent="maintenance-calculator"
              prompt={`Am ${devices} echipamente, ${locations} locatii si caut contract de mentenanta pentru ${equipmentOptions.find((item) => item.value === equipmentType)?.label}.`}
              size="md"
              sourcePage={sourcePage}
              variant="secondary"
            >
              Discuta cu ZES
            </OpenZESButton>
          </div>
        </article>
      </div>
    </div>
  );
}
