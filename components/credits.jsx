import React from "react";

const Credits = (props) => {
        return (
        <div id='credits' className='group mt-32'>
            <div className='text-surface-600'>
                <div className='mb-4'>
                    This website was built using a <a href="https://github.com/karlgrossmann/two-column-portfolio" target="_blank" rel="noopener noreferrer" className="text-on-background transition-all hover:text-primary-500">template</a> by <a href="https://karlgrossmann.com" target="_blank" rel="noopener noreferrer" className="text-on-background transition-all hover:text-primary-500">Karl Grossmann</a>. I added a physics simulation using Three.js and Cannon.js. 
                </div>
            </div>
        </div>
    )
}

export default Credits