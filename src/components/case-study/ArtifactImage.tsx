"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./CaseStudyPage.module.css";

export function ArtifactImage({
  src,
  alt,
  caption,
  locale,
}: {
  src: string;
  alt: string;
  caption: string;
  locale: "id" | "en";
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
          width={1440}
          height={960}
          sizes="(max-width: 900px) 100vw, 800px"
        />
        <span>{locale === "id" ? "Perbesar gambar" : "Enlarge image"}</span>
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
        <Image src={src} alt={alt} width={1440} height={960} sizes="95vw" />
        <p>{caption}</p>
      </dialog>
    </figure>
  );
}
