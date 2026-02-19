import { onRequestOptions as __api_lead_ts_onRequestOptions } from "/Users/arthurbueno/HaruCode/apps/harucode-main-page/functions/api/lead.ts"
import { onRequestPost as __api_lead_ts_onRequestPost } from "/Users/arthurbueno/HaruCode/apps/harucode-main-page/functions/api/lead.ts"

export const routes = [
    {
      routePath: "/api/lead",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_lead_ts_onRequestOptions],
    },
  {
      routePath: "/api/lead",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_lead_ts_onRequestPost],
    },
  ]