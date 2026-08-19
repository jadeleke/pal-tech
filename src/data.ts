import type { LearningModule, Question } from './types';

const makeQuestions = (moduleId: string, items: Array<[string, string[], string, string]>): Question[] =>
  items.map(([prompt, choices, answer, explanation], index) => ({
    id: `${moduleId}-q${index + 1}`, moduleId, prompt, choices, answer, explanation
  }));

export const modules: LearningModule[] = [
  {
    id: 'computer', title: 'Computer Explorer', shortTitle: 'Computers', icon: '🖥️', colour: '#277da1',
    description: 'Discover how computers take input, process information and create output.',
    bigIdea: 'A computer follows instructions to turn input into useful output, and it can store information for later.',
    lessons: [
      { id:'computer-ipo', title:'The four-part journey', eyebrow:'Discover', concept:'Computers receive input, process it, may store it, and produce output.', example:'At a Mobile Money kiosk, the keypad sends input, the device processes the request, stores a record and shows a result.', challenge:'Which order describes how a computer works?', choices:['Input → Process → Output','Output → Input → Process','Process → Output → Input'], answer:'Input → Process → Output', explanation:'Input comes first. The computer processes it before producing an output.' },
      { id:'computer-devices', title:'Input or output?', eyebrow:'Try', concept:'Input devices send information in. Output devices present information from the computer.', example:'A keyboard is input. A monitor is output. A touchscreen can do both.', challenge:'Which device is mainly an input device?', choices:['Keyboard','Projector','Speaker'], answer:'Keyboard', explanation:'A keyboard sends your key presses into the computer.' },
      { id:'computer-parts', title:'Meet the parts', eyebrow:'See', concept:'The processor follows instructions, memory holds working data, storage keeps files, and ports connect devices.', example:'Think of a school desk: memory is the work on the desk; storage is the cupboard where work is kept.', challenge:'Which part keeps files even after power is off?', choices:['Storage','Monitor','Keyboard'], answer:'Storage', explanation:'Storage keeps documents and apps for later use.' },
      { id:'computer-history', title:'From rooms to pockets', eyebrow:'Challenge', concept:'Computers became smaller, faster, cheaper and more reliable as technology moved from vacuum tubes to transistors, chips and microprocessors.', example:'A smartphone has more computing power than many room-sized early computers.', challenge:'Which change helped put computers into homes and phones?', choices:['Microprocessors','Larger vacuum tubes','More paper'], answer:'Microprocessors', explanation:'Microprocessors placed major computing functions onto compact chips.', goFurther:'Modern AI systems still use processors, memory, storage, input and output—just at enormous scale.' }
    ],
    questions: makeQuestions('computer', [
      ['Which is an output device?',['Microphone','Printer','Scanner'],'Printer','A printer produces a paper output.'],
      ['A touchscreen can be…',['Only input','Only output','Both input and output'],'Both input and output','It displays information and receives touches.'],
      ['What happens during processing?',['The computer follows instructions','The screen turns off','A file is printed'],'The computer follows instructions','Processing means working on input according to instructions.'],
      ['Which stores files long-term?',['Storage drive','Mouse','Speaker'],'Storage drive','A storage drive keeps files after shutdown.'],
      ['Early computers using vacuum tubes were generally…',['Large and power-hungry','Pocket-sized','Wireless'],'Large and power-hungry','Vacuum-tube machines filled rooms and used much power.']
    ])
  },
  {
    id:'algorithm', title:'Algorithm Lab', shortTitle:'Algorithms', icon:'🧩', colour:'#f28f3b',
    description:'Think step by step and turn everyday routines into clear instructions.',
    bigIdea:'An algorithm is a clear, ordered and finite set of steps for solving a problem.',
    lessons:[
      { id:'algorithm-sequence',title:'Steps in order',eyebrow:'Discover',concept:'Sequence means putting instructions in the order they must happen.',example:'To prepare Milo: put powder in a cup, add warm water, stir, then drink carefully.',challenge:'What must happen before you tie your shoelaces?',choices:['Put on your shoes','Walk to school','Take off your socks'],answer:'Put on your shoes',explanation:'The sequence only works when the shoes are on before their laces are tied.'},
      { id:'algorithm-clear',title:'Be a human robot',eyebrow:'Learn',concept:'Computers need precise instructions. “Make it nice” is vague because it does not say what action to take.',example:'“Move forward three steps” is clearer than “go over there.”',challenge:'Which instruction is clearest?',choices:['Click the blue Save button','Do the thing','Fix it nicely'],answer:'Click the blue Save button',explanation:'It names an exact action and target.'},
      { id:'algorithm-decision',title:'Decisions change the path',eyebrow:'Try',concept:'A decision checks a condition and chooses what happens next.',example:'If it is raining, carry an umbrella; otherwise, wear your cap.',challenge:'If your homework is complete, what could the next step be?',choices:['Pack it in your bag','Start before deciding','Skip every step'],answer:'Pack it in your bag',explanation:'The condition is complete, so the “yes” path can continue.'},
      { id:'algorithm-finish',title:'Every algorithm ends',eyebrow:'Reflect',concept:'A useful algorithm has a goal and reaches an ending instead of repeating forever.',example:'Brushing teeth ends after every tooth is cleaned and the brush is rinsed.',challenge:'Which instruction makes a loop finite?',choices:['Repeat 5 times','Repeat forever','Maybe stop'],answer:'Repeat 5 times',explanation:'A fixed count gives the repetition a clear end.',goFurther:'Programs combine sequence, decisions and repetition to create more powerful algorithms.'}
    ],
    questions:makeQuestions('algorithm',[
      ['An algorithm is…',['A precise sequence of steps','A computer brand','A type of cable'],'A precise sequence of steps','Algorithms describe how to solve a problem step by step.'],
      ['Why can “make breakfast” fail as a robot instruction?',['It is too vague','It is too colourful','It has a verb'],'It is too vague','The robot needs exact actions and order.'],
      ['What does a decision do?',['Chooses a path based on a condition','Deletes every step','Always repeats'],'Chooses a path based on a condition','A decision checks something and selects a path.'],
      ['Which sequence is sensible?',['Wash hands → eat','Eat → prepare food','Leave school → arrive at school'],'Wash hands → eat','Handwashing should happen before eating.'],
      ['A finite algorithm…',['Has an ending','Never stops','Has no goal'],'Has an ending','Finite means it completes after a limited number of steps.']
    ])
  },
  {
    id:'flowchart',title:'Flowchart Builder',shortTitle:'Flowcharts',icon:'◇',colour:'#6a4c93',
    description:'Turn algorithms into visual maps using shapes, arrows and decisions.',bigIdea:'A flowchart shows the path through an algorithm with standard shapes and arrows.',
    lessons:[
      {id:'flow-shapes',title:'Shapes have jobs',eyebrow:'Discover',concept:'Oval means Start/End, rectangle means Process, diamond means Decision, and parallelogram means Input/Output.',example:'“Is age 9–14?” belongs in a diamond because the answer branches YES or NO.',challenge:'Which shape shows a decision?',choices:['Diamond','Rectangle','Oval'],answer:'Diamond',explanation:'A diamond asks a question that can send the flow down different paths.'},
      {id:'flow-arrows',title:'Follow the arrows',eyebrow:'Learn',concept:'Arrows show which step comes next and keep the process unambiguous.',example:'Start → Input score → Is score ≥ 5? → Show result → End.',challenge:'What do arrows show?',choices:['Flow direction','Computer speed','Text size'],answer:'Flow direction',explanation:'Arrows connect steps and show the order to follow.'},
      {id:'flow-branches',title:'YES and NO paths',eyebrow:'Try',concept:'A decision usually has labelled branches so each possible answer goes somewhere.',example:'Is it raining? YES → carry umbrella. NO → continue without it.',challenge:'A decision has only a YES arrow. What is missing?',choices:['The NO branch','A second Start','A keyboard'],answer:'The NO branch',explanation:'Every possible result needs a clear destination.'},
      {id:'flow-code',title:'From chart to code',eyebrow:'Challenge',concept:'A flowchart decision maps naturally to an if/else statement in code.',example:'Diamond “score ≥ 5?” becomes if (score >= 5) { pass } else { practise }.',challenge:'Which code idea matches a diamond?',choices:['if/else','A comment','A file name'],answer:'if/else',explanation:'Both choose between paths based on a condition.',goFurther:'Professional developers sketch flows before coding complex features.'}
    ],
    questions:makeQuestions('flowchart',[
      ['Start and End use which shape?',['Oval','Diamond','Rectangle'],'Oval','Ovals mark where the flow begins and finishes.'],
      ['A process uses which shape?',['Rectangle','Oval','Diamond'],'Rectangle','A rectangle contains an action or process.'],
      ['Input/Output uses…',['Parallelogram','Circle','Star'],'Parallelogram','The slanted parallelogram is the standard I/O symbol.'],
      ['Decision branches should be…',['Labelled YES/NO','Hidden','The same line'],'Labelled YES/NO','Labels make each outcome clear.'],
      ['What converts naturally to if/else?',['A decision','A title','An arrow colour'],'A decision','An if/else represents two decision paths in code.']
    ])
  },
  {
    id:'code',title:'Code Lab',shortTitle:'Code',icon:'</>',colour:'#0b7a75',
    description:'Bridge from Scratch blocks to your first real JavaScript ideas.',bigIdea:'Code is a precise way to give a computer instructions; variables hold values and conditions choose actions.',
    lessons:[
      {id:'code-output',title:'Make output',eyebrow:'Discover',concept:'console.log() displays a value so we can see what a program is doing.',example:'console.log("Hello, PAL Tech!") prints a greeting.',challenge:'What appears from console.log("Akwaaba")?',choices:['Akwaaba','console.log','Nothing'],answer:'Akwaaba',explanation:'The text inside the quotes is sent to the console.'},
      {id:'code-variables',title:'Labelled boxes',eyebrow:'Learn',concept:'A variable is a labelled place for a value. Use const when the binding stays the same and let when it will change.',example:'const name = "Ama"; let score = 4; score can change later.',challenge:'Which is best for a score that will increase?',choices:['let','const','var'],answer:'let',explanation:'let is appropriate because the score is intended to change.'},
      {id:'code-types',title:'Kinds of values',eyebrow:'Try',concept:'Strings are text, numbers support maths, and booleans are true or false.',example:'"Kofi" is a string, 12 is a number, and true is a boolean.',challenge:'What type is false?',choices:['Boolean','String','Number'],answer:'Boolean',explanation:'A boolean has one of two values: true or false.'},
      {id:'code-condition',title:'Choose with if/else',eyebrow:'Challenge',concept:'if runs code when a condition is true; else provides another path.',example:'if (score >= 5) { console.log("Pass") } else { console.log("Practise") }',challenge:'If score is 4, what prints?',choices:['Practise','Pass','4 >= 5'],answer:'Practise',explanation:'4 is not at least 5, so the else branch runs.',goFurther:'Use && when two conditions must both be true, such as age >= 9 && age <= 14.'}
    ],
    questions:makeQuestions('code',[
      ['Which prints output?',['console.log()','const only','if only'],'console.log()','console.log sends a value to the console.'],
      ['Which declares a changing value?',['let','const','string'],'let','let is for bindings intended to be reassigned.'],
      ['What type is "12"?',['String','Number','Boolean'],'String','Quotation marks make it text, even when the characters are digits.'],
      ['What does === compare?',['Whether values are equal in value and type','Adds values','Starts a loop'],'Whether values are equal in value and type','Strict equality checks both value and type.'],
      ['A for loop is useful for…',['Repetition','Storing files','Connecting Wi-Fi'],'Repetition','Loops repeat instructions in a controlled way.']
    ])
  },
  {
    id:'network',title:'Network Lab',shortTitle:'Networks',icon:'⌁',colour:'#3a86c8',
    description:'Discover how devices connect, share and route information.',bigIdea:'A network connects devices. A switch connects devices locally; a router connects networks.',
    lessons:[
      {id:'network-lan',title:'Near and far networks',eyebrow:'Discover',concept:'A LAN covers a limited place such as a school lab. A WAN connects across larger areas.',example:'The computers in one PAL Tech room form a LAN; the internet links networks around the world.',challenge:'A school computer lab is usually a…',choices:['LAN','WAN','Single file'],answer:'LAN',explanation:'A LAN connects devices within a limited local area.'},
      {id:'network-devices',title:'Switch or router?',eyebrow:'Learn',concept:'A switch connects devices inside a LAN. A router directs traffic between different networks.',example:'PCs connect to a switch; the router connects that school network to an internet provider.',challenge:'Which connects devices inside the lab?',choices:['Switch','Router only','Printer'],answer:'Switch',explanation:'A switch is designed to connect endpoints on a local network.'},
      {id:'network-wifi',title:'Wi-Fi is not the internet',eyebrow:'Try',concept:'Wi-Fi is one method for connecting to a network. The internet is a global network of networks.',example:'You can connect by Wi-Fi to a router even when the internet service is down.',challenge:'Can Wi-Fi work while internet access is unavailable?',choices:['Yes','No, never','Only on phones'],answer:'Yes',explanation:'Wi-Fi can still connect local devices even if the router cannot reach the internet.'},
      {id:'network-star',title:'Star topology',eyebrow:'Challenge',concept:'In a star, endpoints connect to a central switch. One endpoint can fail without stopping the others, but the centre is critical.',example:'Five lab PCs each have their own cable to one switch.',challenge:'What happens if one endpoint fails?',choices:['Others usually keep working','Every device stops','The WAN disappears'],answer:'Others usually keep working',explanation:'Each endpoint has its own connection to the centre.',goFurther:'A message from PC1 to PC4 travels through the central switch.'}
    ],
    questions:makeQuestions('network',[
      ['The internet is…',['A network of networks','The same as Wi-Fi','One large computer'],'A network of networks','Many networks interconnect to form the internet.'],
      ['What connects networks?',['Router','Keyboard','Switch only'],'Router','Routers direct traffic between networks.'],
      ['A star topology has…',['A central connection point','One long shared cable only','No connections'],'A central connection point','Every endpoint connects to the central switch or access point.'],
      ['If the star switch fails…',['Normal communication stops','Only one PC notices','Internet becomes Wi-Fi'],'Normal communication stops','The centre is a single point of failure.'],
      ['A client usually…',['Requests a service','Connects every network','Prints every page'],'Requests a service','Clients ask servers for data or services.']
    ])
  },
  {
    id:'ai',title:'AI Lab',shortTitle:'AI',icon:'✦',colour:'#7b5fc5',
    description:'Learn how AI finds patterns, why data matters and where mistakes come from.',bigIdea:'AI systems learn patterns from examples. Their answers can be useful, but confidence is not certainty.',
    lessons:[
      {id:'ai-patterns',title:'Patterns from examples',eyebrow:'Discover',concept:'AI training uses examples so a model can learn patterns and make predictions on new inputs.',example:'An image model might learn from many labelled pictures of cats and dogs.',challenge:'What helps an AI learn a useful pattern?',choices:['Relevant examples','One random guess','A louder speaker'],answer:'Relevant examples',explanation:'Training data needs examples connected to the task.'},
      {id:'ai-data',title:'Better data',eyebrow:'Learn',concept:'Training data should be varied and relevant. Narrow data can make a model unreliable for new situations.',example:'A pose detector trained on varied body shapes, clothing and lighting can work for more people.',challenge:'Which training set is better?',choices:['Many varied, relevant examples','Ten identical images','Unlabelled noise'],answer:'Many varied, relevant examples',explanation:'Variety helps the model recognise the important pattern across real situations.'},
      {id:'ai-mistakes',title:'Confident mistakes',eyebrow:'Try',concept:'AI predicts; it does not guarantee truth. A confident-sounding answer can still be wrong.',example:'A chatbot may invent a book title that sounds real. Check important facts using trusted sources.',challenge:'An AI gives an important fact. What should you do?',choices:['Verify it','Assume it is always right','Share immediately'],answer:'Verify it',explanation:'Important information should be checked against reliable sources.'},
      {id:'ai-fairness',title:'Responsible AI',eyebrow:'Reflect',concept:'AI can affect people unfairly when data misses groups or reflects past bias.',example:'A face system trained on only one group may work poorly for others.',challenge:'What could improve a biased model?',choices:['More representative data and testing','Hide the results','Use less relevant data'],answer:'More representative data and testing',explanation:'Inclusive data and careful testing can reveal and reduce unfair performance.',goFurther:'Testing data must be separate from training data so we can fairly check what the model learned.'}
    ],
    questions:makeQuestions('ai',[
      ['AI learns patterns from…',['Data and examples','Magic','Electricity alone'],'Data and examples','Training examples help models find statistical patterns.'],
      ['Confidence means…',['How strongly a model prefers a prediction','The answer is certainly true','The AI has feelings'],'How strongly a model prefers a prediction','Confidence is a score, not a guarantee of correctness.'],
      ['Why use varied data?',['To work across more real situations','To make files colourful','To remove testing'],'To work across more real situations','Variation helps prevent narrow pattern learning.'],
      ['Training and testing data should…',['Check learning fairly','Always be identical','Contain passwords'],'Check learning fairly','Testing on separate examples reveals how well learning generalises.'],
      ['Responsible AI use includes…',['Checking important claims','Sharing private data','Assuming no mistakes'],'Checking important claims','Verification matters because AI can be wrong.']
    ])
  },
  {
    id:'safety',title:'Digital Safety',shortTitle:'Safety',icon:'🛡️',colour:'#d65a4a',
    description:'Protect your information, spot risky messages and make thoughtful choices online.',bigIdea:'When something online feels uncertain: Stop, Think, Check, and Ask a trusted adult.',
    lessons:[
      {id:'safety-private',title:'Keep it private',eyebrow:'Discover',concept:'Personal information can identify or locate you. Share as little as needed and only with trusted people.',example:'Your home address, real password and private phone number should not be posted publicly.',challenge:'Which should stay private?',choices:['Your password','Favourite colour','A public school fact'],answer:'Your password',explanation:'Passwords protect accounts and must never be shared.'},
      {id:'safety-passwords',title:'Stronger passwords',eyebrow:'Learn',concept:'Use long, unique passwords or passphrases. Never type a real password into a practice activity.',example:'A memorable phrase with several unrelated words is stronger than “123456.”',challenge:'Which is the safer habit?',choices:['Use a unique password for each account','Share with a friend','Reuse one short password'],answer:'Use a unique password for each account',explanation:'Unique passwords stop one leaked account from unlocking others.'},
      {id:'safety-links',title:'Pause before clicking',eyebrow:'Try',concept:'Unexpected links may be phishing attempts that try to steal information or install harmful software.',example:'A message saying “urgent—verify your account now” deserves careful checking.',challenge:'What should you do with a strange prize link?',choices:['Stop and ask a trusted adult','Enter your details','Forward it'],answer:'Stop and ask a trusted adult',explanation:'Pausing and checking protects you from pressure tactics.'},
      {id:'safety-footprint',title:'Think before sharing',eyebrow:'Reflect',concept:'Posts and photos can be copied and form a digital footprint. Get permission before sharing about someone else.',example:'Ask your friend before posting their photo, even if you think it is funny.',challenge:'Before posting a friend’s photo, you should…',choices:['Ask permission','Post first','Add their address'],answer:'Ask permission',explanation:'Respecting consent helps keep everyone safe online.',goFurther:'AI-generated photos and voices can look convincing, so check the source and context.'}
    ],
    questions:makeQuestions('safety',[
      ['Which is sensitive personal information?',['Home address','Favourite sport','A public weather report'],'Home address','An address can reveal where someone lives.'],
      ['A strong password should be…',['Long and unique','Your name','Shared widely'],'Long and unique','Length and uniqueness make passwords harder to guess and reuse.'],
      ['A suspicious link arrives. First…',['Stop and check','Click quickly','Send your password'],'Stop and check','A pause gives you time to inspect and ask for help.'],
      ['Before sharing someone’s photo…',['Ask permission','Assume consent','Add their location'],'Ask permission','People should control how their image is shared.'],
      ['A digital footprint is…',['The trail of online activity','A shoe size','A computer cable'],'The trail of online activity','Posts and actions can leave lasting records.']
    ])
  },
  {
    id:'skills',title:'Digital Skills',shortTitle:'Create',icon:'✎',colour:'#2f855a',
    description:'Practise useful Word, Excel and PowerPoint skills in real applications.',bigIdea:'Digital tools help us communicate, calculate and present ideas; good work is clear, accurate and saved carefully.',
    lessons:[
      {id:'skills-word',title:'Create in Word',eyebrow:'Goal',concept:'Make a one-page “My PAL Tech Journey” document with a title, paragraph, bold key word, bullets and an image.',example:'Steps: open Word, add the title, write three sentences, format a key idea, add bullets, insert an image and save.',challenge:'When is the task done?',choices:['The document is clear and saved','Only Word is open','The title is missing'],answer:'The document is clear and saved',explanation:'A finished task includes the required content, useful formatting and a saved file.'},
      {id:'skills-excel',title:'Explore data in Excel',eyebrow:'Goal',concept:'Enter topic scores in rows and columns, then calculate SUM and AVERAGE and create a simple chart.',example:'Use =SUM(B2:B5) to add four values and =AVERAGE(B2:B5) to find their mean.',challenge:'Which formula finds the mean?',choices:['=AVERAGE(B2:B5)','=SUM(B2:B5)','=TITLE(B2:B5)'],answer:'=AVERAGE(B2:B5)',explanation:'AVERAGE adds the values and divides by how many there are.'},
      {id:'skills-slides',title:'Tell a story in slides',eyebrow:'Goal',concept:'Create three slides with clear titles, concise text, useful images and a consistent layout.',example:'Slide 1: topic. Slide 2: what I learned. Slide 3: what I will build next.',challenge:'What makes a presentation easier to follow?',choices:['One clear idea per slide','Tiny paragraphs','Many clashing fonts'],answer:'One clear idea per slide',explanation:'A focused slide helps the audience listen and understand.'},
      {id:'skills-finish',title:'The creator challenge',eyebrow:'Try More',concept:'Combine your tools: write a reflection, analyse scores and present your learning journey.',example:'Save all three files in one clearly named folder so you can find them again.',challenge:'Which file name is clearest?',choices:['PAL-Tech-Journey-Ama.docx','Document1.docx','stuff.docx'],answer:'PAL-Tech-Journey-Ama.docx',explanation:'A descriptive name makes the file easy to recognise later.',goFurther:'Try changing a score in Excel and watch the chart and average update.'}
    ],
    questions:makeQuestions('skills',[
      ['Which tool is best for a formatted letter?',['Word','Excel','Calculator'],'Word','Word is designed for documents and text formatting.'],
      ['A spreadsheet cell is where…',['A row and column meet','Slides are stored','A password is shared'],'A row and column meet','Each cell has a column letter and row number.'],
      ['What does SUM do?',['Adds values','Finds the mean','Makes text bold'],'Adds values','SUM calculates a total.'],
      ['A clear slide should use…',['Concise text','A full essay','Tiny fonts'],'Concise text','Slides support the speaker with focused ideas.'],
      ['Why use descriptive file names?',['To find work later','To use more storage','To change the font'],'To find work later','Clear names make organising and retrieving work easier.']
    ])
  }
];

