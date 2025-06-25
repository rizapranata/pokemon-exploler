import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchPokemon } from "../services/fetchApi";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  data: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchPokemon.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pokemonSlice.reducer;
