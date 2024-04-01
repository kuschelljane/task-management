import React, { useState, useEffect } from 'react';
import TaskContainer from './TaskContainer';
import './firebaseConfig';
import { getDatabase, ref, push, set, get, remove} from "firebase/database";


const App = () => {

  const [backlogData, setBacklogData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const taskRef = ref(db, 'backlog');

      try {
        const snapshot = await get(taskRef);

        if (snapshot.exists()) {
          setBacklogData(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  fetchData();
}, []); 

  const [backlogButtonClick, setBacklogButtonClick] = useState(false); 
  const handleBacklogClick = () => {
    setBacklogButtonClick(true); 
  }
  const [backlogInput, setBacklogInput] = useState("");
  const handleBacklogInput = (event) => {
    setBacklogInput(event.target.value);
  };
  const [backlogButtonCheck, setBacklogButtonCheck] = useState(false); 
  const handleBacklogCheck = async () => {
    if (!backlogInput) {
      window.alert('Please fill in the backlog description before proceeding.');
      return;
    }
    setBacklogButtonCheck(true);
    const db = getDatabase();
    const backlogRef = ref (db, 'backlog');
    const backlogData = {
      status: 'backlog',
      description: backlogInput,
    };
    try {
      const newBacklogRef = push(backlogRef);
      await set(newBacklogRef, backlogData);
      alert("New backlog task has been added.");
      window.location.reload();
    }
    catch (error) {
      alert ("There was an error adding the backlog task. Try again later.");
      console.error("Error:", error); 
      }
    }

  const handleRemoveBacklog = async (key) => {
    const db = getDatabase ();
    const backlogRef = ref(db, `backlog/${key}`);
    try {
      await remove(backlogRef);
      alert ("Backlog task has been deleted successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error deleting the backlog task. Try again later.");
      console.error('Error:', error);
    }
  }

  const handleUpdateBacklog = async (key, task) => {
    const db = getDatabase ();
    const backlogRef = ref(db, `backlog/${key}`);
    try {
      await remove(backlogRef);
      const inProgressRef = ref(db, 'inProgress');
      const newInProgressRef = push(inProgressRef);
      const inProgressData = {
        status: 'inProgress',
        description: task.description
      };
      await set(newInProgressRef, inProgressData);
      alert ("Backlog task has been updated successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error updating the backlog task. Try again later.");
      console.error('Error:', error);
    }
  };



  //in progress functions
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const taskRef = ref(db, 'inProgress');

      try {
        const snapshot = await get(taskRef);

        if (snapshot.exists()) {
          setProgressData(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  fetchData();
}, []); 

  const [progressInput, setProgressInput] = useState("");
  const handleProgressInput = (event) => {
    setProgressInput(event.target.value);
  };

  const [progressButtonClick, setProgressButtonClick] = useState(false); 
  const handleProgressClick = () => {
    setProgressButtonClick(true); 
  }

  const [progressButtonCheck, setProgressButtonCheck] = useState(false); 
  const handleProgressCheck = async() => {
    if (!progressInput) {
      window.alert('Please fill in the in progress description before proceeding.');
      return;
    }
    setProgressButtonCheck(true); 
    const db = getDatabase();
    const inProgressRef = ref (db, 'inProgress');
    const inProgressData = {
      status: 'inProgress',
      description: progressInput,
    };
    try {
      const newInProgressRef = push(inProgressRef);
      await set(newInProgressRef, inProgressData);
      alert("New in progress task has been added.");
      window.location.reload();
    }
    catch (error) {
      alert ("There was an error adding the in progress task. Try again later.");
      console.error("Error:", error); 
      }
    }

  const handleRemoveProgress = async (key) => {
    const db = getDatabase ();
    const inProgressRef = ref(db, `inProgress/${key}`);
    try {
      await remove(inProgressRef);
      alert ("In progress task has been deleted successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error deleting the in progress task. Try again later.");
      console.error('Error:', error);
    }
  }

  const handleProgressLeft = async (key, task) => {
    const db = getDatabase ();
    const inProgressRef = ref(db, `inProgress/${key}`);
    try {
      await remove(inProgressRef);
      const backlogRef = ref(db, 'backlog');
      const newBacklogRef = push(backlogRef);
      const backlogData = {
        status: 'backlog',
        description: task.description
      };
      await set(newBacklogRef, backlogData);
      alert ("In progress task has been updated successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error updating the in progress task. Try again later.");
      console.error('Error:', error);
    }
  };

  const handleProgressRight = async (key, task) => {
    const db = getDatabase ();
    const inProgressRef = ref(db, `inProgress/${key}`);
    try {
      await remove(inProgressRef);
      const doneRef = ref(db, 'done');
      const newDoneRef = push(doneRef);
      const doneData = {
        status: 'done',
        description: task.description
      };
      await set(newDoneRef, doneData);
      alert ("In progress task has been updated successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error updating the in progress task. Try again later.");
      console.error('Error:', error);
    }
  };



  //done functions
  const [doneData, setDoneData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const taskRef = ref(db, 'done');

      try {
        const snapshot = await get(taskRef);

        if (snapshot.exists()) {
          setDoneData(snapshot.val());
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  fetchData();
}, []); 

const [doneInput, setDoneInput] = useState("");
const handleDoneInput = (event) => {
  setDoneInput(event.target.value);
};

  const [doneButtonClick, setDoneButtonClick] = useState(false); 
  const handleDoneClick = () => {
    setDoneButtonClick(true); 
  }

  const [doneButtonCheck, setDoneButtonCheck] = useState(false); 
  const handleDoneCheck = async() => {
    if (!doneInput) {
      window.alert('Please fill in the done description before proceeding.');
      return;
    }
    setDoneButtonCheck(true); 
    const db = getDatabase();
    const doneRef = ref (db, 'done');
    const doneData = {
      status: 'done',
      description: doneInput,
    };
    try {
      const newDoneRef = push(doneRef);
      await set(newDoneRef, doneData);
      alert("New done task has been added.");
      window.location.reload();
    }
    catch (error) {
      alert ("There was an error adding the done task. Try again later.");
      console.error("Error:", error); 
      }
    }

  const handleRemoveDone = async(key) => {
    const db = getDatabase ();
    const doneRef = ref(db, `done/${key}`);
    try {
      await remove(doneRef);
      alert ("Done task has been deleted successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error deleting the done task. Try again later.");
      console.error('Error:', error);
    }
  }

  const handleUpdateDone = async (key, task) => {
    const db = getDatabase ();
    const doneRef = ref(db, `done/${key}`);
    try {
      await remove(doneRef);
      const inProgressRef = ref(db, 'inProgress');
      const newInProgressRef = push(inProgressRef);
      const inProgressData = {
        status: 'inProgress',
        description: task.description
      };
      await set(newInProgressRef, inProgressData);
      alert ("Done task has been updated successfully.");
      window.location.reload(); 
    } catch (error) {
      alert ("There was an error updating the done task. Try again later.");
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-wrap font-sans">
      
      <TaskContainer
      backgroundColor="bg-blue-400"
      borderColor="border-blue-400"
      hoverArrowColor={"hover:text-yellow-500"}
      title="Backlog" 
      data={backlogData}
      buttonClick = {backlogButtonClick}
      buttonCheck = {backlogButtonCheck}
      inputValue={backlogInput}
      handleTaskInput={handleBacklogInput}
      handleButtonClick={handleBacklogClick}
      handleButtonCheck={handleBacklogCheck}
      hasUpdateRight={true}
      handleUpdateRight={handleUpdateBacklog}
      hasUpdateLeft={false}
      handleRemoveTask={handleRemoveBacklog}
      />  

    <TaskContainer
      backgroundColor="bg-yellow-400"
      borderColor="border-yellow-400"
      hoverArrowColor={"hover:text-green-500"}
      hoverLeftColor={"hover:text-blue-500"}
      title="In Progress" 
      data={progressData}
      buttonClick = {progressButtonClick}
      buttonCheck = {progressButtonCheck}
      inputValue={progressInput}
      handleTaskInput={handleProgressInput}
      handleButtonClick={handleProgressClick}
      handleButtonCheck={handleProgressCheck}
      hasUpdateRight={true}
      handleUpdateRight={handleProgressRight}
      hasUpdateLeft={true}
      handleUpdateLeft={handleProgressLeft}
      handleRemoveTask={handleRemoveProgress}
    />

    <TaskContainer
      backgroundColor="bg-green-400"
      borderColor="border-green-400"
      hoverLeftColor={"hover:text-yellow-500"}
      title="Done" 
      data={doneData}
      buttonClick = {doneButtonClick}
      buttonCheck = {doneButtonCheck}
      inputValue={doneInput}
      handleTaskInput={handleDoneInput}
      handleButtonClick={handleDoneClick}
      handleButtonCheck={handleDoneCheck}
      hasUpdateLeft={true}
      handleUpdateLeft={handleUpdateDone}
      hasUpdateRight={false}
      handleRemoveTask={handleRemoveDone}
    />
    </div>
  );
};

export default App;
