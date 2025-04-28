"use client";
import { useState } from "react";
import FieldActivityChart from "../components/fields/FieldActivityChart";
import FieldList from "../components/fields/FieldList";
import { useFarmDataContext } from "../contexts/FarmDataContext";
import ClientOnlyWrapper from "../components/common/ClientOnlyWrapper";
import { useFieldData } from "../hooks/useFieldData";
import { Plus } from "lucide-react";
import type { Field } from "../utils/types";
import FieldForm from "../components/fields/FieldForm";

const FieldManagementPage = () => {
  return (
    <ClientOnlyWrapper>
      <FieldManagementContent />
    </ClientOnlyWrapper>
  );
};

const FieldManagementContent = () => {
  const { isInitialized, fieldData } = useFarmDataContext();
  const { fields, loading, addField, updateField } = useFieldData();
  const [isEditing, setIsEditing] = useState<Field | null>(null);

  const generateNewField = (): Field => ({
    id: `FLD-${Date.now()}`,
    name: `New Field ${fields.length + 1}`,
    size: 10,
    crop: "",
    plantingDate: "",
    harvestDate: "",
    irrigation: "",
    status: "Fallow",
  });

  const handleSave = async (field: Field) => {
    try {
      if (fields.some((f) => f.id === field.id)) {
        await updateField(field);
      } else {
        await addField(field);
      }
      setIsEditing(null);
    } catch (err) {
      console.error("Failed to save field:", err);
    }
  };

  if (!isInitialized || !fieldData || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading field data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col space-y-6">
        {/* Modern header with title and actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Field Management</h1>
            <p className="text-gray-500 text-sm">Manage your agricultural fields</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
              <span className="text-blue-600 font-semibold">{fields.length}</span>
              <span className="ml-1">{fields.length === 1 ? "Field" : "Fields"}</span>
            </div>

            <button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
              onClick={() => setIsEditing(generateNewField())}
            >
              <Plus className="w-4 h-4" />
              <span>Add Field</span>
            </button>
          </div>
        </div>

        <FieldList
          setIsEditing={setIsEditing}
          generateNewField={generateNewField}
        />

        <div className="bg-gray-50 p-4 rounded-lg">
          <FieldActivityChart />
        </div>

        {/* Edit/Add Modal - moved here to access handleSave */}
        {isEditing && (
          <FieldForm
            field={isEditing}
            onSave={handleSave}
            onCancel={() => setIsEditing(null)}
            isEditing={fields.some((f) => f.id === isEditing.id)}
          />
        )}
      </div>
    </div>
  );
};

export default FieldManagementPage;