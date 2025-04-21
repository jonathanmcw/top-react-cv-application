import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const personalInfo = {
  // name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'johndoe@example.com',
  contactPhone: '+123 456 7890'
}

const jobInfo = [
  {
    id: 'job1',
    employer: 'TechCorp',
    duration: '2 years',
    description: 'Software Engineer responsible for developing web applications.',
  },
  {
    id: 'job2',
    employer: 'Innovate Inc.',
    duration: '1 year',
    description: 'Junior Developer working on mobile app development.',
  },
  // {
  //   id: 'job3',
  //   employer: 'Startup Hub',
  //   duration: '6 months',
  //   description: 'Intern assisting in backend API development.',
  // },
]

const educationInfo = [
  {
    id: 'edu1',
    institution: 'University of Technology',
    duration: '4 years',
    details: 'Bachelor of Science in Computer Science.',
  },
  {
    id: 'edu2',
    institution: 'High School of Excellence',
    duration: '3 years',
    details: 'High School Diploma with a focus on STEM subjects.',
  },
  {
    id: 'edu3',
    institution: 'Online Learning Platform',
    duration: '6 months',
    details: 'Completed a certification in Full-Stack Web Development.',
  }
]

const profile = {personalInfo, jobInfo, educationInfo}


// Work experience the 
function InputForm({profile, onChange, onToggleExpand}) {
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
      <div id="work-experience" className="accordion">       
        {profile.jobInfo.map((job) => (
          <div key={job.id} className="expandable-session">
            <button key={job.id} onClick={onToggleExpand}>Toggle</button>
            <label>Employer</label>
            <input id={`${job.id}-employer`} type="text" defaultValue={job.employer} onChange={onChange} />
            <label>Duration</label>
            <input id={`${job.id}-duration`} type="text" defaultValue={job.duration} onChange={onChange} />
            <label>Description</label>
            <input id={`${job.id}-description`} type="text" defaultValue={job.description} onChange={onChange} />
          </div>
        ))}
      </div>

      <h2>Education</h2>
      {profile.educationInfo.map((edu) => (
        <div key={edu.id}>
          <label>Institution</label>
          <input id={`${edu.id}-institution`} type="text" defaultValue={edu.institution} onChange={onChange} />
          <label>Duration</label>
          <input id={`${edu.id}-duration`} type="text" defaultValue={edu.duration} onChange={onChange} />
          <label>Details</label>
          <input id={`${edu.id}-details`} type="text" defaultValue={edu.details} onChange={onChange} />
        </div>
      ))}
    </div>
  );
}


function PreviewPersonalInfo({profile}) {
  return (
    <div id="cv-personal-info">
      <h2>Personal Information</h2>
      {/* <p>Personal info</p> */}
      {Object.entries(profile.personalInfo).map(([key, value]) => (
        <div key={key}>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}

function PreviewWorkExperience({profile}) {
  const jobInfo = profile.jobInfo.map((record) =>
    <li key={record.id}>
      <strong>Employer:</strong> {record.employer} <br />
      <strong>Duration:</strong> {record.duration} <br />
      <strong>Description:</strong> {record.description}
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
  // const [count, setCount] = useState(0)
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  function handleExpand(e) {
    
  }

  function handleInput(e) {
    const { id, value } = e.target;

    setUpdatedProfile((prevProfile) => {
      const newProfile = { ...prevProfile };

      if (id in newProfile.personalInfo) {
        newProfile.personalInfo[id] = value;
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
      <InputForm profile={updatedProfile} onChange={handleInput} onToggleExpand={handleExpand}/>
      <PreviewForm profile={updatedProfile} />
    </>
  );
}

export default App
