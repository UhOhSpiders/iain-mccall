import React from "react";
import Image from "next/image";

function ExperienceItem(props) {
  return (
    <div className="group flex flex-row mb-4 p-5 transition-all hover:bg-surface-200 hover:bg-opacity-70">
      <div>
          {props.title} | {props.company}{" "}
        <div className="mb-2 text-surface-600">
          {props.startDate} - {props.endDate}
        </div>
        <div className="text-surface-600 mb-4">{props.description}</div>
        <div className="flex flex-row overflow-x-auto">
          {props.skills
            ? props.skills.map((object) => (
                <div
                  key={object}
                  className="bg-surface-400 py-1 px-3 rounded-full text-xs mr-2 whitespace-nowrap"
                >
                  {object}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
