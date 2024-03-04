"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "~/app/_components/ui/header";
import HomeButton from "~/app/_components/ui/home-button";
import { api } from "~/trpc/react";

const EmployeeDetails = ({ params }: { params: { id: string } }) => {
  const EmployeeID = parseInt(params.id);
  const router = useRouter();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    data: employeeDetails,
    isLoading,
    refetch,
  } = api.employee.getByID.useQuery(EmployeeID);
  const { mutate: deleteEmployee } = api.employee.delete.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      router.push("/");
      router.refresh();
    },
  });
  const { mutate: updateEmployee } = api.employee.update.useMutation({
    onSuccess: async () => {
      await refetch();
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (employeeDetails) {
      setName(employeeDetails.name);
      setPosition(employeeDetails.position);
    }
  }, [employeeDetails]);

  const toggleEdit = () => {
    setIsEditing((d) => !d);
  };

  const onSubmit = () => {
    updateEmployee({
      name,
      position,
      id: EmployeeID,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto pt-4">
      <Header>
        <HomeButton />
        Employee details
      </Header>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Image
            src={"/svg/user.svg"}
            alt={"profile-pic"}
            height={248}
            width={248}
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            {isEditing ? (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Name
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
                    Position
                  </label>
                  <input
                    required
                    id="position"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <p>
                  <span className="mr-2 font-bold">Name:</span>
                  <span>{employeeDetails?.name}</span>
                </p>
                <p>
                  <span className="mr-2 font-bold">Position:</span>
                  <span>{employeeDetails?.position}</span>
                </p>
              </>
            )}
            <p>
              <span className="mr-2 font-bold">Joined on:</span>
              <span>
                {employeeDetails?.createdAt?.toLocaleDateString("en-US")}
              </span>
            </p>
          </div>
          <div>
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              onClick={isEditing ? onSubmit : toggleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
              onClick={
                isEditing ? toggleEdit : () => deleteEmployee(EmployeeID)
              }
            >
              {isEditing ? "Cancel" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
