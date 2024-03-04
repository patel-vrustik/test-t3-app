"use client";

import React, { useState } from "react";

export interface CreateEmployeeFormPayload {
  name: string;
  position: string;
}

interface CreateEmployeeFormProps {
  handleSubmit: (val: CreateEmployeeFormPayload) => void;
}

const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({
  handleSubmit,
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  return (
    <form
      className="mx-auto max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ name, position });
      }}
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Employee name
        </label>
        <input
          required
          id="name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="position"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Employee position
        </label>
        <input
          required
          id="position"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateEmployeeForm;
