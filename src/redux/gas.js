import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BigInt from 'big-integer';

export const getEstimatedGas = createAsyncThunk(
  'estimatedGas/getEstimatedGas', async (selectedToken) => {
    if (!selectedToken.from || !selectedToken.to || !selectedToken.fromAmount) return 0;


    const amount = BigInt(Number(selectedToken.fromAmount)) * BigInt(10 ** selectedToken.from.decimals);
    console.log(selectedToken.fromAmount);
    console.log(selectedToken.from.decimals);
    console.log(amount);
    const params = {
      sellToken: selectedToken.from.address,
      buyToken: selectedToken.to.address,
      sellAmount: amount,
    };

    const headers = { '0x-api-key': 'c24e40fc-02e9-498c-a46a-40a84ab1814c' };

    const response = await fetch(`https://api.0x.org/swap/v1/price?${new URLSearchParams(params)}`, { headers });

    const swapQuoteJSON = await response.json();
    console.log(swapQuoteJSON);
    return swapQuoteJSON.estimatedGas;
  },
);

const gasSlice = createSlice({
  name: 'estimatedGas',
  initialState: {
    estimatedGas: 0,
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEstimatedGas.fulfilled, (state, action) => {
      state.price = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getEstimatedGas.pending, (state, action) => {
      state.action = action.payload;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getEstimatedGas.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default gasSlice.reducer;
