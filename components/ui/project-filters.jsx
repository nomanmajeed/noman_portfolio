'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import { techStack } from '@/lib/tech-stack';
import { TechIconCircle } from './tech-icon-circle';

const DOMAIN_TAGS = new Set(['FinTech', 'AI/LLM', 'Analytics', 'E-Commerce', 'Microservices']);

export function buildFilterOptions(projects) {
  const domainMap = new Map();
  const tagMap = new Map();
  const skillMap = new Map();

  for (const project of projects) {
    for (const tag of project.tags ?? []) {
      if (DOMAIN_TAGS.has(tag)) {
        domainMap.set(tag, (domainMap.get(tag) ?? 0) + 1);
      } else {
        tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
      }
    }

    for (const skillId of project.stack ?? []) {
      skillMap.set(skillId, (skillMap.get(skillId) ?? 0) + 1);
    }
  }

  const toOptions = (map) =>
    [...map.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([id, count]) => ({ id, label: id, count }));

  const skills = [...skillMap.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([id, count]) => {
      const item = techStack.find((entry) => entry.id === id);
      return { id, label: item?.name ?? id, count, item };
    });

  return {
    domains: toOptions(domainMap),
    tags: toOptions(tagMap),
    skills,
  };
}

export function matchesMultiFilters(work, { domains, tags, skills }) {
  const hasFilters = domains.length > 0 || tags.length > 0 || skills.length > 0;
  if (!hasFilters) return true;

  if (domains.length > 0 && !domains.some((id) => work.tags?.includes(id))) {
    return false;
  }

  if (tags.length > 0 && !tags.some((id) => work.tags?.includes(id))) {
    return false;
  }

  if (skills.length > 0 && !skills.some((id) => work.stack?.includes(id))) {
    return false;
  }

  return true;
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FilterDropdown({ label, options, selected, onChange, renderOption }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, minWidth: 208 });
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 8,
      left: rect.left,
      minWidth: Math.max(rect.width, 208),
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const handleScrollOrResize = () => updateMenuPosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (buttonRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!options.length) return null;

  const menu = open && mounted ? (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: menuStyle.top,
        left: menuStyle.left,
        minWidth: menuStyle.minWidth,
        zIndex: 250,
      }}
      className="overflow-hidden rounded-xl border border-border bg-background shadow-lg"
    >
      <ul role="listbox" aria-label={label} className="max-h-64 overflow-y-auto p-1.5">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <li key={option.id} role="option" aria-selected={isSelected}>
              <button
                type="button"
                onClick={() => onChange(toggleValue(selected, option.id))}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? 'bg-brand/10 text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    isSelected
                      ? 'border-brand bg-brand text-background'
                      : 'border-border bg-background'
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {renderOption ? (
                  renderOption(option, isSelected)
                ) : (
                  <>
                    <span className="flex-1">{option.label}</span>
                    <span className="font-[family-name:var(--font-data)] text-[10px] tabular-nums text-muted-foreground/60">
                      {option.count}
                    </span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => {
            const next = !value;
            if (next) updateMenuPosition();
            return next;
          });
        }}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
          selected.length > 0 || open
            ? 'border-brand/40 bg-brand/10 text-foreground'
            : 'border-border bg-foreground/5 text-muted-foreground hover:border-brand/30 hover:text-foreground'
        }`}
      >
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 font-[family-name:var(--font-data)] text-[10px] font-semibold text-background">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {mounted && menu ? createPortal(menu, document.body) : null}
    </div>
  );
}

export function ProjectFilters({
  options,
  selectedDomains,
  selectedTags,
  selectedSkills,
  onDomainsChange,
  onTagsChange,
  onSkillsChange,
  onClearAll,
}) {
  const activeCount = selectedDomains.length + selectedTags.length + selectedSkills.length;

  return (
    <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <FilterDropdown
        label="Domain"
        options={options.domains}
        selected={selectedDomains}
        onChange={onDomainsChange}
      />
      <FilterDropdown
        label="Tags"
        options={options.tags}
        selected={selectedTags}
        onChange={onTagsChange}
      />
      <FilterDropdown
        label="Skills"
        options={options.skills}
        selected={selectedSkills}
        onChange={onSkillsChange}
        renderOption={(skill) => (
          <>
            {skill.item ? (
              <TechIconCircle item={skill.item} size="xs" />
            ) : (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-[10px] font-medium">
                {skill.label.slice(0, 2)}
              </span>
            )}
            <span className="flex-1">{skill.label}</span>
            <span className="font-[family-name:var(--font-data)] text-[10px] tabular-nums text-muted-foreground/60">
              {skill.count}
            </span>
          </>
        )}
      />

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
