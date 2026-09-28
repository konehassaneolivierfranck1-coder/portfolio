import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env";
import { SYSTEM_INSTRUCTION } from "../constants/portfolioData";
import { getKnowledgeBaseResponse } from "./knowledgeService";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export interface GroundingSource {
  title: string;
  url: string;
  type: "web" | "maps";
}

export interface ChatResponse {
  text: string;
  sources?: GroundingSource[];
}

export class AiService {
  private client: GoogleGenAI | null = null;

  constructor() {
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim().length > 5 && !apiKey.includes("YOUR_")) {
      try {
        this.client = new GoogleGenAI({
          apiKey: apiKey.trim(),
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.warn("Could not initialize Google GenAI SDK client:", err);
      }
    }
  }

  /**
   * Detects if the prompt is asking for geographic, location, directions or campus info
   */
  private isLocationQuery(query: string): boolean {
    const q = query.toLowerCase();
    const locationKeywords = [
      "où", "ou est", "ou se", "adresse", "localisation", "localiser", "situer",
      "bouaké", "bouake", "abidjan", "sokoura", "côte d'ivoire", "cote d'ivoire",
      "carte", "map", "maps", "lieu", "place", "ville", "campus", "université",
      "universite", "bureau", "itinéraire", "itineraire", "trajet", "distance",
      "quartier", "siège", "siege", "pays", "région", "region", "rdv", "rencontrer",
      "where", "location", "locate", "directions", "address", "city"
    ];
    return locationKeywords.some(keyword => q.includes(keyword));
  }

  /**
   * Generates a conversational response with Gemini 3.5 Flash Search Grounding or Maps Grounding,
   * with seamless fallback to our comprehensive knowledge base engine.
   */
  public async generateChatResponse(messages: ChatMessage[]): Promise<ChatResponse> {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user")?.text || "";
    const isLocation = this.isLocationQuery(lastUserMsg);

    // 1. Attempt Gemini 3.5 Flash Generation with Google Search or Google Maps Grounding
    if (this.client) {
      try {
        const contents = messages.map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

        let response: any;
        if (isLocation) {
          // Use Google Maps Grounding with reference location centered on Bouaké, Côte d'Ivoire
          response = await this.client.models.generateContent({
            model: "gemini-3.5-flash",
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.6,
              tools: [{ googleMaps: {} }],
              toolConfig: {
                retrievalConfig: {
                  latLng: {
                    latitude: 7.6900,
                    longitude: -5.0300, // Bouaké, Côte d'Ivoire coordinates
                  },
                },
              },
            },
          });
        } else {
          // Use Google Search Grounding for real-time web verification and tech accuracy
          response = await this.client.models.generateContent({
            model: "gemini-3.5-flash",
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
              tools: [{ googleSearch: {} }],
            },
          });
        }

        const replyText = response.text?.trim() || "";
        const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources: GroundingSource[] = [];
        const seenUrls = new Set<string>();

        for (const chunk of rawChunks as any[]) {
          if (chunk.web?.uri && !seenUrls.has(chunk.web.uri)) {
            seenUrls.add(chunk.web.uri);
            sources.push({
              title: chunk.web.title || "Référence Web",
              url: chunk.web.uri,
              type: "web",
            });
          }
          if (chunk.maps?.uri && !seenUrls.has(chunk.maps.uri)) {
            seenUrls.add(chunk.maps.uri);
            sources.push({
              title: chunk.maps.title || "Lieu Google Maps",
              url: chunk.maps.uri,
              type: "maps",
            });
          }
        }

        if (replyText) {
          return {
            text: replyText,
            sources: sources.slice(0, 4),
          };
        }
      } catch (err: any) {
        console.warn("Gemini generation skipped or failed, using robust fallback knowledge engine:", err?.message || err);
      }
    }

    // 2. Fallback to expert local knowledge retrieval with verified references
    const fallbackText = getKnowledgeBaseResponse(lastUserMsg);
    const fallbackSources: GroundingSource[] = [];

    if (isLocation) {
      fallbackSources.push({
        title: "Bouaké, Sokoura (Côte d'Ivoire)",
        url: "https://www.google.com/maps/search/?api=1&query=Sokoura+Bouak%C3%A9+C%C3%B4te+d%27Ivoire",
        type: "maps",
      });
      fallbackSources.push({
        title: "Université Alassane Ouattara (Bouaké)",
        url: "https://www.google.com/maps/search/?api=1&query=Universit%C3%A9+Alassane+Ouattara+Bouak%C3%A9",
        type: "maps",
      });
    }

    return {
      text: fallbackText,
      sources: fallbackSources.length > 0 ? fallbackSources : undefined,
    };
  }
}

export const aiService = new AiService();

