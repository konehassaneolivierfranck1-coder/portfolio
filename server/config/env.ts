export interface AppConfig {
  port: number;
  nodeEnv: string;
  isProduction: boolean;
  geminiApiKey?: string;
  officialCvUrl: string;
  allowedOrigins: string[];
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  geminiApiKey: process.env.GEMINI_API_KEY?.trim(),
  officialCvUrl: "https://drive.google.com/file/d/1mrnQTfe9so5dV8GfAGPpNsO78EEl5PM6/view?usp=drivesdk",
  allowedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    // All dynamic preview hosts permitted via custom origin validator
  ]
};
