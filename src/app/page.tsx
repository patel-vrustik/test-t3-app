import { api } from "~/trpc/server";
import EmployeeList from "./_components/employee/employee-list";

export default async function Home() {
  const employeeList = await api.employee.getAll.query();

  return (
    <main>
      <div className="container mx-auto pt-4">
        <EmployeeList data={employeeList} />
      </div>
    </main>
  );
}
