"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "./Icon";
import { parseContributions, type Contribution } from "@/lib/contributions";

function contributionMessage(day: Contribution, id: boolean) {
  if (day.count === 0) {
    return id
      ? `Tidak ada kontribusi pada ${day.date}`
      : `No contributions on ${day.date}`;
  }

  return id
    ? `${day.count} kontribusi pada ${day.date}`
    : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`;
}

export function GithubActivity() {
  const id = useLocale() === "id";
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [days, setDays] = useState<Contribution[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!near) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let disposed = false;
    async function fetchActivity() {
      try {
        const response = await fetch("/api/github/contributions", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Activity unavailable");
        const parsed = parseContributions(await response.json());
        if (!disposed) {
          setDays(parsed);
          setError(false);
        }
      } catch {
        if (!disposed) setError(true);
      } finally {
        window.clearTimeout(timeout);
      }
    }
    fetchActivity();
    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [near, attempt]);
  const total = days?.reduce((sum, day) => sum + day.count, 0);
  return (
    <section ref={ref} className="activity-section lunar-section">
      <div className="container">
        <div className="activity-panel panel">
          <div className="section-topline activity-topline">
            <span className="eyebrow">04 / {id ? "JEJAK DI GITHUB" : "GITHUB LOG"}</span>
          </div>
          <div className="activity-heading">
            <div>
              <h2>{id ? "Jejak di balik karya." : "A look at the process."}</h2>
              <p>
                {id
                  ? "Sebagian proses belajar dan pengembangan saya tercatat di GitHub. Berikut aktivitas akun @msabilil pada periode yang ditampilkan."
                  : "GitHub holds part of my learning and development process. Here’s the activity on @msabilil during the period shown."}
              </p>
            </div>
            <a
              className="button button-light"
              href="https://github.com/msabilil"
              target="_blank"
              rel="noopener noreferrer"
            >
              {id ? "Lihat GitHub" : "View GitHub"}
              <Icon name="arrow" />
            </a>
          </div>
          {days ? (
            <>
              <div className="activity-summary">
                <strong>{total?.toLocaleString(id ? "id-ID" : "en-US")}</strong>
                <span>
                  {id
                    ? "kontribusi pada rentang yang ditampilkan"
                    : "contributions in the displayed period"}
                </span>
              </div>
              <div
                className="heatmap-scroll"
                tabIndex={0}
                role="region"
                aria-label={
                  id
                    ? "Grafik kontribusi, geser untuk melihat seluruh tanggal"
                    : "Contribution chart, scroll to see all dates"
                }
              >
                <div
                  className="heatmap"
                  role="grid"
                  aria-rowcount={7}
                  aria-colcount={Math.ceil(days.length / 7)}
                  aria-label={
                    id
                      ? total +
                        " kontribusi dari " +
                        days[0]?.date +
                        " sampai " +
                        days.at(-1)?.date
                      : total +
                        " contributions from " +
                        days[0]?.date +
                        " to " +
                        days.at(-1)?.date
                  }
                >
                  {days.map((day) => (
                    <span
                      key={day.date}
                      className="heatmap-day"
                      role="gridcell"
                      tabIndex={0}
                      data-level={day.level}
                      aria-label={contributionMessage(day, id)}
                      data-tooltip={contributionMessage(day, id)}
                    />
                  ))}
                </div>
              </div>
              <div className="heatmap-footer">
                <span>
                  {days[0]?.date} → {days.at(-1)?.date}
                </span>
                <span>
                  {id ? "Sedikit" : "Less"}
                  <i data-level="0" />
                  <i data-level="1" />
                  <i data-level="2" />
                  <i data-level="3" />
                  <i data-level="4" />
                  {id ? "Banyak" : "More"}
                </span>
              </div>
            </>
          ) : error ? (
            <div className="activity-error" role="status">
              <p>
                {id
                  ? "Aktivitas GitHub belum bisa dimuat. Coba lagi atau buka profil melalui tautan di atas."
                  : "GitHub activity couldn’t be loaded. Try again or visit my profile using the link above."}
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setError(false);
                  setAttempt((n) => n + 1);
                }}
              >
                {id ? "Coba lagi" : "Try again"} ↗
              </button>
            </div>
          ) : (
            <div className="activity-loading" role="status">
              {id ? "Memuat aktivitas GitHub…" : "Loading GitHub activity…"}
            </div>
          )}
          <p className="activity-source">
            {id
              ? "Sumber: GitHub Contributions API. Grafik ini menunjukkan aktivitas akun, bukan keseluruhan pekerjaan atau ukuran kualitas kode."
              : "Source: GitHub Contributions API. This chart shows account activity, not the full scope of my work or a measure of code quality."}
          </p>
        </div>
      </div>
    </section>
  );
}
