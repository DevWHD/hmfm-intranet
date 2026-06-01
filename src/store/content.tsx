import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { branding as defaultBranding, type Branding } from "@/data/branding";
import { notices as defaultNotices, type Notice } from "@/data/notices";
import { todayShifts as defaultTodayShifts, weekSchedule as defaultWeekSchedule, type Shift, type SectorShiftWeek } from "@/data/shifts";
import { documents as defaultDocuments, type DocItem } from "@/data/documents";
import { sectors as defaultSectors, type Sector } from "@/data/sectors";
import { todayMenu as defaultTodayMenu, weeklyMenu as defaultWeeklyMenu, type DayMenu } from "@/data/menu";
import { urgentComms as defaultUrgentComms, type UrgentComm } from "@/data/urgentComms";
import { contacts as defaultContacts, type Contact } from "@/data/contacts";
import { departments as defaultDepartments, systems as defaultSystems, type Department, type SystemCard } from "@/data/departments";
import { heroSlides as defaultHeroSlides, type HeroSlide } from "@/data/heroSlides";

export interface Content {
  branding: Branding;
  heroSlides: HeroSlide[];
  notices: Notice[];
  todayShifts: Shift[];
  weekSchedule: SectorShiftWeek[];
  documents: DocItem[];
  sectors: Sector[];
  todayMenu: DayMenu;
  weeklyMenu: DayMenu[];
  urgentComms: UrgentComm[];
  contacts: Contact[];
  departments: Department[];
  systems: SystemCard[];
}

export const defaultContent: Content = {
  branding: defaultBranding,
  heroSlides: defaultHeroSlides,
  notices: defaultNotices,
  todayShifts: defaultTodayShifts,
  weekSchedule: defaultWeekSchedule,
  documents: defaultDocuments,
  sectors: defaultSectors,
  todayMenu: defaultTodayMenu,
  weeklyMenu: defaultWeeklyMenu,
  urgentComms: defaultUrgentComms,
  contacts: defaultContacts,
  departments: defaultDepartments,
  systems: defaultSystems,
};

const STORAGE_KEY = "hmas:content:v1";

function loadInitial(): Content {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<Content>;
    return {
      ...defaultContent,
      ...parsed,
      branding: { ...defaultContent.branding, ...(parsed.branding ?? {}) },
    } as Content;
  } catch {
    return defaultContent;
  }
}

interface Ctx {
  content: Content;
  setContent: (updater: Content | ((prev: Content) => Content)) => void;
  updateBranding: (patch: Partial<Branding>) => void;
  resetAll: () => void;
  exportJson: () => string;
  importJson: (json: string) => boolean;
}

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<Content>(loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // ignore storage errors (e.g. quota exceeded)
    }
  }, [content]);

  const setContent: Ctx["setContent"] = (updater) => {
    setContentState((prev) =>
      typeof updater === "function" ? (updater as (p: Content) => Content)(prev) : updater,
    );
  };

  const updateBranding: Ctx["updateBranding"] = (patch) => {
    setContentState((prev) => ({ ...prev, branding: { ...prev.branding, ...patch } }));
  };

  const resetAll: Ctx["resetAll"] = () => {
    setContentState(defaultContent);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const exportJson: Ctx["exportJson"] = () => JSON.stringify(content, null, 2);

  const importJson: Ctx["importJson"] = (json) => {
    try {
      const parsed = JSON.parse(json);
      setContentState({
        ...defaultContent,
        ...parsed,
        branding: { ...defaultContent.branding, ...(parsed.branding ?? {}) },
      });
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{ content, setContent, updateBranding, resetAll, exportJson, importJson }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
