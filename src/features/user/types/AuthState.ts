export type AuthStoreError =  Error | undefined | null;
export interface AuthState {
  /*user: User | null,*/
  token: string | null,
  loading: boolean,
  error: AuthStoreError
}
