import React from "react";

const RegionsView = ({
  regions = [],
  newRegion,
  setNewRegion,
  onChange,
  onToggleEdit,
  onSave,
  onAdd,
}) => {
  return (
    <div className="space-y-6 mx-auto w-200">
      {/* List of Regions */}
      {regions.length === 0 ? (
        <p>No regions found.</p>
      ) : (
        regions.map((region, index) => (
          <div key={region.id || index} className="bg-white shadow p-4 rounded">
            {region.isEditing ? (
              <>
                <input
                  type="text"
                  value={region.name}
                  onChange={(e) => onChange(index, "name", e.target.value)}
                  className="block w-full mb-2 px-3 py-2 border rounded"
                />
                <textarea
                  value={region.description}
                  onChange={(e) =>
                    onChange(index, "description", e.target.value)
                  }
                  className="block w-full mb-2 px-3 py-2 border rounded"
                />
                <button
                  onClick={() => onSave(index)}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => onToggleEdit(index)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{region.name}</h2>
                <p className="text-gray-700">{region.description}</p>
                <button
                  onClick={() => onToggleEdit(index)}
                  className="mt-2 text-blue-600 underline"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))
      )}

      {/* Add New Region */}
      <div className="bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-2">Add New Region</h2>
        <input
          type="text"
          placeholder="Region name"
          value={newRegion.name}
          onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
          className="block w-full mb-2 px-3 py-2 border rounded"
        />
        <textarea
          placeholder="Region description"
          value={newRegion.description}
          onChange={(e) =>
            setNewRegion({ ...newRegion, description: e.target.value })
          }
          className="block w-full mb-2 px-3 py-2 border rounded"
        />
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Region
        </button>
      </div>
    </div>
  );
};

export default RegionsView;
