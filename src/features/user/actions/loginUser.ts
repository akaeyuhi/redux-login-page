import { createAppAsyncThunk } from '../../../app/createAsyncThunk';
import { UserDTO } from '../../../services/DTO/UserDTO';
import { AuthStoreError } from '../types/AuthState';
import { AuthFulfilled } from '../types/AuthFulfilled';

export const loginUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
  'account/login',
  async (dto: UserDTO, { rejectWithValue, extra }) => {
    try {
      const response = await extra.authService.login(dto.username, dto.password);
      if ((response as any).error) {
        return rejectWithValue((response as any).error);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message ?? error.message);
    }
  }
);
