import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "../services/ProductService";
const productService = new ProductService();

const initialState = {
  past: [],
  present: [],
  future: [],
  experiments: [],
  saveexperiment: [],
  copy_present: [],
  changesDone: false,
};

const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await productService.getProducts();
  return response;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    undo: (state) => {
      const len = state.past.length;
      let data = [];
      state.past[len - 1].map((i) => data.push(i));
      state.present = data;
      state.past.pop();
    },
    updateUser: (state, action) => {
      state.past.push(state.present);
      state.present = action.payload;
      state.changesDone = true;
    },
    resetChanges: (state) => {
      state.past = [];
      state.present = state.future;
      state.changesDone = false;
    },
    savechanges: (state, action) => {
      state.experiments = [...state.experiments, action.payload];

      state.past = [];
    },
    removesave: (state, action) => {
      const removeItem = state.experiments.filter(
        (exp) => exp.time !== action.payload
      );
      state.experiments = removeItem;
    },
    deleteRow: (state, action) => {
      state.present = state.present.filter(
        (val) => val.id !== action.payload.id
      );
      state.past = [];
      state.future = state.present;
    },
    deleteMultipleRows: (state, action) => {
      action.payload.map((item) => {
        return (state.present = state.present.filter(
          (val) => val.id !== item.id
        ));
      });
      state.past = [];
      state.future = state.present;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.present = action.payload;
      state.future = action.payload;
    });
  },
});
export const {
  updateUser,
  resetChanges,
  savechanges,
  undo,
  deleteRow,
  deleteMultipleRows,
  showSaveExp,
  removesave,
} = userSlice.actions;
export { fetchProducts };
export default userSlice.reducer;
