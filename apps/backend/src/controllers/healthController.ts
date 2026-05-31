import { Controller, Get, Route } from "tsoa";

export interface HealthResponse {
  success: boolean;
  message: string;
}

@Route("api/v1/health")
export class HealthController extends Controller {
  @Get()
  public async getHealth(): Promise<HealthResponse> {
    return { success: true, message: "OK" };
  }
}
