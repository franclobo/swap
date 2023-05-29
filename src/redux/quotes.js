import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getQuote = createAsyncThunk(
  'quotes/getQuote', async (selectedToken) => {
    if (!selectedToken.from || !selectedToken.to || !selectedToken.fromAmount) return 0;


    const amount = Number(selectedToken.fromAmount * 10 ** selectedToken.from.decimals);
    let accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("Selected Token From Ammount: ", selectedToken.fromAmount);
    console.log("Selected Token From Decimals: ", selectedToken.from.decimals);
    console.log("Amount: ", amount);
    console.log("Accounts: ", accounts);
    const params = {
      sellToken: selectedToken.from.address,
      buyToken: selectedToken.to.address,
      sellAmount: amount,
      takerAddress: accounts[0],
    };

    const headers = { '0x-api-key': 'c24e40fc-02e9-498c-a46a-40a84ab1814c' };

    const response = await fetch(`https://api.0x.org/swap/v1/quote?${new URLSearchParams(params)}`, { headers });

    const swapQuoteJSON = await response.json();
    console.log("Quote: ", swapQuoteJSON);
    console.log("Sell Token Address: ", swapQuoteJSON.sellTokenAddress);
    return { quote: swapQuoteJSON, sellTokenAddress: swapQuoteJSON.sellTokenAddress }
  },
);

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: {
    quote: {},
    sellTokenAddress: '',
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuote.fulfilled, (state, action) => {
      state.quote = action.payload.quote;
      state.sellTokenAddress = action.payload.sellTokenAddress;
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