export const allQuestions = modules.flatMap((module) => module.questions);

export const projects = [
  {title:'Input & Output Hunt',level:'Starter',time:'20 min',icon:'🔎',need:'Paper or notes app',learn:'Classify technology around you',steps:['Find eight devices','Label each input, output or both','Explain one surprising choice']},
  {title:'Morning Algorithm',level:'Starter',time:'25 min',icon:'☀️',need:'Paper and pencil',learn:'Write clear, ordered steps',steps:['Choose a morning routine','Write every action','Ask a partner to test the steps']},
  {title:'Rainy Day Flowchart',level:'Starter',time:'30 min',icon:'🌦️',need:'Paper or slides',learn:'Use decisions and branches',steps:['Start with today’s weather','Add a rain decision','End with what to carry']},
  {title:'PAL Greeting Program',level:'Builder',time:'30 min',icon:'💬',need:'Browser console or code editor',learn:'Variables, strings and output',steps:['Create a name variable','Print a welcome message','Change the name and test again']},
  {title:'Design a School LAN',level:'Builder',time:'40 min',icon:'🔗',need:'Paper or drawing app',learn:'Plan a star network',steps:['Place a central switch','Add five devices','Draw and label every link']},
  {title:'Train-a-Machine Cards',level:'Builder',time:'35 min',icon:'🧠',need:'Small cards',learn:'Understand varied training data',steps:['Choose two categories','Draw ten varied examples','Ask a partner to classify new cards']},
  {title:'Spot the Fake',level:'Explorer',time:'45 min',icon:'🕵️',need:'Three printed or saved claims',learn:'Verify online information',steps:['Find the original source','Check a second trusted source','Explain your confidence']},
  {title:'My PAL Tech Journey',level:'Explorer',time:'60 min',icon:'🚀',need:'Word, Excel and PowerPoint',learn:'Combine digital creation skills',steps:['Write a reflection in Word','Chart topic scores in Excel','Build a three-slide presentation']}
];
