import React from "react";

const RegionsView = ({
  regions,
  editingId,
  fields,
  onStartEdit,
  onFieldChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">🌍 Regions</h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-[900px] m-auto">
        {regions.map(({ id, name, description, image_path }) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image */}
            <div className="w-full h-40 md:h-auto overflow-hidden">
              <img
                src={image_path}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between p-4 w-full">
              <div>
                {editingId === id ? (
                  <input
                    name="name"
                    value={fields.name}
                    onChange={onFieldChange}
                    className="text-xl font-semibold text-gray-800 border rounded-md px-2 py-1 w-full"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-gray-800">
                    {name}
                  </h3>
                )}
                <p className="text-gray-600 text-sm mt-1">
                  {description || "No description provided."}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                {editingId === id ? (
                  <>
                    <button
                      onClick={onSave}
                      className="text-sm px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className="text-sm px-4 py-1.5 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onStartEdit(id)}
                    className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionsView;