import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { fetchData } from "./counter/getSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setEditData } from "./counter/getSlice";

function JobCard({ closeModal, openDetails }) {
  const dispatch = useDispatch();
  const { selectJob } = useSelector((state) => state.getData);
  const [isNext, setIsNext] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isEditMode, setIsEditMode] = useState(!!Object.keys(selectJob).length);

  const [data, setData] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    location: "",
    remoteType: "",
    minimumSalary: "",
    maximumSalary: "",
    minimumExperience: "",
    maximumExperience: "",
    totalEmployee: "",
    applyType: "",
  });

  const [dataErrors, setDataErrors] = useState({
    jobTitleError: "",
    companyNameError: "",
    industryError: "",
  });

  const [radioError, setRadioError] = useState({ applyTypeError: "" });

  useEffect(() => {
    if (Object.keys(selectJob).length) setData(selectJob);
  }, [selectJob]);

  const handleRadioValidation = () => {
    const err = {};
    if (!data.applyType.length) {
      err.applyTypeError = "*Apply Type is required";
    }

    setRadioError(err);
    return Object.keys(err).length === 0;
  };

  const handleValidation = () => {
    const errors = {};

    if (data?.jobTitle?.length < 1) {
      errors.jobTitleError = "*Job Title is required";
    }

    if (data.companyName.length < 1) {
      errors.companyNameError = "*Company Name is required";
    }

    if (data.industry.length < 1) {
      errors.industryError = "*Industry is required";
    }

    setDataErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const overlayHandler = () => {
    closeModal();
  };

  const nextHandler = () => {
    if (handleValidation()) {
      setIsNext(true);
    }
  };

  const getInputValue = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setSelectedOption(e.target.value);
  };

  const saveOrUpdateHandler = async () => {
    if (handleRadioValidation()) {
      try {
        const apiUrl = isEditMode ? `https://655d82519f1e1093c599663c.mockapi.io/userData/${data.id}` : "https://655d82519f1e1093c599663c.mockapi.io/userData";

        const responseData = isEditMode ? await axios.put(apiUrl, data) : await axios.post(apiUrl, data);

        console.log(isEditMode ? "Update success" : "Data successfully saved:", responseData);

        dispatch(fetchData());

        closeModal();

        dispatch(setEditData(""));
      } catch (error) {
        console.error(isEditMode ? "Error updating data" : "Error saving data:", error);
      }
    }
  };

  return (
    <>
      <div onClick={overlayHandler} className="fixed left-0 right-0 top-0 bottom-0 bg-slate-900 opacity-50 "></div>

      {!isNext ? (
        <div className="border border-bc w-100 h-100  w-[577px] h-[564px] p-8 rounded-xl m-auto fixed inset-0 bg-white shadow-lg ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create a job</h2>
            <h2 className="text-xl">Step 1</h2>
          </div>

          <InputField
            label="Job title"
            inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
            placeholder="ex. UX UI Designer"
            type="text"
            imp="*"
            getData={getInputValue}
            name="jobTitle"
            error={dataErrors.jobTitleError}
            value={data?.jobTitle}
          />
          <InputField
            label="Company name"
            inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
            placeholder="ex. Google"
            type="text"
            imp="*"
            getData={getInputValue}
            name="companyName"
            error={dataErrors.companyNameError}
            value={data?.companyName}
          />
          <InputField
            label="Industry"
            inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
            placeholder="ex. Information Technology"
            type="text"
            imp="*"
            getData={getInputValue}
            name="industry"
            error={dataErrors.industryError}
            value={data?.industry}
          />
          <div className="flex justify-center items-center gap-4 ">
            <InputField
              label="Location"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
              placeholder="ex. Chennai"
              type="text"
              getData={getInputValue}
              name="location"
              value={data?.location}
            />
            <InputField
              label="Remote type"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
              placeholder="ex. In-office"
              type="text"
              getData={getInputValue}
              name="remoteType"
              value={data?.remoteType}
            />
          </div>
          <div className="text-right absolute right-3 bottom-3">
            <button className="bg-sky-600 hover:bg-sky-700 px-3 py-1 m-4 text-white rounded-md font-semibold" onClick={nextHandler}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-bc w-100 h-100  w-[577px] h-[564px] p-8 rounded-xl m-auto fixed inset-0 bg-white shadow-lg ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create a job</h2>
            <h2 className="text-xl">Step 2</h2>
          </div>

          <div className="flex items-end justify-between gap-4 ">
            <InputField
              label="Experience"
              parentStyle="flex-1"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none flex-1"
              placeholder="Minimum"
              type="text"
              getData={getInputValue}
              name="minimumExperience"
              value={data?.minimumExperience}
            />
            <InputField
              parentStyle="flex-1"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none flex-1 "
              placeholder="Maximum"
              type="text"
              getData={getInputValue}
              name="maximumExperience"
              value={data?.maximumExperience}
            />
          </div>

          <div className="flex items-end justify-between gap-4 ">
            <InputField
              label="Salary"
              parentStyle="flex-1"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
              placeholder="Minimum"
              type="text"
              getData={getInputValue}
              name="minimumSalary"
              value={data?.minimumSalary}
            />
            <InputField
              parentStyle="flex-1"
              inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
              placeholder="Maximum"
              type="text"
              getData={getInputValue}
              name="maximumSalary"
              value={data?.maximumSalary}
            />
          </div>

          <InputField
            label="Total employee"
            inputStyles="w-full py-2 px-3 h-9 mb-6 border border-bc rounded-xl outline-none"
            placeholder="ex. 100"
            type="text"
            getData={getInputValue}
            name="totalEmployee"
            value={data?.totalEmployee}
          />

          <InputField label="Apply Type" inputStyles="mb-1" imp="*" />
          <div className="flex items-end justify-left gap-4  ">
            <InputField
              type="radio"
              name="applyType"
              parentStyle="flex items-center justify-start gap-1 text-gray-500 "
              inputStyles="h-4 w-4 cursor-pointer  text-sm leading-5"
              radioName="Quick apply"
              getData={getInputValue}
              value="Quick Apply"
              checked={selectedOption === "Quick apply"}
            />
            <InputField
              type="radio"
              name="applyType"
              parentStyle="flex items-center justify-start gap-1 text-gray-500  "
              inputStyles="h-4 w-4 cursor-pointer  text-sm leading-5"
              radioName="External apply"
              getData={getInputValue}
              value="External Apply"
              checked={selectedOption === "External apply"}
              err={radioError.applyTypeError}
            />
          </div>

          <div className="text-right absolute right-3 bottom-3 ">
            <button className="bg-sky-600 hover:bg-sky-700 px-3 py-1 m-4 text-white rounded-md font-semibold" onClick={saveOrUpdateHandler}>
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JobCard;
