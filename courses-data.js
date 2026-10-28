/* Techsavvy Tanzania — course catalogue (the one place to edit course details)

   HOW TO ADD REAL LESSON MATERIAL
   Every lesson below has  "url": ""  . To make a lesson open real material, put the link between the
   quotes, for example:
       "url": "https://www.youtube.com/watch?v=..."
   Lessons with a link become clickable; lessons without one show "Material coming soon".
   You can also change any title, summary, level or requirement, and add or remove lessons and modules.

   IMPORTANT: anyone who views a page's source can read these links, so only use links that are fine
   to be public (for example an unlisted YouTube playlist or a public document).
*/
const COURSES = {
  "ai-chatgpt": {
    "title": "Artificial Intelligence & ChatGPT",
    "level": "Beginner",
    "summary": "Understand how AI and tools like ChatGPT work, and how to use them responsibly to solve real problems.",
    "outcomes": [
      "How AI and large language models work",
      "Practical prompting and AI-assisted workflows",
      "Ethical and responsible use of AI"
    ],
    "requirements": [
      "A phone or computer with internet access",
      "A free account with an AI assistant such as ChatGPT"
    ],
    "modules": [
      {
        "title": "Understanding AI",
        "lessons": [
          {
            "title": "What AI is and isn't",
            "summary": "Separate what AI can do today from the hype.",
            "url": ""
          },
          {
            "title": "How AI chatbots work",
            "summary": "A plain-language look at how tools like ChatGPT produce answers.",
            "url": ""
          },
          {
            "title": "Strengths, limits and mistakes",
            "summary": "Learn why AI can sound sure and still be wrong, and how to check.",
            "url": ""
          }
        ]
      },
      {
        "title": "Prompting well",
        "lessons": [
          {
            "title": "Writing clear prompts",
            "summary": "Say what you want, for whom and in what format.",
            "url": ""
          },
          {
            "title": "Giving context and examples",
            "summary": "Get better answers by showing what good looks like.",
            "url": ""
          },
          {
            "title": "Improving answers step by step",
            "summary": "Refine results with follow-up questions.",
            "url": ""
          }
        ]
      },
      {
        "title": "AI for study and work",
        "lessons": [
          {
            "title": "Learning and research",
            "summary": "Use AI to explain ideas and plan your study, then verify the facts.",
            "url": ""
          },
          {
            "title": "Writing and editing",
            "summary": "Draft, edit and translate while keeping your own voice.",
            "url": ""
          },
          {
            "title": "Planning and productivity",
            "summary": "Turn notes into summaries, checklists and schedules.",
            "url": ""
          }
        ]
      },
      {
        "title": "Using AI responsibly",
        "lessons": [
          {
            "title": "Privacy and what not to share",
            "summary": "Know which information should never be pasted into an AI tool.",
            "url": ""
          },
          {
            "title": "Accuracy, bias and honesty",
            "summary": "Check sources, notice bias and give credit properly.",
            "url": ""
          },
          {
            "title": "Project: your AI workflow",
            "summary": "Design and document a repeatable way to use AI in your own work or study.",
            "url": ""
          }
        ]
      }
    ]
  },
  "web-development": {
    "title": "Web Development",
    "level": "Beginner",
    "summary": "Learn to design and build websites and web applications from the ground up.",
    "outcomes": [
      "HTML, CSS, and JavaScript fundamentals",
      "Building responsive, real websites",
      "Introduction to front-end and back-end concepts"
    ],
    "requirements": [
      "A computer with internet access",
      "Basic computer skills",
      "A free code editor (we set one up in the first module)"
    ],
    "modules": [
      {
        "title": "How the web works",
        "lessons": [
          {
            "title": "Websites, browsers and servers",
            "summary": "Follow a web page from the server to your screen.",
            "url": ""
          },
          {
            "title": "Setting up your tools",
            "summary": "Install a code editor and learn your browser's developer tools.",
            "url": ""
          },
          {
            "title": "Your first web page",
            "summary": "Write and open a simple page in HTML.",
            "url": ""
          }
        ]
      },
      {
        "title": "HTML and CSS",
        "lessons": [
          {
            "title": "Structuring content with HTML",
            "summary": "Use headings, lists, links, images and forms properly.",
            "url": ""
          },
          {
            "title": "Styling with CSS",
            "summary": "Control colour, fonts, spacing and borders.",
            "url": ""
          },
          {
            "title": "Layout and responsive design",
            "summary": "Arrange content with Flexbox and Grid so it works on phones and computers.",
            "url": ""
          }
        ]
      },
      {
        "title": "JavaScript basics",
        "lessons": [
          {
            "title": "Variables, functions and the DOM",
            "summary": "Change a page's content with code.",
            "url": ""
          },
          {
            "title": "Handling clicks and forms",
            "summary": "Respond to what visitors do.",
            "url": ""
          },
          {
            "title": "Getting data from the internet",
            "summary": "Fetch and display information from an online source.",
            "url": ""
          }
        ]
      },
      {
        "title": "Publish your work",
        "lessons": [
          {
            "title": "Version control with Git and GitHub",
            "summary": "Save your project history and store it online.",
            "url": ""
          },
          {
            "title": "Publishing with GitHub Pages",
            "summary": "Put your site on the web for free.",
            "url": ""
          },
          {
            "title": "Project: your portfolio site",
            "summary": "Build and publish a personal site that shows your work.",
            "url": ""
          }
        ]
      }
    ]
  },
  "graphic-design": {
    "title": "Graphic Design",
    "level": "Beginner",
    "summary": "Develop the skills to create strong visual identities and digital designs.",
    "outcomes": [
      "Design principles and visual composition",
      "Working with modern design tools",
      "Building a personal design portfolio"
    ],
    "requirements": [
      "A computer or phone with internet access",
      "A free design tool such as Canva or Figma"
    ],
    "modules": [
      {
        "title": "Design foundations",
        "lessons": [
          {
            "title": "What makes a design work",
            "summary": "Balance, contrast and hierarchy in everyday examples.",
            "url": ""
          },
          {
            "title": "Colour",
            "summary": "Choose colour palettes that suit a message and an audience.",
            "url": ""
          },
          {
            "title": "Typography",
            "summary": "Pair fonts and set text so it is easy to read.",
            "url": ""
          }
        ]
      },
      {
        "title": "Layout and images",
        "lessons": [
          {
            "title": "Grids, spacing and alignment",
            "summary": "Organise elements so a design feels clear and tidy.",
            "url": ""
          },
          {
            "title": "Working with images",
            "summary": "Choose, crop and prepare images well.",
            "url": ""
          },
          {
            "title": "Designing for social media and print",
            "summary": "Sizes, formats and file types for different uses.",
            "url": ""
          }
        ]
      },
      {
        "title": "Branding",
        "lessons": [
          {
            "title": "Logo basics",
            "summary": "Understand what makes a simple, lasting logo.",
            "url": ""
          },
          {
            "title": "Building a brand kit",
            "summary": "Combine logo, colours and fonts into one consistent look.",
            "url": ""
          },
          {
            "title": "Applying a brand",
            "summary": "Use your kit on posts, flyers and a profile page.",
            "url": ""
          }
        ]
      },
      {
        "title": "Portfolio",
        "lessons": [
          {
            "title": "Preparing and exporting files",
            "summary": "Export clean files for sharing and printing.",
            "url": ""
          },
          {
            "title": "Project: a brand identity",
            "summary": "Design a brand for a small business, with three social media posts.",
            "url": ""
          },
          {
            "title": "Presenting your portfolio",
            "summary": "Show your work professionally and explain your choices.",
            "url": ""
          }
        ]
      }
    ]
  },
  "networking": {
    "title": "Networking",
    "level": "Beginner",
    "summary": "Understand how computer networks are built, configured, and maintained.",
    "outcomes": [
      "Networking fundamentals and protocols",
      "Setting up and troubleshooting networks",
      "Introduction to network security basics"
    ],
    "requirements": [
      "Good basic computer skills (the Computer Fundamentals course is a good start)",
      "A computer with internet access"
    ],
    "modules": [
      {
        "title": "Networking basics",
        "lessons": [
          {
            "title": "What a network is",
            "summary": "Understand how devices share information and resources.",
            "url": ""
          },
          {
            "title": "Network devices",
            "summary": "Routers, switches and access points, and what each one does.",
            "url": ""
          },
          {
            "title": "IP addresses and subnets",
            "summary": "Read IP addresses and see why networks are divided.",
            "url": ""
          }
        ]
      },
      {
        "title": "How data travels",
        "lessons": [
          {
            "title": "The TCP/IP and OSI models",
            "summary": "Follow data through the layers from your app to the wire.",
            "url": ""
          },
          {
            "title": "DNS, DHCP and HTTP",
            "summary": "See how names, addresses and web requests work.",
            "url": ""
          },
          {
            "title": "Wired and wireless networks",
            "summary": "Compare Ethernet and Wi-Fi and how each is set up.",
            "url": ""
          }
        ]
      },
      {
        "title": "Building and fixing",
        "lessons": [
          {
            "title": "Setting up a small network",
            "summary": "Plan and connect a home or small office network.",
            "url": ""
          },
          {
            "title": "Troubleshooting tools",
            "summary": "Use ping, traceroute and IP settings to find faults.",
            "url": ""
          },
          {
            "title": "Basic network security",
            "summary": "Passwords, firewalls and updates that protect a network.",
            "url": ""
          }
        ]
      },
      {
        "title": "Practice",
        "lessons": [
          {
            "title": "Reading a network diagram",
            "summary": "Understand and draw simple network maps.",
            "url": ""
          },
          {
            "title": "Project: a small office network",
            "summary": "Design and document a network for a small office.",
            "url": ""
          },
          {
            "title": "Where to go next",
            "summary": "Options for further study.",
            "url": ""
          }
        ]
      }
    ]
  },
  "cybersecurity": {
    "title": "Cybersecurity",
    "level": "Beginner",
    "summary": "Learn to identify, prevent, and respond to digital security threats.",
    "outcomes": [
      "Common threats and attack methods",
      "Practical security best practices",
      "Fundamentals of protecting systems and data"
    ],
    "requirements": [
      "Basic computer skills (the Computer Fundamentals course is a good start)",
      "A computer or phone with internet access"
    ],
    "modules": [
      {
        "title": "Security basics",
        "lessons": [
          {
            "title": "Why security matters",
            "summary": "See what is at risk for people, businesses and communities.",
            "url": ""
          },
          {
            "title": "Confidentiality, integrity and availability",
            "summary": "The three goals behind almost every security decision.",
            "url": ""
          },
          {
            "title": "Common threats",
            "summary": "Malware, phishing and social engineering explained.",
            "url": ""
          }
        ]
      },
      {
        "title": "Protecting yourself and your accounts",
        "lessons": [
          {
            "title": "Passwords and password managers",
            "summary": "Create and store strong passwords.",
            "url": ""
          },
          {
            "title": "Two-step verification",
            "summary": "Add a second lock to your important accounts.",
            "url": ""
          },
          {
            "title": "Scams and fraud awareness",
            "summary": "Recognise fake messages, fake links and mobile money scams.",
            "url": ""
          }
        ]
      },
      {
        "title": "Protecting devices and networks",
        "lessons": [
          {
            "title": "Updates, backups and antivirus",
            "summary": "Keep devices patched and your data recoverable.",
            "url": ""
          },
          {
            "title": "Securing Wi-Fi and networks",
            "summary": "Reduce risk on home and public networks.",
            "url": ""
          },
          {
            "title": "Introduction to encryption",
            "summary": "Understand how data is protected when stored and when sent.",
            "url": ""
          }
        ]
      },
      {
        "title": "Responding and next steps",
        "lessons": [
          {
            "title": "What to do after an incident",
            "summary": "Steps to take when an account or device is compromised.",
            "url": ""
          },
          {
            "title": "Ethics and responsible behaviour",
            "summary": "Why security work depends on permission, honesty and respect for the law.",
            "url": ""
          },
          {
            "title": "Project: a personal security checklist",
            "summary": "Create a practical checklist and awareness poster for your family or community.",
            "url": ""
          }
        ]
      }
    ]
  },
  "digital-marketing": {
    "title": "Digital Marketing",
    "level": "Beginner",
    "summary": "Learn how to grow an audience and market effectively in digital spaces.",
    "outcomes": [
      "Social media and content strategy",
      "Understanding audiences and analytics",
      "Building a simple marketing plan"
    ],
    "requirements": [
      "A smartphone or computer with internet access",
      "A social media account to practise with"
    ],
    "modules": [
      {
        "title": "Foundations",
        "lessons": [
          {
            "title": "What digital marketing is",
            "summary": "Understand the main ways businesses reach people online.",
            "url": ""
          },
          {
            "title": "Knowing your audience",
            "summary": "Describe who you want to reach and what they care about.",
            "url": ""
          },
          {
            "title": "Goals and a simple strategy",
            "summary": "Set clear goals and choose where to focus.",
            "url": ""
          }
        ]
      },
      {
        "title": "Channels",
        "lessons": [
          {
            "title": "Social media marketing",
            "summary": "Plan posts for Instagram, Facebook, TikTok and WhatsApp Business.",
            "url": ""
          },
          {
            "title": "Content and storytelling",
            "summary": "Create content people want to read, watch and share.",
            "url": ""
          },
          {
            "title": "Email, SMS and search basics",
            "summary": "Keep in touch with customers and help them find you.",
            "url": ""
          }
        ]
      },
      {
        "title": "Measuring and improving",
        "lessons": [
          {
            "title": "Reading basic analytics",
            "summary": "Understand reach, engagement and conversions.",
            "url": ""
          },
          {
            "title": "Introduction to online ads",
            "summary": "How paid ads work and how to set a sensible budget.",
            "url": ""
          },
          {
            "title": "Testing and improving",
            "summary": "Try small changes and learn from the results.",
            "url": ""
          }
        ]
      },
      {
        "title": "Project",
        "lessons": [
          {
            "title": "Plan a campaign",
            "summary": "Choose a small business and plan a simple campaign.",
            "url": ""
          },
          {
            "title": "Build a two-week content calendar",
            "summary": "Schedule posts, topics and goals.",
            "url": ""
          },
          {
            "title": "Present your plan",
            "summary": "Explain your strategy and how you will measure success.",
            "url": ""
          }
        ]
      }
    ]
  },
  "content-creation": {
    "title": "Content Creation",
    "level": "Beginner",
    "summary": "Build skills in storytelling through video, writing, and digital media.",
    "outcomes": [
      "Planning and producing content",
      "Basic editing and production tools",
      "Building a consistent content style"
    ],
    "requirements": [
      "A smartphone with a camera, or a computer",
      "A free video or photo editing app"
    ],
    "modules": [
      {
        "title": "Planning content",
        "lessons": [
          {
            "title": "Finding your topic and audience",
            "summary": "Choose what to create and who it is for.",
            "url": ""
          },
          {
            "title": "Ideas, scripts and storyboards",
            "summary": "Turn an idea into a simple plan.",
            "url": ""
          },
          {
            "title": "Building a content calendar",
            "summary": "Keep a steady rhythm of publishing.",
            "url": ""
          }
        ]
      },
      {
        "title": "Making content",
        "lessons": [
          {
            "title": "Shooting video and photos with a phone",
            "summary": "Light, framing and steady shots without special equipment.",
            "url": ""
          },
          {
            "title": "Recording clear audio",
            "summary": "Capture a voice that is easy to understand.",
            "url": ""
          },
          {
            "title": "Writing for the web and social media",
            "summary": "Write short, clear captions and posts.",
            "url": ""
          }
        ]
      },
      {
        "title": "Editing and publishing",
        "lessons": [
          {
            "title": "Video editing basics",
            "summary": "Cut, order and polish a short video.",
            "url": ""
          },
          {
            "title": "Thumbnails, captions and hashtags",
            "summary": "Present your work so people click.",
            "url": ""
          },
          {
            "title": "Publishing and staying consistent",
            "summary": "Post regularly and manage your time.",
            "url": ""
          }
        ]
      },
      {
        "title": "Growing and doing it right",
        "lessons": [
          {
            "title": "Learning from feedback and analytics",
            "summary": "See what works and improve.",
            "url": ""
          },
          {
            "title": "Credit, copyright and ethics",
            "summary": "Use music, images and other people's work properly.",
            "url": ""
          },
          {
            "title": "Project: a three-part series",
            "summary": "Plan, make and publish a short series of connected pieces.",
            "url": ""
          }
        ]
      }
    ]
  },
  "programming": {
    "title": "Programming Fundamentals",
    "level": "Beginner",
    "summary": "Learn the logic and foundations behind writing code.",
    "outcomes": [
      "Core programming concepts and logic",
      "Problem-solving through code",
      "A foundation for further specialization"
    ],
    "requirements": [
      "A computer with internet access",
      "Basic computer skills (the Computer Fundamentals course is a good start)"
    ],
    "modules": [
      {
        "title": "Thinking like a programmer",
        "lessons": [
          {
            "title": "What a program is",
            "summary": "See how computers follow instructions and why order matters.",
            "url": ""
          },
          {
            "title": "Solving problems step by step",
            "summary": "Break a task into small steps before writing any code.",
            "url": ""
          },
          {
            "title": "Variables and data types",
            "summary": "Store and use numbers, text and true/false values in Python.",
            "url": ""
          }
        ]
      },
      {
        "title": "Decisions and repetition",
        "lessons": [
          {
            "title": "Making decisions with conditions",
            "summary": "Use if, else and comparisons to choose what happens next.",
            "url": ""
          },
          {
            "title": "Repeating work with loops",
            "summary": "Use for and while loops to avoid writing the same code twice.",
            "url": ""
          },
          {
            "title": "Functions",
            "summary": "Package code into reusable pieces with inputs and outputs.",
            "url": ""
          }
        ]
      },
      {
        "title": "Working with data",
        "lessons": [
          {
            "title": "Lists and dictionaries",
            "summary": "Keep collections of values and look things up by name.",
            "url": ""
          },
          {
            "title": "Input and output",
            "summary": "Read what the user types and show clear results.",
            "url": ""
          },
          {
            "title": "Finding and fixing bugs",
            "summary": "Read error messages and debug methodically.",
            "url": ""
          }
        ]
      },
      {
        "title": "Practice project",
        "lessons": [
          {
            "title": "Plan your program",
            "summary": "Pick a small idea, such as a quiz or a simple calculator, and outline it.",
            "url": ""
          },
          {
            "title": "Build it",
            "summary": "Write the program in small steps and test as you go.",
            "url": ""
          },
          {
            "title": "Share and improve",
            "summary": "Explain your code to others and improve it from feedback.",
            "url": ""
          }
        ]
      }
    ]
  },
  "computer-fundamentals": {
    "title": "Computer Fundamentals",
    "level": "Beginner",
    "summary": "Build essential computer literacy for those just starting out.",
    "outcomes": [
      "Using a computer confidently and safely",
      "Core software and internet skills",
      "A foundation for any tech career path"
    ],
    "requirements": [
      "A computer or laptop with internet access",
      "No previous experience needed"
    ],
    "modules": [
      {
        "title": "Getting started with computers",
        "lessons": [
          {
            "title": "Parts of a computer",
            "summary": "Learn what the processor, memory, storage and screen do, and how they work together.",
            "url": ""
          },
          {
            "title": "The desktop and operating system",
            "summary": "Find your way around windows, files, folders and settings.",
            "url": ""
          },
          {
            "title": "Keyboard, mouse and typing",
            "summary": "Build comfortable typing and navigation habits.",
            "url": ""
          }
        ]
      },
      {
        "title": "Everyday software",
        "lessons": [
          {
            "title": "Writing documents",
            "summary": "Create, format and save a document such as a letter or a CV.",
            "url": ""
          },
          {
            "title": "Spreadsheets for beginners",
            "summary": "Use rows, columns and simple formulas to organise numbers.",
            "url": ""
          },
          {
            "title": "Presentations",
            "summary": "Build a clear slide deck and present it with confidence.",
            "url": ""
          }
        ]
      },
      {
        "title": "The internet and staying safe",
        "lessons": [
          {
            "title": "How the internet and the web work",
            "summary": "Understand browsers, search engines and websites.",
            "url": ""
          },
          {
            "title": "Email and online accounts",
            "summary": "Set up an account and write a professional email.",
            "url": ""
          },
          {
            "title": "Safe computing habits",
            "summary": "Use strong passwords, install updates and spot common scams.",
            "url": ""
          }
        ]
      },
      {
        "title": "Putting it together",
        "lessons": [
          {
            "title": "Managing files and backups",
            "summary": "Organise your work and keep a safe copy.",
            "url": ""
          },
          {
            "title": "Project: your CV and a short presentation",
            "summary": "Prepare a CV and a three-slide introduction of yourself.",
            "url": ""
          },
          {
            "title": "Next steps",
            "summary": "Choose which Techsavvy course to take next.",
            "url": ""
          }
        ]
      }
    ]
  },
};
