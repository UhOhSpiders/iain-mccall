import React from "react";
import ExperienceItem from "./experience-item";

const Experience = (props) => {
    return (
        <div data-section id='experience' className='mb-16'>
            <h2 className='mb-8 visible lg:invisible font-medium tracking-widest'>Experience</h2>
            {props.data.map(function(object, index){
                return <ExperienceItem  
                    key={`${object.title}+${object.startDate}`}
                    title={object.title}
                    company={object.company}
                    href={object.href}
                    startDate={object.startDate}
                    endDate={object.endDate}
                    description={object.description}
                    logo={object.logo}
                    skills={object.skills}
                />
            })}
        </div>
    )
}

export default Experience