import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getQuote = createAsyncThunk(
  'quote/getQuote', async (selectedToken, { getState }) => {
    if (!selectedToken.from || !selectedToken.to || !selectedToken.fromAmount) return 0;


    const amount = Number(selectedToken.fromAmount * 10 ** selectedToken.from.decimals);
    console.log(selectedToken.fromAmount);
    console.log(selectedToken.from.decimals);
    console.log(amount);
    const params = {
      sellToken: selectedToken.from.address,
      buyToken: selectedToken.to.address,
      sellAmount: amount,
      takerAddress: getState().account,
    };

    const headers = { '0x-api-key': 'c24e40fc-02e9-498c-a46a-40a84ab1814c' };

    const response = await fetch(`https://api.0x.org/swap/v1/quote?${new URLSearchParams(params)}`, { headers });

    const swapQuoteJSON = await response.json();
    console.log("Quote: ", swapQuoteJSON);
    return swapQuoteJSON;
  },
);

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: {},
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuote.fulfilled, (state, action) => {
      state.quote = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getQuote.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getQuote.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default quoteSlice.reducer;
