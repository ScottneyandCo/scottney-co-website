"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { portfolioImageUrl, type PortfolioItem } from "@/lib/portfolio";

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (items.length === 0) {
    return <p className="gallery-empty">New work is on the way—check back soon.</p>;
  }

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <figure
            className="gallery-item"
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setActive(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(item);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portfolioImageUrl(item.image_path)} alt={item.title} loading="lazy" />
            <figcaption>
              <strong>{item.title}</strong>
              {item.details ? <span>{item.details}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <button className="lightbox-close" type="button" aria-label="Close" onClick={() => setActive(null)}>
            <X size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portfolioImageUrl(active.image_path)} alt={active.title} onClick={(e) => e.stopPropagation()} />
          <p className="lightbox-cap">
            {active.title}
            {active.details ? ` — ${active.details}` : ""}
          </p>
        </div>
      ) : null}
    </>
  );
}
