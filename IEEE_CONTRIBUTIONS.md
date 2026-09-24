# IEEE Contributor Portfolio: AI Story Weaver

**Contributor:** Sri Ram Kunamsetty ([@SriRamkunamsetty](https://github.com/SriRamkunamsetty))  
**Email:** mohansriramkunamsetty@gmail.com  
**Repository:** [gaur-avvv/AI-Story-Weaver](https://github.com/gaur-avvv/AI-Story-Weaver)  
**Fork:** [SriRamkunamsetty/AI-Story-Weaver](https://github.com/SriRamkunamsetty/AI-Story-Weaver)  
**Date:** September 24, 2026  
**Evaluation Focus:** Technical Complexity, Code Quality, Test Coverage (Vitest), Architectural Alignment, Documentation.

---

## 📋 Summary of Pull Requests

| PR # | Title | Date | Status | Test Suites |
| :--- | :--- | :--- | :--- | :--- |
| [**#34**](https://github.com/gaur-avvv/AI-Story-Weaver/pull/34) | `feat: interactive Lore Knowledge Graph studio, narrative continuity auditor, and test suite` | 2026-09-24 | Open | 3 suites (15 tests) |
| [**#35**](https://github.com/gaur-avvv/AI-Story-Weaver/pull/35) | `feat: multi-voice character dialogue narration engine and speaker attribution` | 2026-09-24 | Open | 1 suite (5 tests) |
| [**#36**](https://github.com/gaur-avvv/AI-Story-Weaver/pull/36) | `feat: interactive CYOA branching timeline map and Twine export` | 2026-09-24 | Open | 1 suite (3 tests) |
| [**#37**](https://github.com/gaur-avvv/AI-Story-Weaver/pull/37) | `feat: character visual consistency and reference seed anchor engine` | 2026-09-24 | Open | 1 suite (4 tests) |
| [**#38**](https://github.com/gaur-avvv/AI-Story-Weaver/pull/38) | `feat: bilingual dual-language learning studio and keyboard accessibility modal` | 2026-09-24 | Open | 1 suite (2 tests) |

**Total Vitest Test Count:** 29 automated tests across 7 comprehensive test suites passing in < 1 second.

---

## 🎯 Detailed Breakdown of Contributions

### PR 1: Knowledge Graph Studio & Continuity Auditor
- **🔗 Link:** [Pull Request #34](https://github.com/gaur-avvv/AI-Story-Weaver/pull/34)
- **🎯 Solves:** Fixes Issue #11 & #18 (Story Lore Entity Consistency & Knowledge Graph Visualization)
- **⚙️ Technical Complexity & Architecture:**
  - Designed an interactive Lore Knowledge Graph Studio (`components/StoryGraphModal.tsx`) visualizing characters, factions, locations, artifacts, and concepts.
  - Implemented an automated Narrative Continuity Auditor that checks for orphaned entities, unresolved narrative hooks, and relationship discrepancies.
  - Modernized Vite configuration to Vite 8 native `import.meta.dirname` syntax.
  - Cleaned up obsolete files (`FullScreenLoader.tsx`, `historyService.ts`) and configured Vitest with automated unit tests for graph extraction and JSON sanitization.

### PR 2: Multi-Voice Character Dialogue Narration Engine
- **🔗 Link:** [Pull Request #35](https://github.com/gaur-avvv/AI-Story-Weaver/pull/35)
- **🎯 Solves:** Fixes Issue #12 (Monotone Single-Speaker Audio Monologue in Narration)
- **⚙️ Technical Complexity & Architecture:**
  - Created an NLP-based dialogue segmentation engine (`services/dialogueExtractor.ts`) that extracts spoken dialogue versus narration.
  - Built heuristic speaker attribution matching dialogue tags (*"said Marcus"*, *"whispered Elena"*) against characters in the story context.
  - Formulated character-to-voice assignment profiles (`CharacterVoiceCast`) mapping characters to distinct timbre/gender profiles.
  - Integrated visual dramatization badges in `components/ParagraphCard.tsx` and 5 unit tests in `tests/dialogueExtractor.test.ts`.

### PR 3: Interactive CYOA Branching Timeline Map & Twine Export
- **🔗 Link:** [Pull Request #36](https://github.com/gaur-avvv/AI-Story-Weaver/pull/36)
- **🎯 Solves:** Fixes Issue #14 (Choose-Your-Own-Adventure Branch Navigation & Twine Compatibility)
- **⚙️ Technical Complexity & Architecture:**
  - Implemented a Directed Acyclic Graph (DAG) structure (`services/timelineDagService.ts`) for non-linear storytelling.
  - Developed standard Twine / Harlowe 3 export generator to convert multi-branch story segments into playable interactive fiction formats.
  - Created `components/StoryTimelineMap.tsx` with depth-layer visual layout, parent-child link tracking, and quick jumping to any scene.
  - Added keyboard shortcut `Ctrl+T` / `Cmd+T` and toolbar integration, backed by `tests/timelineDag.test.ts`.

### PR 4: Character Visual Consistency & Reference Seed Anchor Engine
- **🔗 Link:** [Pull Request #37](https://github.com/gaur-avvv/AI-Story-Weaver/pull/37)
- **🎯 Solves:** Fixes Issue #13 (Visual Hallucinations & Inconsistent Character Faces Across Scenes)
- **⚙️ Technical Complexity & Architecture:**
  - Designed a Character Visual DNA profile registry (`services/characterConsistencyService.ts`) storing canonical physical traits (eye color, hair style, costume, signature accessories, art style anchors).
  - Engineered an automated prompt anchor injection layer inside `services/geminiService.ts:buildSceneImagePrompt()` that detects character presence in paragraphs and prepends deterministic visual descriptors.
  - Added deterministic pseudo-random seed generation (`generateCharacterSeed`) to lock generative diffusion seeds for individual characters.
  - Added unit test suite `tests/characterConsistency.test.ts`.

### PR 5: Bilingual Dual-Language Learning Studio & Keyboard Accessibility
- **🔗 Link:** [Pull Request #38](https://github.com/gaur-avvv/AI-Story-Weaver/pull/38)
- **🎯 Solves:** Fixes Issue #16 (Multilingual Educational Dual-Text & Power-User Keyboard Navigation)
- **⚙️ Technical Complexity & Architecture:**
  - Built a side-by-side bilingual reading studio (`components/BilingualStoryModal.tsx`) comparing original prose with translated text across 10 international languages (Spanish, French, German, Hindi, Japanese, Chinese, etc.).
  - Supports single-scene and batch asynchronous translations using Google Gemini.
  - Built an accessible Keyboard Shortcuts modal (`components/KeyboardShortcutsModal.tsx`) triggered via `?` or the top bar.
  - Wired global navigation hotkeys (`Ctrl+B` for Bilingual, `Ctrl+T` for Timeline, `Ctrl+G` for Graph, `Ctrl+M` for Voice, `?` for Shortcuts).
  - Added unit test suite `tests/bilingualMode.test.ts`.

---

## 💬 Formatted for Discord Submission

Copy and paste the section below directly into the IEEE Discord contributions channel:

```markdown
**IEEE Contributor Submission**
**Name:** Sri Ram Kunamsetty
**GitHub:** https://github.com/SriRamkunamsetty
**Repository:** https://github.com/gaur-avvv/AI-Story-Weaver

---

• 🔗 Pull Request Number & Link: #34 - https://github.com/gaur-avvv/AI-Story-Weaver/pull/34
• 🎯 Issue Number Solved: Fixes Issue #11 & Issue #18
• 📝 Short summary of the work done: Implemented an interactive Lore Knowledge Graph studio modal with entity/relationship visualization, narrative continuity auditing (orphaned entity detection), Vitest testing setup, and Vite 8 modernization.

---

• 🔗 Pull Request Number & Link: #35 - https://github.com/gaur-avvv/AI-Story-Weaver/pull/35
• 🎯 Issue Number Solved: Fixes Issue #12
• 📝 Short summary of the work done: Built a multi-voice character dialogue extraction engine with NLP speaker attribution, character voice casting profiles, and dramatized dialogue badges with full unit test coverage.

---

• 🔗 Pull Request Number & Link: #36 - https://github.com/gaur-avvv/AI-Story-Weaver/pull/36
• 🎯 Issue Number Solved: Fixes Issue #14
• 📝 Short summary of the work done: Created an interactive CYOA branching DAG timeline map modal, Twine / Harlowe 3 interactive fiction export engine, Ctrl+T navigation shortcuts, and timeline DAG unit tests.

---

• 🔗 Pull Request Number & Link: #37 - https://github.com/gaur-avvv/AI-Story-Weaver/pull/37
• 🎯 Issue Number Solved: Fixes Issue #13
• 📝 Short summary of the work done: Developed a Character Visual Consistency and Visual DNA anchor engine that maintains persistent facial and costume traits across scene illustrations via automated prompt injection and seed anchoring.

---

• 🔗 Pull Request Number & Link: #38 - https://github.com/gaur-avvv/AI-Story-Weaver/pull/38
• 🎯 Issue Number Solved: Fixes Issue #16
• 📝 Short summary of the work done: Created a Bilingual Dual-Language Learning Studio for side-by-side language reading across 10 international languages, alongside a full Keyboard Shortcuts cheatsheet modal with global hotkey navigation (Ctrl+B, ?).
```
