# ⚽ Player Finder

A real-time sports player search web app that retrieves live athlete data from third-party sports APIs through a custom-built proxy backend. Search for football players and get up-to-date stats and information instantly.

---

## Features

- 🔍 Real-time player search powered by third-party sports APIs
- 🌐 Custom proxy backend to handle API requests securely
- ⚡ Async data fetching with low-latency server-side rendering
- 🛡️ API rate limit handling, caching strategies, and fallback logic
- 📱 Responsive UI with clean, dynamic rendering

---

## Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Backend   | Node.js, Express.js            |
| Frontend  | HTML, CSS, JavaScript          |
| Data      | Third-party REST APIs (sports) |

---

## Project Structure

```
football player finder/
├── server.js / index.js    # Express proxy server
├── /public                 # Frontend assets (HTML, CSS, JS)
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- API key from your sports data provider (e.g. API-Football, SportsDB)

### Installation

```bash
git clone https://github.com/lcpratik/Player-Finder.git
cd Player-Finder/football\ player\ finder
npm install
```

### Environment Setup

Create a `.env` file and add your API key:

```env
API_KEY=your_sports_api_key_here
```

### Run

```bash
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Key Engineering Decisions

- **Proxy backend** — all third-party API calls are routed through the server to keep API keys out of the client and enable server-side caching
- **Rate limit handling** — built-in logic to detect rate limit responses and fall back gracefully rather than crashing the UI
- **Async middleware** — request handling is fully async to avoid blocking the event loop during API calls
- **Dynamic rendering** — search results update the DOM in real time without full page reloads

---

## Author

**Pratik Lamichhane**  
[lcpratik.com](https://lcpratik.com) · [GitHub](https://github.com/lcpratik) · [LinkedIn](https://linkedin.com/in/lcpratik)
