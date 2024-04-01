import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faArrowRight, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskContainer = ({ 
    title,
    data,
    buttonClick,
    buttonCheck,
    handleButtonClick,
    handleButtonCheck,
    inputValue,
    handleTaskInput,
    hasUpdateRight,
    handleUpdateRight,
    hasUpdateLeft, 
    handleUpdateLeft, 
    handleRemoveTask,
    backgroundColor,
    borderColor,
    hoverArrowColor, 
    hoverLeftColor}) => {

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className={` ${backgroundColor} p-4 text-white font-bold flex items-center justify-between rounded mb-5`}>
        <span>{title}</span>
        <div className="ml-auto">
          <button 
            className='text-black hover:text-white text-sm'
            onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        </div>
      </div>

      {buttonClick && !buttonCheck &&
        <div className={`bg-transparent ${borderColor} p-4 text-black flex items-center justify-between rounded border-2`}>
          <input
            type='text' 
            value={inputValue}
            onChange={handleTaskInput}
            className="w-full mr-10 border-b border-black transition-all duration-300 border-opacity-0 group-hover:border-opacity-100 focus:border-opacity-100 focus:outline-none"
          />
          <div className="ml-auto">
            <button 
              className='text-black hover:text-green-800 text-sm'
              onClick={handleButtonCheck}>
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          </div>
        </div>
      }

      <div>
        {data && 
          Object.entries(data).map(([key, task]) => (
            <div
              key={key}
              className={`bg-transparent ${borderColor} p-4 text-black flex items-center justify-between rounded border-b-2`}
            >
              {task.description}
              <div className="ml-auto">
                <div className="flex flex-row gap-x-5">
                {hasUpdateLeft && <button
                    className={`text-black ${hoverLeftColor} text-sm`}
                    onClick={() => handleUpdateLeft(key, task)}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>}
                  {hasUpdateRight && <button
                    className={`text-black ${hoverArrowColor} text-sm`}
                    onClick={() => handleUpdateRight(key, task)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>}
                  <button
                    className="text-black hover:text-red-800 text-sm"
                    onClick={() => handleRemoveTask(key)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TaskContainer;
