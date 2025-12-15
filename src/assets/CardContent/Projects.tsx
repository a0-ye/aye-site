
import './Projects.css'
const projectsStyle = {}

export const Projects = (
    <div style={projectsStyle}>
        <h2>
        There are some things that I have done that I feel like sharing!
        </h2>
        {/* Maybe use a cool grid like structure here? like grid cards using motion? */}
        <div className="projectBox">
            this website!
            <a
            target="_blank" rel="noopener noreferrer"
            href='https://a0-ye.github.io/aye-site/'> link to itself lol </a>
        </div>

        <div className="projectBox">
            My CPU from class
        </div>
        <div className="projectBox">
            My GAN for regenerating music
        </div>

        <div className="projectBox">
            TCP and ARP from class
        </div>
        <div className="projectBox">
            UCSD Hard Hack Hackathon, 2024 and 2025
        </div>

        <div className="projectBox">
            My Proxmox box
        </div>
        <div className="projectBox">
            Worked with UH Manoa VIA-SEEs satellite project
        </div>





    </div>
)