import React from "react";

interface DataItem {
  _id: string;
  age: string;
  expenses: number;
  earning: number;
}

interface Props {
  data: DataItem[];
}

const Table: React.FC<Props> = ({ data }) => {
  return (
    <table className="table-auto border-collapse border w-full bg-slate-200 rounded-lg overflow-hidden ">
      <thead>
        <tr>
          <th className="p-4 border border-slate-600">Age</th>
          <th className="p-4 border border-slate-600">Earning</th>
          <th className="p-4 border border-slate-600">Expenses</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-4 border border-slate-600">{item.age}</td>
            <td className="p-4 border border-slate-600">{item.earning}</td>
            <td className="p-4 border border-slate-600">{item.expenses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
