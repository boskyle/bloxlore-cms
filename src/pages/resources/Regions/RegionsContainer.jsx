// 📦 React + Redux imports
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

// 🚀 Async thunks for server interaction
import { fetchRegions, updateRegion } from "@store/slices/regionSlice";

// 👁️ Dumb/presentational component
import RegionsView from "./RegionsView";

/* -----------------------------------------------
🌱 Reducer: Manages local editing state for regions
------------------------------------------------ */

// 🎯 Initial state: no region selected, and no form fields filled
const initialEditState = {
  editingId: null, // which region is being edited (null means none)
  fields: {}, // current form values being edited
};

// 🧠 Reducer function: handles transitions in the editing UI state
const editReducer = (state, action) => {
  switch (action.type) {
    case "START_EDIT":
      // When a region is selected for editing, preload its current values
      return {
        editingId: action.payload.id,
        fields: {
          name: action.payload.name ?? "",
          description: action.payload.description ?? "",
        },
      };

    case "UPDATE_FIELD":
      // Generic field update using input name → value mapping
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: action.payload.value,
        },
      };
    // Cancel or reset editing (same outcome: clear state)
    case "CANCEL_EDIT":
    case "RESET":
      return initialEditState;

    default:
      return state;
  }
};

/* -----------------------------------------------
🏗️ Container Component: Fetches data, manages state
------------------------------------------------ */

const RegionsContainer = () => {
  const dispatch = useDispatch();

  // 🌍 Global Redux store: contains all region data and fetch status
  const { regions, status, error } = useSelector((state) => state.region);

  // 🧾 Local UI state for editing (isolated from global store)
  const [editState, editDispatch] = useReducer(editReducer, initialEditState);

  // 🔄 On mount: fetch all regions from the API
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  /* -----------------------------------------------
  🎮 UI Event Handlers: Dispatch reducer + API calls
  ------------------------------------------------ */

  // 🖊️ Start editing a specific region
  const handleStartEdit = (regionId) => {
    const region = regions.find((r) => r.id === regionId);
    if (region) {
      editDispatch({ type: "START_EDIT", payload: region });
    }
  };

  // 🧠 On input change (dynamic input name → field map)
  const handleFieldChange = (e) => {
    editDispatch({
      type: "UPDATE_FIELD",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // ❌ Cancel current edit
  const handleCancel = () => {
    editDispatch({ type: "CANCEL_EDIT" });
  };

  // 💾 Save updated region to server
  const handleSave = () => {
    const trimmed = editState.fields.name.trim();
    if (!trimmed) return; // Basic validation

    dispatch(
      updateRegion({
        id: editState.editingId,
        data: editState.fields,
      })
    )
      .unwrap()
      .then(() => {
        editDispatch({ type: "RESET" });
      })
      .catch((err) => {
        console.error("Failed to update region:", err);
      });
  };

  /* -----------------------------------------------
  🖼️ View Rendering Based on Status
  ------------------------------------------------ */

  const VIEW_RENDER = {
    loading: <p>Loading regions...</p>,
    failed: <p>Failed to fetch regions: {JSON.stringify(error)}</p>,
    succeeded: (
      <>
        {JSON.stringify(editState)}
        <RegionsView
          regions={regions}
          editingId={editState.editingId}
          fields={editState.fields}
          onStartEdit={handleStartEdit}
          onFieldChange={handleFieldChange}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </>
    ),
  };

  // 🔁 Fallback view if status is uninitialized
  return VIEW_RENDER[status] || <p>Loading...</p>;
};

export default RegionsContainer;
