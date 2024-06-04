import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import { componentApi } from '../../shared/apis/componentApi';
import { RootState } from '../../shared/state';
import { EDITOR_INITIAL_STATE } from '../constants/editor.constants';
import { Box } from '../interfaces/container.interface';

const editorSlice = createSlice({
  reducerPath: 'editor',
  name: 'editor',
  initialState: EDITOR_INITIAL_STATE,
  reducers: {
    setBoxes: (state, action: PayloadAction<{ [id: string]: Box }>) => {
      state.boxes = action.payload;
    },
    deleteBox: (state, action: PayloadAction<string>) => {
      const componentId = action.payload;
      const newBoxes = update(state.boxes, {
        $unset: [componentId]
      });

      state.boxes = newBoxes;
    },
    setSelectedComponentId: (state, action: PayloadAction<string>) => {
      state.selectedComponentId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(componentApi.endpoints.fetchComponents.matchFulfilled, (state, action) => {
      state.boxes = action.payload;
    });
  }
});

export const { deleteBox, setBoxes, setSelectedComponentId } = editorSlice.actions;
export const selectEditor = (state: RootState) => state.editor;
export default editorSlice;
