"use client";
import React, { useState } from "react";
import FieldCard from "./FieldCard";
import type { Field } from "../../utils/types";
import { useFieldData } from "../../hooks/useFieldData";
import DeleteConfirmation from "./DeleteConfirmation";
import SkeletonLoader from "./SkeletonLoader";
import ErrorMessage from "./ErrorMessage";

interface FieldListProps {
  setIsEditing: (field: Field | null) => void;
  generateNewField: () => Field;
}

const FieldList = ({ setIsEditing, generateNewField }: FieldListProps) => {
  const { fields, loading, error, deleteField } = useFieldData();
  const [fieldToDelete, setFieldToDelete] = useState<Field | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteField(id);
      setFieldToDelete(null);
    } catch (err) {
      console.error("Failed to delete field:", err);
    }
  };

  if (loading) return <SkeletonLoader count={3} />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No fields found</p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
            onClick={() => setIsEditing(generateNewField())}
          >
            Create Your First Field
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              onEdit={setIsEditing}
              onDelete={(id) =>
                setFieldToDelete(fields.find((f) => f.id === id) || null)
              }
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {fieldToDelete && (
        <DeleteConfirmation
          fieldName={fieldToDelete.name}
          onConfirm={() => handleDelete(fieldToDelete.id)}
          onCancel={() => setFieldToDelete(null)}
        />
      )}
    </div>
  );
};

export default FieldList;