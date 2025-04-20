import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create user
export const createUser = createAsyncThunk(
  "userDetail/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://680547e6ca467c15be68bcc5.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "userDetail/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://680547e6ca467c15be68bcc5.mockapi.io/crud/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Show all users
export const showUser = createAsyncThunk(
  "userDetail/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://680547e6ca467c15be68bcc5.mockapi.io/crud");

      if (!response.ok) throw new Error("Failed to fetch users");

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "userDetail/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://680547e6ca467c15be68bcc5.mockapi.io/crud/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      await response.json(); // optional
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Show users
      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
