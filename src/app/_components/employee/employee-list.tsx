import Link from "next/link";
import React from "react";
import { type RouterOutputs } from "~/trpc/shared";

type Employees = RouterOutputs["employee"]["getAll"];

const TABLE_HEADERS: string[] = [
  "ID",
  "Name",
  "Position",
  "Joined At",
  "Action",
];

const EmployeeList = ({ data }: { data: Employees }) => {
  return (
    <>
      <div className="flex items-center justify-between py-10">
        <h1 className="text-xl font-semibold">Employee list</h1>
        <Link href={"create-employee"}>
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
          >
            Create employee
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              {TABLE_HEADERS.map((d) => (
                <th key={d} scope="col" className="px-6 py-3">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id} className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4">{d.id}</td>
                <td className="px-6 py-4">{d.name}</td>
                <td className="px-6 py-4">{d.position}</td>
                <td className="px-6 py-4">
                  {d.createdAt.toLocaleDateString("en-US")}
                </td>
                <td className="flex gap-3 px-6 py-4">
                  <Link
                    href={`/employee-details/${d.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
