import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { useSelector } from "react-redux";

function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const { selectJob } = useSelector((state) => state.getData);

  const modalHandler = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const openDetailsPage = () => {
    setFormFilled(true);
  };
  useEffect(() => {}, [selectJob]);

  return (
    <>
      {
        <div className=" h-screen bg-gray-200">
          {!formFilled && (
            <button className="bg-sky-600 hover:bg-sky-700 px-3 py-1 m-4 text-white rounded-md font-semibold" onClick={modalHandler}>
              Create Job
            </button>
          )}

          {showModal && <JobCard closeModal={onCloseModal} openDetails={openDetailsPage} />}
          <div className="flex flex-wrap bg-gray-200"> {<JobDetails modalHandler={modalHandler} />}</div>
        </div>
      }
    </>
  );
}

export default LandingPage;
