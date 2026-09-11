# Hotel Room Booking

React + TypeScript + Vite single-page app for the Raintech hotel booking coding test. Dates, nights, and price live in domain functions; the UI only collects a stay and renders the result. Room data is hardcoded — there is no backend.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

```bash
npm test      # night / price / date validation
npm run build # production typecheck + bundle
```

## Stack

- React 19
- TypeScript (strict)
- Vite 8
- CSS modules + design tokens (light and dark)
- Vitest for domain tests

## Sample data

Rooms match the brief (R101–R301). A few existing bookings are generated from today’s date so you can see unavailability:

- **R101** booked starting tomorrow for 3 nights
- **R201** booked in 7 days
- **R301** booked in 14 days

## With more time

- Load live availability instead of hardcoded bookings
- Persist a confirmed reservation
- Cover the page with component tests
- Guest and rate rules beyond max occupancy
