# Phase 2 — WU-01 checkpoint

Scope: focused source review and shared data foundation only. No UI redesign, dependencies, new calculations or publication in this work unit.

## Current state from source

| Area | Status | Evidence / remaining work |
| --- | --- | --- |
| Zodiac Explorer | PARTIAL | ZodiacExplorer.tsx has 12-position wheel, selection, mouse/focus preview, relationship filters, details and onward links. Device/keyboard QA still needed before WU-02 completion. |
| Planet Explorer | PARTIAL | PlanetExplorer.tsx selects 10 bodies and separates astrology/astronomy/mythology. Needs final interaction and content QA. |
| House Explorer | PARTIAL | HouseExplorer.tsx has 12 sections, details and labeled modern house/sign analogies. Needs device QA. |
| Elements + Modalities | PARTIAL | ZodiacMatrix.tsx covers 12 combinations; ElementBalance.tsx exists. Matrix still derives modality by index in UI. |
| Connection Map | PARTIAL | ConnectionMap.tsx uses relatedEntities for linked neighbors. Final accessibility/responsive QA pending. |
| Cosmic Codex foundation | DONE | CodexPage.tsx provides category/search/detail, invalid-ID fallback and shared entity lookup. Beginner terminology and full browser QA remain separate work. |
| Explore Next data/navigation | DONE | ExploreNext.tsx and Codex use /codex/:entityId and bidirectional relatedEntities. Five Scorpio destinations tested. |
| Birth Chart | PARTIAL | BirthChart.tsx explicitly labels example diagram and approximate Sun sign; no real Moon sign, ascendant, houses or aspects. |
| Knowledge/editorial | PARTIAL | CosmicKnowledge.tsx and cosmos.ts have short editorial content; not a complete lore library. |
| Navigation | NEEDS FIX | App.tsx has desktop Codex and entity routes; mobile bottom-nav currently has Home/Explore/Journal/Profile, contrary to old checkpoint. Review mobile Codex entry in WU-10. |
| Beginner UX | PARTIAL | Section explanations exist; direct Codex detail terminology still needs WU-09. |
| Responsive/accessibility/performance | PARTIAL | Existing semantic controls and lazy routes; this data-only unit does not establish full browser/device QA. |
| Fantasy lore + true ephemeris/transits | NOT STARTED | No fantasy records or astronomical engine added. |

## Authoritative data and duplication

- src/data/cosmos.ts: original sign/body content, symbols, dates, colors and short editorial text.
- src/data/knowledge.ts: normalized graph of 12 zodiac + 10 bodies + 12 houses + 4 elements + 3 modalities. Houses, rulers and classification relationships are defined here; source descriptions derive from cosmos.ts.
- src/data/constellations.ts: separate visual geometry, not real-time sky positions.
- src/data/content.ts and src/lib/engine.ts: existing tool text/calculations remain separate from the learning graph.
- Duplication to address in later bounded units: cosmos.ts sign.ruler display text versus graph ruler indexes; index-modulo modality logic in ZodiacExplorer/ZodiacMatrix; modality descriptions repeated in matrix UI; approximate Sun-date lookup versus editorial date strings. No broad refactor performed.

## Shared contract

KnowledgeEntity remains the general content contract; EntityType also accepts mystery for future lore without adding records. AstrologyEntity extends it with slug, shortDescription, interpretation and concepts. All 41 exported records and entityById use this normalized type.

slug equals the existing stable ID, preserving /codex/zodiac-scorpio and all published links. shortDescription derives from description; do not maintain a second text copy. House concepts derive from keywords, deliberately remaining descriptive terms rather than fake graph destinations.

relationships are outgoing typed edges; relatedEntities resolves outgoing and incoming edges, so planets/elements/modalities have reverse zodiac navigation without duplicate stored links. UI consumers should use this resolver. Scorpio resolves to Water, Fixed, traditional Mars, modern Pluto and House 8. House association is explicitly kind=analogy, not rulership or a calculated natal placement.

interpretation=astrology identifies the primary symbolic description; factual body classification remains under metadata.astronomy and cultural context under metadata.mythology. This is a content-layer distinction, not independent validation of all existing source material.

Birth chart remains illustrative; lunar() is a mean-cycle estimate with estimated illumination, not current sky coordinates. No real birth chart, rising sign or transit was fabricated.

## Validation and stop point

5 graph tests and 8 existing engine tests passed. Sites/Worker and GitHub Pages builds passed. Engine test runner required retry outside sandbox after Node user-info access failure; tests then passed unchanged. No browser UI changes or new browser QA in WU-01.

Next: WU-02 targeted verification/completion of the existing wheel, not replacement. First inspect its mobile/focus behavior and consolidate only its remaining relationship duplication.

SAFE TO STOP: YES. WU-02 not started.

## Completion-pass update
WU-01 tables above are a historical baseline. Current completion state is PROJECT_STATUS.md: WU-01–11 knowledge exploration complete, including matrix relationship derivation, mobile Codex and direct-entry guides. Future type extension also allows location/lore; no fantasy records or new astronomical engine added.
