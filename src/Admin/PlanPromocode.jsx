import React from "react";
import Plan from "./Plan";
import Promocde from "./Promocde";


const PlanPromocode = () => {
  return (
    <div>
      <div className="p-2 ">
        <div className="w-full flex flex-row">
          <div className=" w-1/2 h-[full]">
            <Plan />
          </div>
          <div className=" w-1/2 h-[92vh]">
            <Promocde/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPromocode;
