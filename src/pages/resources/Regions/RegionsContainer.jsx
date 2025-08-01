import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegions, updateRegion } from "@store/slices/regionSlice";
import RegionsView from "./RegionsView";

const RegionsContainer = () => {
  const dispatch = useDispatch();
  const {
    regions = [],
    status = "loading",
    error,
  } = useSelector((state) => state.region || {});

  const [editedRegions, setEditedRegions] = useState([]);
  const [newRegion, setNewRegion] = useState({ name: "", description: "" });

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  useEffect(() => {
    setEditedRegions(
      regions.map((region) => ({
        ...region,
        isEditing: false,
        name: region.name || "",
        description: region.description || "",
      }))
    );
  }, [regions]);

  const handleEditToggle = (index) => {
    setEditedRegions((prev) =>
      prev.map((r, i) => (i === index ? { ...r, isEditing: !r.isEditing } : r))
    );
  };

  const handleChange = (index, field, value) => {
    setEditedRegions((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleSave = (index) => {
    const region = editedRegions[index];
    const payload = {
      id: region.id,
      data: {
        name: region.name,
        description: region.description,
        image_url: region.image_url ?? null,
      },
    };

    dispatch(updateRegion(payload))
      .unwrap()
      .then(() => {
        console.log("Region updated:", region.id);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });

    setEditedRegions((prev) =>
      prev.map((r, i) => (i === index ? { ...r, isEditing: false } : r))
    );
  };

  const handleAddRegion = () => {
    if (!newRegion.name.trim()) return;

    const regionToAdd = {
      ...newRegion,
      id: Date.now(), // Placeholder until backend returns real ID
      isEditing: false,
    };

    // TODO: Replace with dispatch(addRegion(...)) if implemented
    console.log("Adding region:", regionToAdd);

    setEditedRegions((prev) => [regionToAdd, ...prev]);
    setNewRegion({ name: "", description: "" });
  };

  const VIEW_RENDER = {
    loading: <p>Loading regions...</p>,
    failed: <p>Failed to fetch regions: {JSON.stringify(error)}</p>,
    succeeded: (
      <RegionsView
        regions={editedRegions}
        newRegion={newRegion}
        setNewRegion={setNewRegion}
        onChange={handleChange}
        onToggleEdit={handleEditToggle}
        onSave={handleSave}
        onAdd={handleAddRegion}
      />
    ),
  };

  return VIEW_RENDER[status] || <p>Loading...</p>;
};

export default RegionsContainer;