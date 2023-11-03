import React, { useEffect, useState } from "react";
import { parse } from "papaparse";

import { UploadFile } from "./components";
import { DataResult, DataByProjects, FinalResult } from "./types";
import { formatDuration, intervalToDuration, isWithinInterval, min } from "date-fns";

function App() {
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);
  const [result, setResult] = useState<FinalResult[]>([]);

  const getPairs = async () => {
    const data = await uploadedFile?.text();
    const transformedData: DataResult[] = parse(data || "", { header: true, dynamicTyping: true }).data as DataResult[];

    const dataByProjects: DataByProjects[] = transformedData.reduce((acc: DataByProjects[], value: DataResult) => {
      const { ProjectID, ...rest } = value;
      if (!acc.some((emp) => emp.ProjectID === value.ProjectID)) {
        acc.push({
          ProjectID: ProjectID,
          employees: [{ ...rest }]
        });
      } else {
        acc.find((project) => project.ProjectID === value.ProjectID)?.employees.push(rest);
      }

      return acc;
    }, []);

    const employeePairsArr: FinalResult[] = [];
    dataByProjects.forEach((project) => {
      project.employees.forEach((employee, index) => {
        const empStart = new Date(employee.DateFrom);
        const empEnd = employee.DateTo === "NULL" ? new Date() : new Date(employee.DateTo);

        project.employees.forEach((secEmpl, secInd) => {
          const secEmpStart = new Date(secEmpl.DateFrom);
          const secEmpEnd = secEmpl.DateTo === "NULL" ? new Date() : new Date(secEmpl.DateTo);

          const isFirstEmplWithinSecEmpl = isWithinInterval(empStart, {
            start: secEmpStart,
            end: secEmpEnd
          });
          const isSecEmplWithinFirstEmpl = isWithinInterval(secEmpStart, {
            start: empStart,
            end: empEnd
          });

          if (secInd > index && (isFirstEmplWithinSecEmpl || isSecEmplWithinFirstEmpl)) {
            const duration = isFirstEmplWithinSecEmpl
              ? intervalToDuration({ start: empStart, end: min([empEnd, secEmpEnd]) })
              : intervalToDuration({ start: secEmpStart, end: min([empEnd, secEmpEnd]) });

            const days = formatDuration(duration, { format: ["years", "months", "days"] });
            employeePairsArr.push({
              empId1: employee.EmpID,
              empId2: secEmpl.EmpID,
              projectId: project.ProjectID,
              days
            });
          }
        });
      });

      return employeePairsArr;
    }, []);

    setResult(employeePairsArr);
  };

  useEffect(() => {
    if (uploadedFile) {
      getPairs();
    }
  }, [uploadedFile]);

  return (
    <div className="py-8 px-4 mx-auto max-w-4xl">
      <UploadFile uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} types={["csv"]} />
      {result.length ? (
        <div className="shadow-md p-6 rounded-md mt-4">
          <div className="grid">
            <div className="grid grid-cols-4 font-bold mb-2">
              <span>Employee 1</span>
              <span>Employee 2</span>
              <span>Project ID</span>
              <span>Work together</span>
            </div>
            {result.map((row) => (
              <div key={`${row.empId1}-${row.empId2}-${row.projectId}`} className="grid grid-cols-4">
                <span>{row.empId1}</span>
                <span>{row.empId2}</span>
                <span>{row.projectId}</span>
                <span>{row.days}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
