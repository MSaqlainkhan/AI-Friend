# Local AI Chat (Rust + React)

A fully local AI chat application. The **backend** is a Rust server that runs the quantized **Phi-3 Mini 4K Instruct** model on-device using [Candle](https://github.com/huggingface/candle), and the **frontend** is a **React** app that talks to it over a simple HTTP API. No external AI API keys are required.

## Features

- Runs the LLM locally on CPU (Phi-3 Mini, 4-bit GGUF)
- Multiple chat personalities: `boyfriend`, `girlfriend`, or a default helpful assistant
- Simple JSON API (`POST /api/chat`)
- CORS configured for the React dev server
- Short, conversational replies (capped at 60 generated tokens)

## Tech Stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Backend  | Rust, Axum, Tokio, Candle (`candle-core`, `candle-transformers`)  |
| Model    | `microsoft/Phi-3-mini-4k-instruct-gguf` (`q4`)                    |
| Tokenizer| `tokenizers` + `hf-hub` (auto-download from Hugging Face)         |
| Frontend | React (Vite dev server on port `5173`)                            |

## Project Structure

```
.
├── backend/     # Rust + Axum + Candle inference server
└── frontend/    # React app
```

> Adjust the folder names above to match your repository.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable, 2021 edition or newer)
- [Node.js](https://nodejs.org/) 18+ and npm
- ~3 GB of free disk space for the model download
- Internet connection on first run (the model and tokenizer are downloaded from Hugging Face and cached)

## Getting Started

### 1. Run the backend

```bash
cd backend
cargo run --release
```

The server starts at **http://127.0.0.1:3000**.

On the first request, the model (`Phi-3-mini-4k-instruct-q4.gguf`) and `tokenizer.json` are downloaded to the Hugging Face cache and reused afterward.

> Use `--release`. Debug builds are dramatically slower for inference.

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:5173**. This origin is the one allowed by the backend's CORS configuration.

## API Reference

### `POST /api/chat`

**Request body**

```json
{
  "message": "Hi, how are you?",
  "personality": "girlfriend"
}
```

| Field         | Type   | Description                                                        |
| ------------- | ------ | ------------------------------------------------------------------ |
| `message`     | string | The user's message                                                 |
| `personality` | string | `"boyfriend"`, `"girlfriend"`, or anything else for the default assistant |

**Response**

```json
{
  "reply": "Hey babe! 🥰 I'm doing great now that I'm talking to you. How was your day?"
}
```

**Example with curl**

```bash
curl -X POST http://127.0.0.1:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","personality":"boyfriend"}'
```

## Configuration

Values currently set in `backend/src/main.rs`:

| Setting               | Value                                | Where                         |
| --------------------- | ------------------------------------ | ----------------------------- |
| Server address        | `127.0.0.1:3000`                     | `SocketAddr::from(...)`       |
| Allowed CORS origin   | `http://localhost:5173`              | `CorsLayer::allow_origin`     |
| Max generated tokens  | `60`                                 | `max_token_generation_length` |
| Temperature / Top-p   | `0.8` / `0.95`                       | `LogitsProcessor::new`        |
| Device                | CPU                                  | `Device::Cpu`                 |

To add or change a personality, edit the `match payload.personality.as_str()` block in `handle_chat_inference`.

## Known Limitations

- **Model loads on every request.** The GGUF weights and tokenizer are loaded inside the request handler, so each reply has noticeable latency. Loading the model once at startup and sharing it via Axum state (`Arc<Mutex<...>>`) would greatly improve speed.
- **No conversation history.** Each request is stateless; only the latest message is sent to the model.
- **CPU-only inference**, so replies can take a few seconds depending on your hardware.
- **Short replies** because of the 60-token generation cap.

## Troubleshooting

- **CORS errors in the browser:** make sure the frontend runs on `http://localhost:5173`, or update the allowed origin in the backend.
- **First request hangs:** the model is still downloading. Check your network connection and disk space.
- **Very slow responses:** run the backend with `cargo run --release`.
- **Port already in use:** stop whatever is using port `3000`, or change the port in `main.rs`.

## License

Add your license here (e.g., MIT). Note that Phi-3 is released by Microsoft under its own license; review it before any distribution.
