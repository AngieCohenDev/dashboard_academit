import React from "react";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  Bar,
} from "recharts";

const data = [
  {
    name: "Page A",
    Income: 4000,
    Expense: 2400,
  },
  {
    name: "Page B",
    Income: 3000,
    Expense: 1398,
  },
  {
    name: "Page C",
    Income: 2000,
    Expense: 9800,
  },
  {
    name: "Page D",
    Income: 2780,
    Expense: 3908,
  },
  {
    name: "Page E",
    Income: 1890,
    Expense: 4800,
  },
  {
    name: "Page F",
    Income: 2390,
    Expense: 3800,
  },
  {
    name: "Page G",
    Income: 3490,
    Expense: 4300,
  },
];

 function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="w-full mt-3 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


export default TransactionChart