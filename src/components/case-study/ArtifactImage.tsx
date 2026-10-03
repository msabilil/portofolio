"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./CaseStudyPage.module.css";

export function ArtifactImage({
  src,
  alt,
  caption,
  locale,
  width = 1440,
  height = 960,
  originalResolution = false,
}: {
  src: string;
  alt: string;
  caption: string;
  locale: "id" | "en";
  width?: number;
  height?: number;
  originalResolution?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <figure className={styles.artifactFigure}>
      <button
        className={styles.imageButton}
        onClick={() => dialog.current?.showModal()}
        aria-label={`${locale === "id" ? "Perbesar" : "Enlarge"}: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={originalResolution}
          sizes="(max-width: 900px) 100vw, 800px"
        />
      </button>
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dialog}
        className={styles.imageDialog}
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <form method="dialog">
          <button autoFocus>
            {locale === "id" ? "Tutup gambar" : "Close image"}
          </button>
        </form>
        {originalResolution && (
          <a className={styles.projectLink} href={src} target="_blank" rel="noopener noreferrer">
            {locale === "id" ? "Buka gambar asli dalam tab baru" : "Open original image in a new tab"}
          </a>
        )}
        <div className={styles.imageViewport}>
          <Image src={src} alt={alt} width={width} height={height} sizes="95vw" unoptimized={originalResolution} />
        </div>
        <p>{caption}</p>
      </dialog>
    </figure>
  );
}
