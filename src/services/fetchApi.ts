import { createAsyncThunk } from "@reduxjs/toolkit";
import pokemonApi from "./pokemonApi";

interface ParamsTypes {
  limit: number;
  offset: number;
}

export const fetchSearchPokemon = createAsyncThunk(
  "pokemon/fetchSearchPokemon",
  async ({ limit, offset }: ParamsTypes, thunkApi) => {
    try {
      const response = await pokemonApi.get(`/api/v2/pokemon`, {
        params: { limit, offset },
      });

      return response.data.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
