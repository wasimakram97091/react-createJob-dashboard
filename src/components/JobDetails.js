import axios from "axios";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./counter/getSlice";
import { setEditData } from "./counter/getSlice";

function JobDetails({ modalHandler }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getData.data);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`https://655d82519f1e1093c599663c.mockapi.io/userData/${id}`);
      dispatch(fetchData());
      return response;
    } catch (error) {
      console.error("Delete request failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const editHandler = (id) => {
    const edit = userData.find((item) => item.id === id);
    dispatch(setEditData(edit));

    modalHandler();
  };

  return (
    <>
      {Array.isArray(userData) &&
        userData.map((user) => (
          <div key={user.id} className="w-[47%] h-auto rounded-xl border border-bc py-4 px-6 shadow-xl bg-white mx-auto my-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-1">
                <FcGoogle className="h-12 w-12 rounded" />
                <div>
                  <h1 className="text-2xl text-black font-medium leading-8">{user?.jobTitle}</h1>
                  <h3 className="text-base text-black font-medium leading-6">
                    {user?.companyName} - {user?.industry}
                  </h3>
                  <p className="text-base text-slate-600 font-normal mb-6 leading-6">
                    {user?.location} (In-{user?.remoteType})
                  </p>
                  <p className="leading-6 font-medium text-base text-slate-900 mb-2">Part-Time (9.00 am - 5.00 pm IST)</p>
                  <p className="leading-6 font-medium text-base text-slate-900 mb-2">
                    Experience ({user?.minimumExperience} - {user?.maximumExperience})
                  </p>
                  <p className="leading-6 font-medium text-base text-slate-900 mb-2">
                    INR (₹) {user?.minimumSalary} - {user?.maximumSalary} / Month
                  </p>
                  <p className="leading-6 font-medium text-base text-slate-900 mb-6">{user?.totalEmployee} employees</p>
                  {typeof user.applyType === "string" && (
                    <button
                      className={
                        user.applyType.toLowerCase().includes("quick apply")
                          ? "bg-sky-600 hover:bg-sky-700 px-3 py-1 text-white rounded-md font-normal border border-sky-700"
                          : "border border-sky-700 px-3 py-1 text-sky-700 rounded-md font-normal"
                      }
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
              <div>
                <button className="cursor-pointer">
                  <MdEdit className="h-6 w-6 text-green-600 cursor-pointer" onClick={() => editHandler(user.id)} />
                </button>
                <button className="px-2 cursor-pointer" onClick={() => deleteHandler(user.id)}>
                  <MdDeleteForever className="h-6 w-6 text-red-600  " />
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default JobDetails;
