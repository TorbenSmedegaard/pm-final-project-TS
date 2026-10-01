# StreamLine Spotlight Curated Rail

**Author:** Me  
**Status:** Draft  
**Target:** High-Fidelity Prototype  
**Persona:** Disillusioned Curated Seeker

---

## 1. The Big Picture

### Vision

Help Wanderers discover something worth watching in minutes through trusted human curation instead of repetitive algorithmic recommendations.

### Press Release

Today, many StreamLine users spend significant time browsing without finding anything they want to watch. They increasingly trust friends, critics, newsletters, and competitors more than StreamLine's recommendation engine.

Spotlight Curated Rail restores discovery confidence by featuring a hand-picked selection of high-quality titles chosen by editors. Instead of endless scrolling through algorithmic recommendations, users can immediately access a trusted set of recommendations designed to help them find something worth watching and start viewing faster.

### Success Metric

Increase Month 1 retention among Wanderers exposed to Spotlight from 64% to 79%, an increase of 15 percentage points.

### Guardrails

- Maintain Homepage → Playback conversion at or above 29%.
- Maintain 30+ minute session rate at or above 11%.

---

## 2. The Details

### User Stories

#### User Story 1: Prominent Curated Discovery

As a Disillusioned Curated Seeker, I want a curated content section on the homepage so that I can avoid browsing through repetitive recommendations.

##### Acceptance Criteria

- Spotlight is visible on the homepage without excessive scrolling.
- Spotlight is visually distinct from algorithmic recommendation rows.
- Spotlight contains only editorially selected titles.

#### User Story 2: Focused Choice

As a Disillusioned Curated Seeker, I want a small set of trusted recommendations so that I can choose something to watch quickly.

##### Acceptance Criteria

- Spotlight contains between 10 and 20 titles.
- Users can browse all Spotlight titles within a single horizontal rail.
- Spotlight titles are presented consistently.

#### User Story 3: Measurable Engagement

As a Product Team, I want to measure engagement with Spotlight so that I can evaluate whether curated discovery improves retention.

##### Acceptance Criteria

- Spotlight impressions are tracked.
- Spotlight title clicks are tracked.
- Spotlight title-details views are tracked.
- Playback starts originating from Spotlight are tracked.
- Spotlight-driven viewing is attributed separately from standard recommendation journeys.
- Spotlight attribution is preserved from title selection through playback within the same browsing session.

---

## Screens to Build

### Screen 1: Entry Point, Homepage

**Purpose:** Introduce the Spotlight discovery experience.

#### UI Elements

- StreamLine header and navigation.
- Homepage content rails.
- Spotlight section headline.
- Spotlight rail positioned prominently near the top of the page.
- Horizontal content carousel.
- Spotlight identifier label.

### Screen 2: Feature Core, Spotlight Rail Interaction

**Purpose:** Enable the user to explore curated recommendations.

#### UI Elements

- Spotlight rail.
- Between 10 and 20 curated content cards.
- Title artwork.
- Content title.
- Spotlight visual treatment.
- Previous and next navigation controls.
- Hover and keyboard-focus states.

### Screen 3: Title Details

**Purpose:** Help the user evaluate a selected Spotlight title.

#### UI Elements

- Selected title artwork.
- Content title.
- Runtime and genre.
- Content synopsis.
- Editorial recommendation label.
- Play CTA.
- Spotlight attribution indicator.

### Screen 4: Success and Conversion State

**Purpose:** Confirm that playback was initiated from Spotlight.

#### UI Elements

- Playback-start confirmation.
- Selected content title.
- Spotlight discovery-source indicator.
- Same-session attribution confirmation.
- Return-to-homepage action.

---

## Functional Requirements

### FR1: Dedicated Spotlight Rail

The system shall display a dedicated Spotlight rail on the homepage.

### FR2: Editorially Curated Content

The system shall display only editorially curated titles within Spotlight.

### FR3: Focused Content Selection

The system shall make between 10 and 20 Spotlight titles available for browsing within a single horizontal rail.

### FR4: Distinct Visual Treatment

The Spotlight rail shall be visually distinguishable from algorithmic recommendation rails.

### FR5: Impression Tracking

The system shall record every valid Spotlight impression.

### FR6: Click and Details-View Tracking

The system shall record every Spotlight title click and resulting Spotlight title-details view.

### FR7: Playback Tracking

The system shall record every playback initiated from Spotlight.

### FR8: Separate Spotlight Attribution

The system shall attribute viewing activity originating from Spotlight separately from standard recommendation sources.

### FR9: Attribution Persistence

The system shall preserve the Spotlight discovery source and originating session identifier across homepage, title-details, and playback interactions within the same browsing session.

---

## Measurement and Attribution Rules

### MA1: Impression Attribution

If the Spotlight rail is rendered on the homepage and is visible to the user, the system shall record one `spotlight_impression` event for that Spotlight exposure within the current page visit.

The event shall include:

- `eventType`
- `timestamp`
- `sessionId`
- `experimentVariant`
- `source`

### MA2: Click Attribution

If a user selects a title from the Spotlight rail, the system shall record a `spotlight_title_click` event associated with the selected title.

The event shall include:

- `eventType`
- `timestamp`
- `titleId`
- `title`
- `sessionId`
- `discoverySource`
- `experimentVariant`
- `secondsFromArrival`

### MA3: Title-Details View Tracking

If a user reaches a title-details view by selecting a Spotlight title, the system shall record a `spotlight_title_details_view` event.

The event shall include:

- `eventType`
- `timestamp`
- `titleId`
- `title`
- `sessionId`
- `discoverySource`
- `secondsFromArrival`
- `withinDiscoveryTarget`

`withinDiscoveryTarget` shall be `true` when the title-details view is reached within 60 seconds of homepage arrival.

### MA4: Playback Attribution

If a user initiates playback from a title accessed through Spotlight during the current session, the system shall record a `playback_start` event attributed to Spotlight.

The event shall include:

- `eventType`
- `timestamp`
- `titleId`
- `title`
- `discoverySource`
- `attributedSessionId`
- `currentSessionId`
- `sameSession`
- `experimentVariant`

### MA5: Discovery-Source Persistence

The `discoverySource` and `attributedSessionId` shall be maintained while the user moves through:

1. Homepage.
2. Spotlight rail.
3. Title-details view.
4. Playback initiation.

### MA6: Time-to-Discovery Measurement

The system shall record a homepage-arrival timestamp when the user lands on the homepage.

Time to Discovery shall be calculated as:

```text
Title Details View Timestamp - Homepage Arrival Timestamp
