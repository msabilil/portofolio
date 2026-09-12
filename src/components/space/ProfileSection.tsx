"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, type KeyboardEvent } from "react";
import { profile } from "@/content/profile";
import { Icon } from "./Icon";
const tabs = ["uiux", "webdev", "qa"] as const;
export function ProfileSection() {
  const id = useLocale() === "id";
  const about = useTranslations("about");
  const t = useTranslations("expertise");
  const [tab, setTab] = useState(0);
  const [floating, setFloating] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(event: KeyboardEvent, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
          ? (index + 2) % 3
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : -1;
    if (next >= 0) {
      event.preventDefault();
      setTab(next);
      buttons.current[next]?.focus();
    }
  }
  return (
    <section id="about" className="lunar-section profile-section">
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            01 / {id ? "KENALI PENJELAJAHNYA" : "MEET THE EXPLORER"}
          </span>
          <button
            className="text-button gravity-toggle"
            onClick={() => setFloating(!floating)}
            aria-pressed={floating}
          >
            <Icon name="orbit" width="18" />
            {floating
              ? id
                ? "Kembalikan gravitasi"
                : "Restore gravity"
              : id
                ? "Coba gravitasi nol"
                : "Try zero gravity"}
          </button>
        </div>
        <div className="profile-grid" data-floating={floating}>
          <div className="profile-card panel">
            <div className="photo-frame">
              <Image
                src="/assets/photos/itsme.jpg"
                alt={profile.name}
                width={480}
                height={600}
                sizes="(max-width: 760px) 85vw, 400px"
              />
              <span className="photo-tape" aria-hidden="true" />
              <span className="photo-sticker">
                <Icon name="star" />{" "}
                {id ? "MANUSIA DI BALIK LAYAR" : "HUMAN BEHIND THE PIXELS"}
              </span>
            </div>
            <div className="profile-id">
              <span className="eyebrow">CREW ID / MSF—001</span>
              <Icon name="orbit" />
              <p>Muhammad Sabilil Fajri</p>
              <span>Bandung, Indonesia · UTC+7</span>
            </div>
          </div>
          <div className="profile-story">
            <h2>
              {id ? "Halo, saya" : "Hi, I’m"}
              <br />
              <span className="marker">Muhammad</span>
              <br />
              Sabilil Fajri<span className="cyan-dot">.</span>
            </h2>
            <p className="body-copy">{about("bio")}</p>
            <div className="expertise-panel panel">
              <div
                role="tablist"
                aria-label={t("title")}
                className="expertise-tabs"
              >
                {tabs.map((key, index) => (
                  <button
                    key={key}
                    ref={(el) => {
                      buttons.current[index] = el;
                    }}
                    id={"expertise-tab-" + key}
                    role="tab"
                    aria-selected={tab === index}
                    aria-controls={"expertise-panel-" + key}
                    tabIndex={tab === index ? 0 : -1}
                    onClick={() => setTab(index)}
                    onKeyDown={(event) => onKey(event, index)}
                  >
                    {t(key + ".title")}
                  </button>
                ))}
              </div>
              <div
                role="tabpanel"
                id={"expertise-panel-" + tabs[tab]}
                aria-labelledby={"expertise-tab-" + tabs[tab]}
                tabIndex={0}
                className="expertise-content"
              >
                <div className="expertise-icon">
                  <Icon
                    name={tab === 0 ? "star" : tab === 1 ? "code" : "check"}
                    width="30"
                    height="30"
                  />
                </div>
                <div>
                  <h3>{t(tabs[tab] + ".title")}</h3>
                  <p>{t(tabs[tab] + ".description")}</p>
                </div>
              </div>
            </div>
            <a
              className="text-button"
              href="/assets/cv/muhammad-sabilil-fajri-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {id
                ? "Kenali perjalanan saya — lihat CV"
                : "Get the full story — view my CV"}
              <Icon name="arrow" width="18" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
