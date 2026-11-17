import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import "../styles/PortfolioCard.css";

type ImpactProject = {
id: string;
section: "technology" | "digital" | "stem";
name: string;
service: string;
imageSrc: string;
public: boolean;
link?: string;
type?: "project" | "flyer";
description?: string;
};

type ModalState =
| {
    open: true;
    projectId: string;
}
| {
    open: false;
    projectId?: string;
};

const PRIMARY = "#026937";

function usePrefersReducedMotion() {
const [reduced, setReduced] = useState(false);
useEffect(() => {
const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
if (!mq) return;
const onChange = () => setReduced(Boolean(mq.matches));
onChange();

// matchMedia listener compatibility
if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

mq.addListener(onChange);
return () => mq.removeListener(onChange);
}, []);
return reduced;
}


const Modal: React.FC<{
open: boolean;
title: string;
message: string;
onClose: () => void;
}> = ({ open, title, message, onClose }) => {
const reducedMotion = usePrefersReducedMotion();

useEffect(() => {
if (!open) return;
const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
};
document.addEventListener("keydown", onKeyDown);
return () => document.removeEventListener("keydown", onKeyDown);
}, [open, onClose]);

return (
<AnimatePresence>
    {open && (
    <motion.div
        className="pc-modalOverlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.18 }}
        onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
        }}
    >
        <motion.div
        className="pc-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
        >
        <div className="pc-modalIcon" aria-hidden="true">
            <span>⛔</span>
        </div>
        <h3 className="pc-modalTitle">{title}</h3>
        <p className="pc-modalMessage">{message}</p>
        <button className="pc-modalClose" onClick={onClose}>
            Close
        </button>
        </motion.div>
    </motion.div>
    )}
</AnimatePresence>
);
};

const ImageLightbox: React.FC<{
open: boolean;
imageSrc: string;
alt: string;
onClose: () => void;
}> = ({ open, imageSrc, alt, onClose }) => {
const reducedMotion = usePrefersReducedMotion();

useEffect(() => {
if (!open) return;
const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
};
document.addEventListener("keydown", onKeyDown);
return () => document.removeEventListener("keydown", onKeyDown);
}, [open, onClose]);

return (
<AnimatePresence>
    {open && (
    <motion.div
        className="pc-lightboxOverlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.18 }}
        onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
        }}
    >
        <motion.div
        className="pc-lightbox"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
        >
        <div className="pc-lightboxTop">
            <span className="pc-lightboxBadge">Flyer Preview</span>
            <button className="pc-lightboxClose" onClick={onClose} aria-label="Close lightbox">
            ✕
            </button>
        </div>
        <img className="pc-lightboxImage" src={imageSrc} alt={alt} loading="eager" />
        </motion.div>
    </motion.div>
    )}
</AnimatePresence>
);
};

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
return (
<div className="pc-sectionHeader">
    <motion.h2
    className="pc-sectionTitle"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
    >
    {title}
    </motion.h2>
    <motion.p
    className="pc-sectionSubtitle"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.75 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
    >
    {subtitle}
    </motion.p>
</div>
);
};

const HoverCard: React.FC<{
imageSrc: string;
title: string;
description: string;
badge?: string;
onAction: () => void;
actionText: string;
actionVariant?: "primary" | "ghost";
}> = ({ imageSrc, title, description, badge, onAction, actionText, actionVariant = "primary" }) => {
return (
<motion.div
    className="pc-projectCard"
    whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
>
    <div className="pc-cardMedia">
    <img className="pc-cardImage" src={imageSrc} alt={title} loading="lazy" />
    </div>
    <div className="pc-cardBody">
    {badge ? <div className="pc-badge">{badge}</div> : null}
    <h3 className="pc-cardTitle">{title}</h3>
    <p className="pc-cardDesc">{description}</p>
    <button className={`pc-btn ${actionVariant === "ghost" ? "pc-btnGhost" : "pc-btnPrimary"}`} onClick={onAction}>
        {actionText}
    </button>
    </div>
</motion.div>
);
};

