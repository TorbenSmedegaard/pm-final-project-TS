# A/B Experiment Brief, StreamLine (B2C)

## Parameters
| Parameter | Decision |
|---|---|
| Feature under test | A1 · Spotlight Curated Rail  A hand-picked homepage content rail that bypasses the recommendation algorithm and presents trusted, editorially curated titles to help users quickly discover something worth watching. |
| Persona | Disillusioned Curated Seeker/Wanderer |
| Expected outcome | help Wanderers discover something worth watching in minutes through trusted human curation instead of repetitive algorithmic recommendations. |
| Primary success metric | Month 1 retention among Wanderers |
| Baseline rate | 64% |
| Guardrail metric | 30+ minute session rate by ensuring it remains at or above 11% |
| Guardrail boundary | ≥ 11% |
| Second guardrail | Maintain Homepage → Playback conversion ≥ 29%. |
| Minimum Detectable Effect | 2-percentage-point |
| Sample size per arm | 8.927 |
| Traffic split | 50/50 |
| Test duration | 30-day observation window after sample enrolment |
| Significance threshold | p < 0.05 |

## Control vs. Variant
- **Control (A):** The current StreamLine homepage experience where Wanderers discover content through existing algorithmically generated recommendation rails. Users browse recommendations as they do today, with no editorially curated Spotlight rail.
- **Variant (B):** The current StreamLine homepage with one change: replace one existing algorithmic recommendation rail with the Spotlight Curated Rail, a hand-picked set of editorially curated titles designed to help users discover trusted, high-quality content faster.
- **Held constant (isolation check):** Everything except the tested rail remains unchanged:

User eligibility and Wanderer segmentation
App version and performance
Homepage layout and navigation
Content catalogue
Search functionality
Playback experience
Account functionality
Onboarding
Notifications and email communications
Subscription pricing and promotions
Tracking and measurement methodology
Traffic allocation (50/50)

The only difference between control and variant is the content-selection method of the tested homepage rail.

## Hypothesis
> I believe that A1 · Spotlight Curated Rail  A hand-picked homepage content rail that bypasses the recommendation algorithm and presents trusted, editorially curated titles to help users quickly discover something worth watching. for Disillusioned Curated Seeker/Wanderer will result in help Wanderers discover something worth watching in minutes through trusted human curation instead of repetitive algorithmic recommendations., as measured by a 2-percentage-point change in Month 1 retention among Wanderers within 30-day observation window after sample enrolment. We will protect 30+ minute session rate by ensuring it remains at or above 11% throughout the test.

## Shipping criteria
> We will **ship** if Month 1 retention among Wanderers improves by ≥ 2-percentage-point at p < 0.05 and 30+ minute session rate by ensuring it remains at or above 11% does not reach ≥ 11% after 30-day observation window after sample enrolment.
> We will **iterate** if direction is positive but lift is below the MDE.
> We will **kill** if the primary metric shows no improvement or moves negatively.
> The read date is fixed at the end of 30-day observation window after sample enrolment, no results reviewed before this date.
