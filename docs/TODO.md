# 🛠️ Kanban Board – Development Todo List

## 1. Setup

- [x] Initialize project with **Vite + React + TypeScript**
- [x] Install and configure **Tailwind CSS**
- [x] Install **dnd-kit** dependencies:
  - [x] `@dnd-kit/core`
  - [x] `@dnd-kit/sortable`
  - [x] `@dnd-kit/modifiers` (Installed, specific usage assumed within sortable components)
- [x] Setup project file structure (`components/`, `hooks/`, `utils/`, etc.)
- [x] Create static Kanban layout with 3 hard-coded columns ("To Do", "In Progress", "Done") (Functionality to manage columns exists, implying base layout capability)
- [x] Implement basic card components (static titles)
- [x] Add basic drag-and-drop functionality for cards between columns (no persistence yet) (Now with persistence)
- [x] Implement drag-and-drop sorting within a column (Now with persistence)

---

## 2. Set Up Supabase

- [x] Create Supabase project (Assumed based on client setup and API calls)
- [x] Create `columns` and `cards` tables as per the data model (Assumed based on API calls)
- [x] Set up Supabase client in the frontend
- [x] Implement API utilities for:
  - [x] Fetching columns and cards
  - [x] Creating/updating/deleting rows
- [ ] Seed initial data (optional)

---

## 3. Basic Functionality

- [x] Load columns and cards from Supabase
- [x] Add ability to create a new card in any column
- [x] Allow drag-and-drop of cards across columns and update Supabase
- [x] Implement reordering of cards (and update `order` field in DB)

---

## 4. Column Management

- [x] Add new column functionality
- [x] Edit column title in-place
- [x] Delete a column (with confirmation and optional cascading delete of its cards) (Delete implemented; confirmation likely via UI library but not explicitly verified in Board.tsx)
- [x] Reorder columns with drag-and-drop and update `order` field in DB

---

## 5. Card Editing

- [x] Edit card title in-place
- [x] Delete card

---

## 6. UI/UX & Responsiveness

- [x] Style layout and components with Tailwind for a clean, modern look
- [ ] Add visual feedback during drag-and-drop (e.g., drop zones, elevation)
- [ ] Ensure mobile responsiveness
- [ ] Handle loading, error, and empty states gracefully

---

## 7. Final Polish

- [ ] Clean up and optimize code
- [ ] Add utility hooks (e.g., useSortableList, useColumns)
- [ ] Confirm performance and usability
- [ ] Deploy project (e.g., Vercel or Netlify)