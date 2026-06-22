"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ServiceTabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  imageSrc: string;
  imageAlt: string;
}

interface ServiceTab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: ServiceTabContent;
}

interface ServiceTabsProps {
  tabs?: ServiceTab[];
  className?: string;
}

function ServiceTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
      {children}
    </span>
  );
}

function ServiceTabs({ tabs = [], className }: ServiceTabsProps) {
  if (!tabs.length) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex items-center gap-3 font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-muted-foreground/60">
        <span className="h-px flex-1 bg-border" />
        Select a service
        <span className="h-px flex-1 bg-border" />
      </div>

      <Tabs defaultValue={tabs[0].value}>
        <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-foreground/5 p-1.5 backdrop-blur-xl">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/60 transition-colors data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand/20 to-brand/10 ring-1 ring-brand/20 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-brand">
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" />

          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="relative z-10 m-0 grid gap-8 p-6 md:p-8 lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-10"
            >
              <div className="flex flex-col gap-4 lg:gap-5">
                <ServiceTag>{tab.content.badge}</ServiceTag>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold leading-tight text-foreground md:text-3xl lg:text-4xl">
                  {tab.content.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                  {tab.content.description}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Link href={tab.content.buttonHref ?? "#contact"}>
                    <Button className="">{tab.content.buttonText}</Button>
                  </Link>
                  <Link href="#work">
                    <Button variant="outline" className="">
                      View projects
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border bg-foreground/[0.02]">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden />
                  <span className="ml-2 truncate font-[family-name:var(--font-data)] text-xs text-muted-foreground/70">
                    {tab.label} — preview
                  </span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 512px"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export { ServiceTabs };
export type { ServiceTabsProps, ServiceTab, ServiceTabContent };
