export type TokenResponse = {
  token: string;
  expires: Date;
};

export type AuthTokensResponse = {
  access: TokenResponse;
  refresh?: TokenResponse;
};

export type ResponseObject = {
  status: boolean;
  data?: Record<string, unknown> | undefined;
};
