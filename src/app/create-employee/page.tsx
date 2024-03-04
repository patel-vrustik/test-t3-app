"use client";

import React from "react";
import CreateEmployeeForm, {
  type CreateEmployeeFormPayload,
} from "../_components/employee/create-employee";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import HomeButton from "../_components/ui/home-button";
import Header from "../_components/ui/header";

const CreateEmployee = () => {
  const router = useRouter();
  const { mutate: createEmployee, isLoading } = api.employee.create.useMutation(
    {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    },
  );

  const onSubmit = (data: CreateEmployeeFormPayload) => {
    createEmployee(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto pt-4">
      <Header>
        <HomeButton />
        Create Employee
      </Header>
      <CreateEmployeeForm handleSubmit={onSubmit} />
    </div>
  );
};

export default CreateEmployee;
