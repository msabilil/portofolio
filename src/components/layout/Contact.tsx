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
    ? ["Diskusi proyek", "Kesempatan kerja", "Sekadar menyapa"]
    : ["A project idea", "An opportunity", "Just saying hi"];
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
            {id ? "Punya ide" : "Something on"}
            <br />
            <span className="marker">{id ? "di orbitmu?" : "your radar?"}</span>
          </h2>
          <p>
            {id
              ? "Mari bicarakan. Tentang produk baru, kolaborasi, atau hal menarik yang sedang kamu kerjakan."
              : "Let’s talk. About a new product, a collaboration, or something interesting you’re working on."}
          </p>
        </div>
        <div className="contact-bento">
          <div className="contact-main panel">
            <span className="eyebrow">
              {id
                ? "PILIH TOPIK TRANSMISIMU"
                : "WHAT’S YOUR TRANSMISSION ABOUT?"}
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
              {id ? "Ide bagus dimulai" : "Good things start"}
              <br />
              {id ? "dari satu halo." : "with a hello."}
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
              {id ? "Kirim pesan" : "Send a message"}
              <Icon name="arrow" />
            </a>
            <div className="email-copy">
              <a href={"mailto:" + email}>{email}</a>
              <button
                className="icon-button"
                onClick={copy}
                aria-label={id ? "Salin email" : "Copy email"}
              >
                <Icon name={copied ? "check" : "copy"} width="18" />
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied
                ? id
                  ? "Email disalin."
                  : "Email copied."
                : copyError
                  ? id
                    ? "Belum bisa menyalin. Pilih alamat email di atas."
                    : "Couldn’t copy. Select the email address above."
                  : ""}
            </span>
          </div>
          <div className="contact-location panel">
            <span className="eyebrow">LOCAL TIME / EARTH</span>
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
              {id ? "FREKUENSI LAIN" : "OTHER FREQUENCIES"}
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
                ? "Dibuat di Bumi, untuk ide yang lebih jauh."
                : "Made on Earth, for ideas beyond it."}
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
