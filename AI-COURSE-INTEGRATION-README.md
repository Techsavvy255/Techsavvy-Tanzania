# Techsavvy Tanzania — AI course integration

## Files changed
- `course.html`: adds a Start learning link for the AI & ChatGPT course after successful enrollment.
- `ai-learning.html`: adds the supplied bilingual AI learning workspace as a separate page.
  It checks the Supabase session, approved learner status, and enrollment in `ai-chatgpt`
  before displaying the learning workspace.

## Important content status
The supplied learning workspace currently contains full lesson material for Module 1.
The remaining modules are still placeholders / future content in the supplied source.
Do not advertise all 10 modules as fully completed until their lessons, activities,
knowledge checks and assessments have been authored and tested.

## Upload
Upload the updated `course.html` and new `ai-learning.html` to the repository root.
Keep all other existing repository files and folders unchanged.
The page expects the existing `assets/supabase-config.js` and current Supabase RPCs:
- `learner_access`
- `my_courses`

## Test after publishing
1. Open `course.html?c=ai-chatgpt` while signed out: it should request login.
2. Sign in with a learner account that is not approved: it should not grant access.
3. Sign in with an approved learner who is not enrolled: it should not grant access to lessons.
4. Enroll in AI & ChatGPT, then click Start learning.
5. Confirm English/Kiswahili toggle, module navigation, activities, notes and progress.
6. Test on mobile and desktop.
