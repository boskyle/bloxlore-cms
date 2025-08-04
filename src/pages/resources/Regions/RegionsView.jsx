import React from "react";
import { Camera } from "lucide-react";

const RegionsView = ({
  regions,
  editingId,
  fields,
  onStartEdit,
  onStartCreate,
  onFieldChange,
  onImageChange,
  onCancel,
  onSave,
  onDelete,
}) => {
  const getImagePreview = (regionId, fallbackPath) => {
    if (editingId === regionId && fields.image instanceof File) {
      return URL.createObjectURL(fields.image);
    }
    return fallbackPath;
  };

  return (
    <div className="p-6 space-y-4 min-h-screen  bg-gradient-to-t from-green-900 to-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center max-w-[900px] mx-auto">
        {editingId === null && (
          <button
            onClick={onStartCreate}
            className="text-sm px-4 py-2 rounded-lg border cursor-pointer"
          >
            Add Region
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 max-w-[900px] m-auto">
        {/* ➕ Create Form */}
        {editingId === "new" && (
          <div className=" bg-[#333d55] shadow-md rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="w-full h-[200px] relative overflow-hidden mx-auto rounded-t-2xl bg-gray-100">
              {fields.image && (
                <img
                  src={URL.createObjectURL(fields.image)}
                  alt="Preview"
                  className="w-full h-full object-cover object-center"
                />
              )}

              <input
                id="file-upload-new"
                type="file"
                name="image"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />

              <label
                htmlFor="file-upload-new"
                className="absolute inset-0 bg-black/40 hover:bg-black/60 flex flex-col items-center justify-center text-white text-sm cursor-pointer transition-all duration-200"
                title="Upload Image"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="font-medium">
                  {fields.image ? "Change Image" : "Upload Image"}
                </span>
              </label>
            </div>

            <div className="flex flex-col justify-between p-4 w-full">
              <input
                name="name"
                value={fields.name}
                onChange={onFieldChange}
                placeholder="Region name"
                className="text-xl font-semibold border rounded-md px-2 py-1 w-full"
                autoFocus
              />

              <textarea
                name="description"
                value={fields.description}
                onChange={onFieldChange}
                className="border  rounded-md px-2 py-1 w-full resize-none mt-2"
                rows={3}
                placeholder="Region description"
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={onSave}
                  className="text-sm px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={onCancel}
                  className="text-sm px-4 py-1.5 rounded-lg border cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🧩 Region Cards */}
        {regions.map(({ id, name, description, image_path }) => {
          const isEditing = editingId === id;
          const previewUrl = getImagePreview(id, image_path);

          return (
            <div
              key={id}
              className="bg-[#333d55] shadow-md rounded-2xl overflow-hidden flex flex-col font-cartoon"
            >
              <div className="w-full h-[200px] relative overflow-hidden mx-auto rounded-t-2xl">
                <img
                  src={previewUrl}
                  alt={name}
                  className="w-full h-full object-cover object-center"
                />

                {isEditing ? (
                  <>
                    <input
                      id={`file-upload-${editingId}`}
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={onImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor={`file-upload-${id}`}
                      className="absolute inset-0 bg-black/40 hover:bg-black/60 flex flex-col items-center justify-center text-white text-sm cursor-pointer transition-all duration-200"
                      title="Change Image"
                    >
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="font-medium">Change Image</span>
                    </label>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-col justify-between p-4 w-full">
                <div className="space-y-2">
                  {/* Name */}
                  {isEditing ? (
                    <input
                      name="name"
                      value={fields.name}
                      onChange={onFieldChange}
                      className="text-xl font-semibold border rounded-md px-2 py-1 w-full"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-xl font-semibold">{name}</h3>
                  )}

                  {/* Description */}
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={fields.description}
                      onChange={onFieldChange}
                      className="border rounded-md px-2 py-1 w-full resize-none"
                      rows={3}
                      placeholder="Region description"
                    />
                  ) : (
                    <p className="text-sm min-h-[100px]">
                      {description || "No description provided."}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={onSave}
                        className="text-sm px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={onCancel}
                        className="text-sm px-4 py-1.5 rounded-lg border cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onStartEdit(id)}
                        className="text-sm px-4 py-1.5 rounded-lg border border-white cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="text-sm px-4 py-1.5 rounded-lg border border-white  cursor-pointer"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionsView;
