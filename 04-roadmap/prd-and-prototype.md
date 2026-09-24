# StreamLine Spotlight Curated Rail, Simplified PRD (StreamLine)

**Author:** Me · **Status:** Draft · **Target:** High-Fidelity Prototype · **Persona:** Disillusioned Curated Seeker

## 1. The Big Picture
- **Vision:** Help Wanderers discover something worth watching in minutes through trusted human curation instead of repetitive algorithmic recommendations.
- **Press release:** Today, many StreamLine users spend significant time browsing without finding anything they want to watch. They increasingly trust friends, critics, newsletters, and competitors more than StreamLine's recommendation engine.

Spotlight Curated Rail restores discovery confidence by featuring a hand-picked selection of high-quality titles chosen by editors. Instead of endless scrolling through algorithmic recommendations, users can immediately access a trusted set of recommendations designed to help them find something worth watching and start viewing faster.
- **Success metric:** Increase Month 1 retention among Wanderers exposed to Spotlight from 64% to 79% (+15 percentage points).
- **Guardrail:** Maintain Homepage → Playback conversion ≥ 29% Maintain 30+ minute session rate ≥ 11%

## 2. The Details
### User stories
- User Story 1
- As a Disillusioned Curated Seeker, I want a curated content section on the homepage so that I can avoid browsing through repetitive recommendations.
- Acceptance Criteria
- Spotlight is visible on the homepage without scrolling excessively.
- Spotlight is visually distinct from algorithmic recommendation rows.
- Spotlight contains only editorially selected titles.
- User Story 2
- As a Disillusioned Curated Seeker, I want a small set of trusted recommendations so that I can choose something to watch quickly.
- Acceptance Criteria
- Spotlight contains between 10 and 20 titles.
- Users can browse all Spotlight titles within a single horizontal rail.
- Spotlight titles are presented consistently.
- User Story 3
- As a Product Team, I want to measure engagement with Spotlight so that I can evaluate whether curated discovery improves retention.
- Acceptance Criteria
- Spotlight impressions are tracked.
- Spotlight title clicks are tracked.
- Playback starts originating from Spotlight are tracked.
- Spotlight-driven viewing can be attributed separately from standard recommendations.
### Screens to build
- Screen 1: Entry Point (Homepage)
- Purpose: Introduce Spotlight discovery experience.
- UI Elements
- StreamLine header/navigation
- Homepage content rails
- Spotlight section headline
- Spotlight rail positioned prominently near top of page
- Horizontal content carousel
- Spotlight identifier label
- Screen 2: Feature Core (Spotlight Rail Interaction)
- Purpose: User explores curated recommendations.
- UI Elements
- Spotlight rail
- 10-20 curated content cards
- Title artwork
- Content title
- Spotlight visual treatment
- Previous/next navigation controls
- Hover/focus state
- Screen 3: Success / Conversion State
- Purpose: User selects content from Spotlight.
- UI Elements
- Selected title details
- Play CTA
- Content synopsis
- Spotlight attribution indicator
- Playback start confirmation
### Functional requirements
- FR1
- System shall display a dedicated Spotlight rail on the homepage.
- FR2
- System shall display only editorially curated titles within Spotlight.
- FR3
- System shall display between 10 and 20 Spotlight titles simultaneously available for browsing.
- FR4
- Spotlight rail shall be visually distinguishable from algorithmic recommendation rails.
- FR5
- System shall record every Spotlight impression.
- FR6
- System shall record every Spotlight title click.
- FR7
- System shall record every playback initiated from Spotlight.
- FR8
- System shall attribute viewing activity originating from Spotlight separately from standard recommendation sources.
### Smart behaviors (Situation → Outcome)
- If a user lands on the homepage, then the Spotlight rail is displayed prominently near the top of the discovery experience.
- If a user views the Spotlight rail, then a Spotlight impression event is recorded.
- If a user scrolls horizontally within the Spotlight rail, then additional curated titles are revealed.
- If a user selects a Spotlight title, then the user is navigated to the title details page.
- If a user starts playback from a Spotlight title, then the playback is attributed to Spotlight as the discovery source.
- If a user views Spotlight but takes no further action, then the view is recorded for funnel analysis.
- If the Spotlight collection contains no curated titles, then the Spotlight rail is hidden and the homepage continues to function normally.
- If a title appears in Spotlight, then it must originate from the editorially curated Spotlight collection.
- If a title is clicked from Spotlight, then a Spotlight click event is recorded.
- If Spotlight content cannot be loaded, then the user continues to see the standard homepage experience without an error state.
### Technical constraints
- No external APIs.
- No recommendation engine changes.
- No personalization algorithms.
- No login or account-management work.
- Prototype state managed using local state only (useState).
- No backend content management tooling.
- Static mock content permitted for prototyping.
- No email or notification integrations.

## 3. The Logistics
### Features out
- Mood-Based Entry Point (A4)
- Personalized Spotlight Queue (A5)
- Spotlight Digest Email (A6)
- Curator Profiles (A7)
- "Why You'll Love This" Labels (A2)
- Watch Party (A8)
- Advanced Filter Engine (A9)
- Offline Download (A10)
- Social features
- Ratings and reactions
- Advanced personalization
- New search experiences
### Edge cases & safety guard
- Empty Spotlight Collection
- If no curated titles exist, Spotlight is hidden and homepage experience continues normally.
- Missing Artwork
- If artwork fails to load, placeholder artwork is displayed.
- Duplicate Titles
- System prevents duplicate titles within the Spotlight rail.
- No User Interaction
- If user ignores Spotlight, impression data is still captured for analysis.
- Safety / Hallucination Guard
- Only titles explicitly included in the editorial Spotlight collection may be displayed. The system must not generate or invent recommendations outside the curated set.
### Decision log
- Decision 1
- We intentionally chose editorial curation over personalization to validate trust in curation before investing in recommendation complexity.
- Decision 2
- We intentionally excluded mood-based discovery and curator-follow features to maximize learning within a 3-week sprint and protect delivery confidence.
### Evals
- Eval 1: Engagement
- At least 35% of Spotlight-exposed Wanderers interact with a Spotlight title.
- Eval 2: Discovery Efficiency
- Users reach a title detail page from Spotlight within 60 seconds of homepage arrival.
- Eval 3: Retention Impact
- Spotlight-exposed Wanderers demonstrate a pathway toward the target Month 1 retention increase from 64% to 79%, while maintaining:
- Homepage → Playback conversion ≥ 29%
- 30+ minute session rate ≥ 11%

## MoSCoW scope
- **Must:** Dedicated Spotlight rail displayed on the homepage.; Editorially curated selection of titles maintained by content editors.; Small, focused set of curated titles to reduce choice overload.; Tracking of Spotlight impressions, clicks, and playback starts.; Attribution of plays originating from Spotlight for experiment measurement.
- **Should:** Spotlight headline; Hidden Gem Badge; Short editorial introduction; A/B test setup
- **Could:** Curator name; Multiple curated collections; Refresh picks
- **Won't (now):** Mood-based entry; Personalized queue; Digest email; Curator profiles; AI explanations; Social features; Advanced filters; Offline functionality

---
**Builder hook:** Build a working prototype based on this PRD. Use the User Story as the core flow, Functional Requirements as build constraints, and prioritize speed and clarity over visual complexity.
