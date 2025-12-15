
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
            made with vite and React. Didn't have a lick of knowledge of vite, and little real experience with React. A good
            hands on learning experience and had a lot of trouble / fun trying to recreate the feel of Balatro with TSX.
        </div>

        <div className="projectBox">
            My CPU from class. What was supposed to be a duo project became a solo project after my partner dropped. I had to learn how to design and simulate an 8 bit CPU, 
            with an ISA. I had almost zero knowledge at the beginning. Had a lot of trouble with memory and such, but I managed by and got full marks! {"(lie.... got a B+)"}
        </div>
        <div className="projectBox">
            My GAN for regenerating music. The final for my machine learning class. My partner Matteo Perona and I designed a Generative Adversarial Network whose goal was to take a
            Mel-Spectrogram and attempt to regenerate it into the original audio waveform. Due to the lossy nature of FFT and the Mel scale conversion, it would be interesting if it was possible to reproduce the original
            audio from which a Mel-Spectrogram comes from!
        </div>

        <div className="projectBox">
            TCP and ARP from networking class. I had a lot of fun and pain implementing TCP with congestion control and fast retransmission. It was a real eyeopener for how the internet worked, and having hands on experience re-implementing a core protocol was very enlightnening ad well as frustrating. The same could be said for implementing ARP, since it gave me a great understanding of how devices on a local network communicated with each other.
        </div>
        <div className="projectBox">
            UCSD Hard Hack Hackathon, 2024 and 2025. I had a lot of fun working with my friends. We didn't win but it was a great experience working with people with different specialties, combining hardware, software, and mechanical engineering.
        </div>

        <div className="projectBox">
            My Proxmox box. I want to get into self-hosting services for myself and my friends {"(mainly game servers and shows)"}. I had some spare pc parts so I used them to make a proxmox node to host VMs for fun! Admittedly a little overkill for just a few game servers since they could all run on one linux instance but I thought it would be fun to see if I could, rather than should. Plus I plan on expanding to host other services so it worked out.
        </div>
        <div className="projectBox">
            Worked with UH Manoa VIA-SEEs satellite project. I worked as a software engineer. My main responsibility was to connect the USB interface between the science equipment and the OBC. 

            Admittedly the project was not well managed.
        </div>
        <div className="projectBox">
            {"24 hour Horse Game Recreation attempt (was for fun)"} There was a game on twitter dot com that blew up for a while. It was some silly horse PNGs bouncing around a maze trying to win by reaching a bundle of carrots. I thought I could make it, so I made my best attempt to do so in just one day. The end result was pretty good and I had a great time learning Godot!
        </div>
        





    </div>
)