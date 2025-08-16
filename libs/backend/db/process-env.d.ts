declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: string;
      DATABASE_PORT: string;
      DATABASE_NAME: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
    }
  }
}

export {};
