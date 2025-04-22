import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { personalInfo, jobInfo, educationInfo } from './example-data'
import Accordion from './components/accordion'

const profile = {personalInfo, jobInfo, educationInfo}


// Work experience the 
function InputForm({profile, onChange}) {
  return (
    <div id="input-form" className="card">
      <h1>Input Form</h1>

      <h2>Personal Information</h2>
      {Object.entries(profile.personalInfo).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input id={key} type="text" defaultValue={value} onChange={onChange} />
        </div>
      ))}

      <h2>Work Experience</h2>
      <Accordion 
        items={profile.jobInfo}
        getTitle={item => item.employer}
        getDescription={item => (
          <> 
            <label>Employer:</label>
            <input
              id={`${item.id}-employer`} 
              type="text" 
              value={item.employer}
              onChange={onChange}
            />            
            <label>Duration:</label>
            <input
              id={`${item.id}-duration`} 
              type="text" 
              value={item.duration}
              onChange={onChange}
            />
            <label>Details:</label>
            <textarea
              id={`${item.id}-details`} 
              type="text" 
              value={item.details}
              onChange={onChange}
            />
          </>
        )}
        onChange={onChange}
      />

      <h2>Education</h2>
      <Accordion 
        items={profile.educationInfo}
        getTitle={item => item.institution}
        getDescription={item => (
          <>
            <label>Institution:</label>
            <input
              id={`${item.id}-institution`} 
              type="text" 
              value={item.institution}
              onChange={onChange}
            />
            <label>Duration:</label>
            <input
              id={`${item.id}-duration`} 
              type="text" 
              value={item.duration}
              onChange={onChange}
            />
            <label>Details:</label>
            <textarea
              id={`${item.id}-details`} 
              type="text" 
              value={item.details}
              onChange={onChange}
            />
          </>
        )}
        onChange={onChange}
      />
    </div>
  );
}


function PreviewPersonalInfo({profile}) {
  return (
    <div id="cv-personal-info">
      <h2>Personal Information</h2>
      <p>{profile.personalInfo["First Name"]} {profile.personalInfo["Last Name"]}</p>
      <p>{profile.personalInfo["Email Address"]}</p>
      <p>{profile.personalInfo["Contact Phone"]}</p>
    </div>
  )
}

function PreviewWorkExperience({profile}) {
  const jobInfo = profile.jobInfo.map((record) =>
    <li key={record.id}>
      <strong>Employer:</strong> {record.employer} <br />
      <strong>Duration:</strong> {record.duration} <br />
      <strong>Description:</strong> {record.details}
    </li>
  );

  return (
    <div id="cv-work-experience">
      <h2>Work Experience</h2>
      <ul>
        {jobInfo}
      </ul>
    </div>
  );
}

function PreviewEducation({profile}) {
  const eduInfo = profile.educationInfo.map((qualification) => 
    <li key={qualification.id}>
      <strong>Institution:</strong> {qualification.institution} <br />
      <strong>Duration:</strong> {qualification.duration} <br />
      <strong>Details:</strong> {qualification.details}
    </li>
  );

  return (
    <div id="cv-education">
      <h2>Education</h2>
      <ul>
        {eduInfo}
      </ul>
    </div>
  );
}

function PreviewForm({profile}) {
  return (
    <div id="preview-form" className="card">
      <h1>Your CV</h1>
      <PreviewPersonalInfo profile={profile}/>
      <PreviewWorkExperience profile={profile}/>
      <PreviewEducation profile={profile}/>
    </div>
  )
}


function App() {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  function onChange(e) {
    handleInput(e); 
  }

  function handleInput(e) {
    const { id, value } = e.target;

    setUpdatedProfile((prevProfile) => {
      const newProfile = { ...prevProfile };

      if (id in newProfile.personalInfo) {
        if (id === "First Name" || id === "Last Name") {
          newProfile.personalInfo[id] = value;
        } else {
          newProfile.personalInfo[id] = value;
        }
      } else {
        const jobMatch = newProfile.jobInfo.find((job) => 
          id.startsWith(job.id)
        );
        if (jobMatch) {
          const field = id.split("-")[1];
          jobMatch[field] = value;
        } else {
          const eduMatch = newProfile.educationInfo.find((edu) =>
            id.startsWith(edu.id) 
          );
          if (eduMatch) {
            const field = id.split("-")[1];
            eduMatch[field] = value;
          }
        }
      }
      return newProfile;
    });
  }

  return (
    <>
      <InputForm profile={updatedProfile} onChange={handleInput} />
      <PreviewForm profile={updatedProfile} />
    </>
  );
}

export default App