const PortfolioCard: React.FC = () => {
const [modal, setModal] = useState<ModalState>({ open: false });
const [lightbox, setLightbox] = useState<{ open: boolean; imageSrc: string; alt: string }>({
open: false,
imageSrc: "",
alt: "",
});

const data = useMemo<ImpactProject[]>(
() => [
    {
    id: "xderma-ui-design",
    section: "digital",
    name: "Xderma UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/Xderma.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/3N06Wxbhrc9GZlhE2Xw4mT/XDERMA?t=XIGNtQeCdf5RS2Ch-1",
    },

    {
    id: "psychora-ui-design",
    section: "digital",
    name: "Psychora UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/Psychora.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/L4oJ58v6DzK8SJVnl4C7xM/PSYCHORA?node-id=2006-3&t=XIGNtQeCdf5RS2Ch-1",
    },

    {
    id: "e-justice-ui-design",
    section: "digital",
    name: "E-Justice UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/EJ.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/VMu8hmuVjb406Wmf7H7Ap0/e---Justice?node-id=0-1&t=XIGNtQeCdf5RS2Ch-1",
    },

    {
    id: "x-state-ui-design",
    section: "digital",
    name: "X-State Fashion UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/xstate.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/VoUozPKaWI1JmfghUor5O9/Xt8t?node-id=0-1&t=XIGNtQeCdf5RS2Ch-1",
    },

    {
    id: "mind-craft-ui-design",
    section: "digital",
    name: "Mind Craft UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/mindcraft.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/SKNrqn0iRr5NWW1sWJZZyx/Mind-Craft?t=XIGNtQeCdf5RS2Ch-1",
    },

    {
    id: "movato-ui-design",
    section: "digital",
    name: "Movato UI Design",
    service: "Interface concepts for product experiences",
    imageSrc: "/UI/movato.jpeg",
    public: true,
    type: "project",
    link: "https://www.figma.com/design/mord4xJwKRcARTuC6tR67Z/Movato-App?node-id=0-1&t=XIGNtQeCdf5RS2Ch-1",
    },
    {
    id: "iot-system",
    section: "stem",
    name: "IoT Room Temperature Web Server",
    service: "Real-time room temperature monitoring via a web interface.",
    imageSrc: "/projects/iot.jpeg",
    public: true,
    description:
        "Internet of Things (IoT) project that monitors room temperature in real time using a temperature sensor and displays the readings on a web server. Users can access the temperature data from any device connected to the network, enabling convenient remote monitoring and smart environment management.",
    },
],
[]
);

const technologyProjects = data.filter((p) => p.section === "technology");
const digitalItems = data.filter((p) => p.section === "digital");
const stemHighlight = data.find((p) => p.section === "stem");

// Ensure items are unique by id to avoid accidental duplicates
const uniqueById = <T extends { id: string }>(arr: T[]) => Array.from(new Map(arr.map((it) => [it.id, it])).values());

const technologyUnique = uniqueById(technologyProjects);
const digitalUnique = uniqueById(digitalItems);

const accessDeniedProject = modal.open
? data.find((p) => p.id === modal.projectId)
: undefined;

return (
<LayoutGroup>
    <section className="pc-root">
    {/* 2) Digital Solutions */}
    <div id="digital" className="pc-section">
        <SectionHeader title="Digital Solutions" subtitle="Image-based campaigns, User Interface & User Experience direction." />

        <motion.div
        className="pc-grid pc-gridDigital"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        >
        {digitalUnique.map((p) => {
            const isFlyer = p.type === "flyer";

            return (
            <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
            >
                <motion.button
                type="button"
                className="pc-imageCard"
                onClick={() => {
                    if (isFlyer) {
                    setLightbox({ open: true, imageSrc: p.imageSrc, alt: p.name });
                    return;
                    }
                    if (p.link) {
                    window.open(p.link, "_blank", "noopener,noreferrer");
                    }
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                aria-label={p.name}
                >
                <div className="pc-imageCardMedia">
                    <img className="pc-imageCardImg" src={p.imageSrc} alt={p.name} loading="lazy" />
                    <div className="pc-imageCardOverlay" />
                    <div className="pc-imageCardCta">{isFlyer ? "View Flyer" : "Open Design"}</div>
                </div>
                <div className="pc-imageCardBody">
                    <h3 className="pc-imageCardTitle">{p.name}</h3>
                    <p className="pc-imageCardDesc">{p.service}</p>
                </div>
                </motion.button>
            </motion.div>
            );
        })}
        </motion.div>
    </div>

    {/* 3) STEM & Tech Solutions */}
    <div className="pc-section">
        <SectionHeader title="IoT & Embedded Systems" subtitle="Building IoT Systems to fix real world Problems" />

        <motion.div
        className="pc-stemHighlight"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        >
        {stemHighlight ? (
            <div className="pc-stemInner">
            <div className="pc-stemMedia">
                <img className="pc-stemImage" src={stemHighlight.imageSrc} alt={stemHighlight.name} loading="lazy" />
            </div>
            <div className="pc-stemBody">
                <div className="pc-badge pc-badgeStem">Highlight</div>
                <h3 className="pc-stemTitle">{stemHighlight.name}</h3>
                <p className="pc-stemDesc">{stemHighlight.service}</p>
                <p className="pc-stemDesc2">{stemHighlight.description}</p>
            </div>
            </div>
        ) : null}
        </motion.div>
    </div>
    </section>

    <Modal
    open={modal.open}
    title="Access Denied"
    message={
        "This project is not made public due to ownership rights of the client"
    }
    onClose={() => setModal({ open: false })}
    />

    <ImageLightbox
    open={lightbox.open}
    imageSrc={lightbox.imageSrc}
    alt={lightbox.alt}
    onClose={() => setLightbox({ open: false, imageSrc: "", alt: "" })}
    />
</LayoutGroup>
);
};

export default PortfolioCard;

