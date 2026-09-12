"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "./Icon";
import { parseContributions, type Contribution } from "@/lib/contributions";
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
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/msabilil?y=last",
          { signal: controller.signal },
        );
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
          <div className="activity-heading">
            <div>
              <span className="eyebrow">04 / GITHUB TRANSMISSION</span>
              <h2>{id ? "Sedikit demi sedikit." : "One commit at a time."}</h2>
              <p>
                {id
                  ? "Jejak aktivitas publik @msabilil di GitHub."
                  : "A little window into @msabilil’s public GitHub activity."}
              </p>
            </div>
            <a
              className="button button-light"
              href="https://github.com/msabilil"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
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
                  role="img"
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
                      data-level={day.level}
                      title={
                        day.date +
                        ": " +
                        day.count +
                        (id ? " kontribusi" : " contributions")
                      }
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
                  ? "Sinyal belum tersambung. Data GitHub sedang tidak tersedia."
                  : "No signal yet. GitHub activity is currently unavailable."}
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
              {id ? "Menghubungkan ke GitHub…" : "Connecting to GitHub…"}
            </div>
          )}
          <p className="activity-source">
            {id
              ? "Sumber: GitHub melalui GitHub Contributions API. Kontribusi tidak hanya berupa commit."
              : "Source: GitHub via GitHub Contributions API. Contributions include more than commits."}
          </p>
        </div>
      </div>
    </section>
  );
}
