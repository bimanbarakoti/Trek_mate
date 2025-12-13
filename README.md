TrekMate
========

A small React + Vite application showcasing trekking routes and helpful tools, including an AI assistant.

AI Integration
--------------

TrekMate supports integration with two AI backends:

- ChatGPT (server-side endpoint expected at `VITE_CHATGPT_API_URL`)
- Gemini (server-side endpoint expected at `VITE_GEMINI_API_URL`)

If you want to enable the AI assistant, set the following environment variables in a `.env` file at the project root:

```
VITE_CHATGPT_API_URL=https://your.api.server/ai/chatgpt
VITE_GEMINI_API_URL=https://your.api.server/ai/gemini
```

During development, the assistant will use mock responses if the endpoints are not available.

Usage
-----

- `npm install`
- `npm run dev` to start the development server
- `npm run build` to build the production bundle

UI / UX
-------

- Responsive layout across desktop, tablet, and mobile
- Search and filters for treks
- AI assistant for recommendations, packing lists, and safety tips

Contributing
------------

Contributions welcome. Ensure `npm run lint` passes before submitting a PR.
