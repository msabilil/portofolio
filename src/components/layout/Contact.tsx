"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { profile } from "@/content/profile";
import { Icon } from "@/components/space/Icon";
const email = profile.social.find((link) => link.id === "email")!.href.slice(7);
export function Contact() {
  const id = useLocale() === "id";
  const [topic, setTopic] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [time, setTime] = useState("—:—");
  const topics = id
    ? ["Diskusi proyek", "Peluang kerja", "Sekadar menyapa"]
    : ["Project discussion", "Work opportunity", "Just saying hi"];
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const interval = window.setInterval(tick, 60000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contact" className="contact-section lunar-section">
      <div className="container">
        <div className="section-topline">
          <span className="eyebrow">
            06 / {id ? "BUKA KOMUNIKASI" : "OPEN A CHANNEL"}
          </span>
          <Icon name="star" />
        </div>
        <div className="section-heading-row">
          <h2>
            {id ? "Mari mulai" : "Let’s start"}
            <br />
            <span className="marker">{id ? "percakapan." : "a conversation."}</span>
          </h2>
          <p>
            {id
              ? "Jika cara saya bekerja cocok dengan kebutuhanmu, mari berbincang. Ceritakan proyek, peluang kerja, atau ide yang ingin kamu bahas."
              : "If the way I work fits what you need, let’s talk. Tell me about a project, a work opportunity, or an idea you’d like to discuss."}
          </p>
        </div>
        <div className="contact-bento">
          <div className="contact-main panel">
            <span className="eyebrow">
              {id
                ? "INGIN MEMBAHAS APA?"
                : "WHAT WOULD YOU LIKE TO DISCUSS?"}
            </span>
            <div
              className="filter-row"
              role="group"
              aria-label={id ? "Topik pesan" : "Message topic"}
            >
              {topics.map((value, index) => (
                <button
                  key={value}
                  aria-pressed={topic === index}
                  onClick={() => setTopic(index)}
                >
                  {value}
                </button>
              ))}
            </div>
            <h3>
              {id ? "Mulai dengan" : "Start with"}
              <br />
              {id ? "satu pesan." : "a message."}
            </h3>
            <a
              className="button button-ink"
              href={
                "mailto:" +
                email +
                "?subject=" +
                encodeURIComponent(topics[topic] + " — Portfolio Space")
              }
            >
              {id ? "Tulis email" : "Write an email"}
              <Icon name="arrow" />
            </a>
            <div className="email-copy">
              <a href={"mailto:" + email}>{email}</a>
              <button
                className="icon-button"
                onClick={copy}
                aria-label={id ? "Salin alamat email" : "Copy email address"}
              >
                <Icon name={copied ? "check" : "copy"} width="18" />
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied
                ? id
                  ? "Alamat email disalin."
                  : "Email address copied."
                : copyError
                  ? id
                    ? "Gagal menyalin. Pilih dan salin alamat email di atas."
                    : "Couldn’t copy. Select and copy the email address above."
                  : ""}
            </span>
          </div>
          <div className="contact-location panel">
            <span className="eyebrow">{id ? "WAKTU DI BANDUNG" : "TIME IN BANDUNG"}</span>
            <div className="earth-orbit" aria-hidden="true">
              <Icon name="globe" width="100" height="100" />
            </div>
            <div>
              <strong>
                {time}
                <small>WIB</small>
              </strong>
              <p>Bandung, Indonesia</p>
            </div>
          </div>
          <div className="contact-social panel">
            <span className="eyebrow">
              {id ? "CARA LAIN TERHUBUNG" : "MORE WAYS TO CONNECT"}
            </span>
            {profile.social
              .filter((link) => !["email"].includes(link.id))
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("https") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("https")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.id === "github"
                    ? "GitHub"
                    : link.id === "linkedin"
                      ? "LinkedIn"
                      : id
                        ? "Telepon"
                        : "Phone"}
                  <Icon name="arrow" width="18" />
                </a>
              ))}
          </div>
        </div>
        <footer className="site-footer">
          <a className="brand" href="#main-content">
            <Icon name="orbit" />
            <span>MSF.</span>
          </a>
          <p>
            © {new Date().getFullYear()} Muhammad Sabilil Fajri
            <br />
            <span>
              {id
                ? "Dibangun di Bandung, berangkat dari rasa ingin tahu."
                : "Built in Bandung. Driven by curiosity."}
            </span>
          </p>
          <a className="text-button" href="#main-content">
            {id ? "Kembali ke atas" : "Back to top"} ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
