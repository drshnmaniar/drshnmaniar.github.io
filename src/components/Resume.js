import "../style/resume.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import resumeData from "../content/resume.json";
const workExperience = resumeData.workExperience;
const education = resumeData.education;

const EmailIcon = <FontAwesomeIcon icon={faEnvelope} />;
const PhoneIcon = <FontAwesomeIcon icon={faPhone} />;
const LinkedinIcon = <FontAwesomeIcon icon={faLinkedin} />;
const GithubIcon = <FontAwesomeIcon icon={faGithub} />;

const Resume = () => {
    return (
        <>
            <header>
                <p className="h1">{resumeData.name} - {resumeData.position}</p>
                <br className="print-break" />
                <p> {EmailIcon} <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a> | {PhoneIcon} <a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a> | {LinkedinIcon} <a href={resumeData.linkedinUrl} target="_blank" rel="noopener noreferrer">{resumeData.linkedinUsername}</a> | {GithubIcon} <a href={resumeData.githubUrl} target="_blank" rel="noopener noreferrer">{resumeData.githubUsername}</a></p>
            </header>
            <main>
                <WorkExperience workExperience={workExperience} />
                <br className="print-break" />
                <Education education={education} />
                <br className="print-break" />
            </main>
        </>
    )
}

const WorkExperience = ({ workExperience, ...otherProps }) => {
    return (
        <section>
            <h2>Work Experience</h2>
            {workExperience.map((work, index) => (
                <div key={index}>
                    <p className="float-left"><span className="bold">{work.company}</span> - {work.location}</p>
                    <p className="float-right">{work.timeSpan}</p>
                    <br className="print-break" />
                    <p className="clear-both">{work.position}</p>
                    <ul>
                        {work.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}

const Education = ({ education, ...otherProps }) => {
    return (
        <section>
            <h2>Education</h2>
            {education.map((edu, index) => (
                <div key={index}>
                    <p className="float-left"><span className="bold">{edu.university}</span></p>
                    <p className="float-right">{edu.timeSpan}</p>
                    <br className="print-break" />
                    <p className="clear-both float-left">{edu.degree}</p>
                    <p className="float-right">CGPA: {edu.cgpa}</p>
                </div>
            ))}
        </section>
    )
}
export default Resume;
