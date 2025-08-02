// RegionsContainer.jsx
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegions,
  updateRegion,
  createRegion,
  deleteRegion,
} from "@store/slices/regionSlice";
import RegionsView from "./RegionsView";

const initialEditState = {
  editingId: null,
  fields: {},
};

const editReducer = (state, action) => {
  switch (action.type) {
    case "START_CREATE":
      return {
        editingId: "new",
        fields: {
          name: "",
          description: "",
          image: null,
        },
      };
    case "START_EDIT":
      return {
        editingId: action.payload.id,
        fields: {
          name: action.payload.name ?? "",
          description: action.payload.description ?? "",
          image: null,
        },
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: action.payload.value,
        },
      };
    case "CANCEL_EDIT":
    case "RESET":
      return initialEditState;
    default:
      return state;
  }
};

const RegionsContainer = () => {
  const dispatch = useDispatch();
  const { regions, status, error } = useSelector((state) => state.region);
  const [editState, editDispatch] = useReducer(editReducer, initialEditState);

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const handleStartEdit = (regionId) => {
    const region = regions.find((r) => r.id === regionId);
    if (region) {
      editDispatch({ type: "START_EDIT", payload: region });
    }
  };

  const handleStartCreate = () => {
    editDispatch({ type: "START_CREATE" });
  };

  const handleFieldChange = (e) => {
    editDispatch({
      type: "UPDATE_FIELD",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleCancel = () => {
    editDispatch({ type: "CANCEL_EDIT" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      editDispatch({
        type: "UPDATE_FIELD",
        payload: { name: "image", value: file },
      });
    }
  };

  const handleSave = () => {
    const { name, description, image } = editState.fields;
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description ?? "");
    if (image instanceof File) {
      formData.append("image", image);
    }

    const action =
      editState.editingId === "new"
        ? createRegion(formData)
        : updateRegion({ id: editState.editingId, data: formData });

    dispatch(action)
      .unwrap()
      .then(() => editDispatch({ type: "RESET" }))
      .catch((err) => console.error("Failed to save region:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this region?")) {
      dispatch(deleteRegion(id)).catch((err) => {
        console.error("Failed to delete region:", err);
      });
    }
  };

  const VIEW_RENDER = {
    loading: <p>Loading regions...</p>,
    failed: <p>Failed to fetch regions: {JSON.stringify(error)}</p>,
    succeeded: (
      <RegionsView
        regions={regions}
        editingId={editState.editingId}
        fields={editState.fields}
        onStartEdit={handleStartEdit}
        onStartCreate={handleStartCreate}
        onFieldChange={handleFieldChange}
        onImageChange={handleImageUpload}
        onCancel={handleCancel}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    ),
  };

  return VIEW_RENDER[status] || <p>Loading...</p>;
};

export default RegionsContainer;
