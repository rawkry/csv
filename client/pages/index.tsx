import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StandardDeviationChart from "@/component/Chart";
import Table from "@/component/Table";

const { url, headers } = JSON.parse(process.env.NEXT_PUBLIC_BASE_URL || "");

type DataItem = {
  _id: string;
  age: string;
  expenses: number;
  earning: number;
};

type ArrayData = DataItem[];
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await fetch(`${url}/datamodel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const datamodel: ArrayData = await response.json();
    return {
      props: { datamodel, fetched: true },
    };
  } catch (err) {
    return {
      props: {
        fetched: false,
      },
    };
  }
}

export default function Home({ datamodel: serverDatamodel, fetched }: any) {
  const [datamodel, setDatamodel] = useState(serverDatamodel || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("csvFile", data.csvFile[0]);
      const response = await fetch(`${url}/datamodel/upload`, {
        method: "POST",
        body: formData,
      });
      const datamodel = await response.json();
      setDatamodel(datamodel);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDatamodel(serverDatamodel);
  }, [serverDatamodel]);

  return (
    <>
      <main className="container mx-auto  font-mono text-base relative">
        <div className="flex  justify-center items-center flex-wrap mt-10">
          <div className="z-10 max-w-5xl w-full flex justify-center items-center font-mono text-sm mb-20 ">
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" bg-slate-200  cursor-pointer rounded-[0.5rem] w-full sm:w-[18rem]   py-4  px-4   ">
                <div>
                  <span className=" text-black text-center font-semibold">
                    Upload CSV File
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    {...register("csvFile", { required: true })}
                    className="py-3 w-[300px]  "
                  />
                  {errors.csvFile && (
                    <span className="text-red-500">
                      This field is required *
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className=" text-white font-semibold py-2 px-4 rounded-lg mt-4 bg-slate-600 hover:bg-slate-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="container mx-auto p-4">
            <div className="overflow-x-auto ">
              <h1 className="text-center text-2xl font-bold mb-4 underline underline-offset-8">
                Expenses and Earning Table
              </h1>
              {!fetched && (
                <div className="text-center text-red-500 font-semibold">
                  Error fetching data
                </div>
              )}
              {datamodel.length > 0 && <Table data={datamodel} />}
            </div>
          </div>
        </div>
        {datamodel.length > 0 && (
          <div className="mt-20 ">
            <h1
              className="text-center text-2xl font-bold mb-4 underline underline-offset-8
  "
            >
              Expenses and Earning Chart
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-10 ">
              <div className="bg-slate-200 rounded-lg">
                <StandardDeviationChart
                  data={datamodel}
                  v_type={"bar"}
                  v_fill={true}
                  chartId="barChart"
                />
              </div>
              <div className="bg-slate-200 rounded-lg">
                <StandardDeviationChart
                  data={datamodel}
                  v_type={"line"}
                  v_fill={false}
                  chartId="lineChart"
                />
              </div>
              <div className="bg-slate-200 rounded-lg">
                <StandardDeviationChart
                  data={datamodel}
                  v_type={"doughnut"}
                  v_fill={true}
                  chartId="doughnutChart"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
