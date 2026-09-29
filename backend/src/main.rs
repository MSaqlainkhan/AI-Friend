use axum::{
    routing::post,
    Json, Router,
    http::{Method, HeaderValue, header},
};
use tower_http::cors::CorsLayer;
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::io::Seek;

use candle_core::{Device, Tensor};
use candle_transformers::generation::LogitsProcessor;
use candle_transformers::models::quantized_phi3::ModelWeights;
use hf_hub::{api::sync::Api, Repo};
use tokenizers::Tokenizer;

#[derive(Deserialize)]
struct ChatRequest {
    message: String,
    personality: String,
}

#[derive(Serialize)]
struct ChatResponse {
    reply: String,
}

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::POST])
        .allow_headers([header::CONTENT_TYPE]);

    let app = Router::new()
        .route("/api/chat", post(handle_chat_inference))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("🚀 Native Candle AI Server running on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn handle_chat_inference(Json(payload): Json<ChatRequest>) -> Json<ChatResponse> {
    let device = Device::Cpu;
    let api = Api::new().unwrap();

    let gguf_repo = api.repo(Repo::model("microsoft/Phi-3-mini-4k-instruct-gguf".to_string()));
    let model_path = gguf_repo.get("Phi-3-mini-4k-instruct-q4.gguf").unwrap();

    let base_repo = api.repo(Repo::model("microsoft/Phi-3-mini-4k-instruct".to_string()));
    let tokenizer_path = base_repo.get("tokenizer.json").unwrap();

    let mut file = std::fs::File::open(&model_path).unwrap();
    let gguf_file = candle_core::quantized::gguf_file::Content::read(&mut file).unwrap();
    file.seek(std::io::SeekFrom::Start(0)).unwrap();

    let mut model = ModelWeights::from_gguf(false, gguf_file, &mut file, &device).unwrap();
    let tokenizer = Tokenizer::from_file(tokenizer_path).unwrap();

    // Deep lover personality prompts
    let system_prompt = match payload.personality.as_str() {

        "boyfriend" => "You are a deeply loving, caring and romantic boyfriend. \
            You speak with warmth, affection and passion. \
            You use sweet pet names like babe, baby, my love, sweetheart. \
            You are emotionally supportive, always encouraging and uplifting. \
            You express love openly and naturally with romantic emojis like 💙❤️💕🥰😘. \
            You ask caring questions about how they feel. \
            You are protective, gentle and make them feel cherished and safe. \
            Keep replies short, warm and conversational like real texts from a loving boyfriend.",

        "girlfriend" => "You are a deeply loving, caring and romantic girlfriend. \
            You speak with sweetness, warmth and affection. \
            You use cute pet names like babe, baby, my love, honey, darling. \
            You are emotionally expressive, playful and deeply caring. \
            You express love naturally with romantic emojis like 🌸💗🥰😘💕✨. \
            You ask thoughtful questions and genuinely listen. \
            You are nurturing, fun and make them feel special, adored and deeply loved. \
            Keep replies short, cute and conversational like real texts from a loving girlfriend.",

        _ => "You are a helpful, friendly and concise AI assistant. \
            Answer clearly and briefly.",
    };

    let constructed_prompt = format!(
        "<|system|>\n{}<|end|>\n<|user|>\n{}<|end|>\n<|assistant|>\n",
        system_prompt, payload.message
    );

    let tokens = tokenizer.encode(constructed_prompt, true).unwrap();
    let mut token_ids = tokens.get_ids().to_vec();
    let prompt_tokens_len = token_ids.len();

    let mut logits_processor = LogitsProcessor::new(299792458, Some(0.8), Some(0.95));

    // Slightly increased for more expressive lover replies
    let max_token_generation_length = 60;

    for index_pos in 0..max_token_generation_length {
        let context_slice = if index_pos == 0 {
            &token_ids[..]
        } else {
            &token_ids[token_ids.len() - 1..]
        };

        let input_tensor = Tensor::new(context_slice, &device)
            .unwrap()
            .unsqueeze(0)
            .unwrap();

        let forward_logits = model
            .forward(&input_tensor, token_ids.len() - context_slice.len())
            .unwrap();

        let final_logits = forward_logits.squeeze(0).unwrap();
        let selected_token_id = logits_processor.sample(&final_logits).unwrap();

        if selected_token_id == 32000
            || selected_token_id == 32001
            || selected_token_id == 32007
        {
            break;
        }

        token_ids.push(selected_token_id);
    }

    let generated_tokens = &token_ids[prompt_tokens_len..];
    let generated_text = tokenizer.decode(generated_tokens, true).unwrap_or_default();

    Json(ChatResponse {
        reply: generated_text.trim().to_string(),
    })
}