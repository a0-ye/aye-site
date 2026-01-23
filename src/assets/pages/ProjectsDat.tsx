import type { ReactNode } from "react"

export interface projectContent {
    img: string, title: ReactNode, date: ReactNode, description: ReactNode, bullets: ReactNode
}

export const contentList: projectContent[] = [
    {
        img: 'img/aye-site.png',
        title: <a target="_blank" rel="noopener noreferrer"
            href='https://a0-ye.github.io/aye-site/'> Personal Website </a>,
        date: 'just now!',
        description: <><p> This is my personal website, if its hard to tell!</p>
            <p> Main ingredients include: React, Motion.dev, and DndKit.</p>
            <p> Didn't have a lick of knowledge of vite, and little real experience with React, zero knowledge of Motion. A good hands on learning experience and had a lot of trouble / fun trying to recreate the feel of Balatro with TSX. the functionality and animations are all made by me utilizing the Motion lib combined with DndKit. I felt like I was reinventing the wheel a few times but it was a good way to apply what I've learned.</p>
        </>,
        bullets: <>
            What I learned from this:
            <li> Front end development</li>
            <li> Vite</li>
            <li> React</li>
            <li> Motion.dev (formerly Framer Motion)</li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Single Cycle CPU + ISA</div>,
        date: 'June 2025',
        description: <>
            <div>
                My CPU from class. What was supposed to be a duo project became a solo project after my partner dropped. I had to learn how to design and simulate an 8 bit CPU,
                with an ISA. I had almost zero knowledge at the beginning. Had a lot of trouble with memory (initial and set) and the flow from power on vs entry point, but I managed by and got full marks! {"(lie.... got a B+)"}
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> MIPS? architecture </li>
            <li> SysVerilog </li>
            <li> A better understanding of Assembly to hardware </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Mel-Spectrogram GAN</div>,
        date: 'June 2025',
        description: <>
            <div>
                My GAN for regenerating music. The final for my machine learning class. My partner Matteo Perona and I designed a Generative Adversarial Network whose goal was to take a
                Mel-Spectrogram and attempt to regenerate it into the original audio waveform. Due to the lossy nature of FFT and the Mel scale conversion, it would be interesting if it was possible to reproduce the original
                audio from which a Mel-Spectrogram comes from!
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> GAN Implementation </li>
            <li> ????? </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>TCP & ARP</div>,
        date: 'Winter 2025',
        description: <>
            <div>
                TCP and ARP from networking class. I had a lot of fun and pain implementing TCP with congestion control and fast retransmission. It was a real eyeopener for how the internet worked, and having hands on experience re-implementing a core protocol was very enlightnening ad well as frustrating. The same could be said for implementing ARP, since it gave me a great understanding of how devices on a local network communicated with each other.
            </div>
        </>,
        bullets: <>
            What I learned from this:
            <li> Network Stack </li>
            <li> Devices and  </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>UCSD Hard Hack 2024 2025</div>,
        date: 'two times',
        description: <div>
            UCSD Hard Hack Hackathon, 2024 and 2025. I had a lot of fun working with my friends. We didn't win but it was a great experience working with people with different specialties, combining hardware, software, and mechanical engineering.
        </div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>
    },
    {
        img: 'placeholder',
        title: <div>Proxmox Node</div>,
        date: 'this month!',
        description: <div>My Proxmox box. I want to get into self-hosting services for myself and my friends {"(mainly game servers and shows)"}. I had some spare pc parts so I used them to make a proxmox node to host VMs for fun! Admittedly a little overkill for just a few game servers since they could all run on one linux instance but I thought it would be fun to see if I could, rather than should. Plus I plan on expanding to host other services so it worked out.</div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>,
    },
    {
        img: 'placeholder',
        title: <div>VIA-SEEs Satellite Project</div>,
        date: 'placeholder',
        description: <div>Worked with UH Manoa VIA-SEEs satellite project. I worked as a software engineer. My main responsibility was to connect the USB interface between the science equipment and the OBC.

            Admittedly the project was not well managed.</div>,
        bullets: <>
            What I learned from this:
            <li> uhh</li>
            <li>   </li>
            <li> ???? </li>
            <li> Perserverence </li>
        </>,
    },
    {
        img: 'placeholder',
        title: <div>Horse Game Remake</div>,
        date: 'placeholder',
        description: <div>{"24 hour Horse Game Recreation attempt (was for fun)"} There was a game on twitter dot com that blew up for a while. It was some silly horse PNGs bouncing around a maze trying to win by reaching a bundle of carrots. I thought I could make it, so I made my best attempt to do so in just one day. The end result was pretty good and I had a great time learning Godot!</div>,
        bullets: <>
            <li> Godot</li>
            <li> Collisions and working with angle deflections</li>
        </>,
    },
    // {
    //     img:'placeholder'             ,
    //     title:<div></div>           ,
    //     date:'placeholder'            ,
    //     description:<div></div>     ,
    //     bullets:<>

    //             </>         ,
    // },

]