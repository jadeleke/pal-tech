import type { LearningModule, Question } from './types';
import { expandLessons } from './lessonExpansion';

const makeQuestions = (moduleId: string, items: Array<[string, string[], string, string]>): Question[] =>
  items.map(([prompt, choices, answer, explanation], index) => ({
    id: `${moduleId}-q${index + 1}`, moduleId, prompt, choices, answer, explanation
  }));

const foundationModules: LearningModule[] = [
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
      ['Early computers using vacuum tubes were generally…',['Large and power-hungry','Pocket-sized','Wireless'],'Large and power-hungry','Vacuum-tube machines filled rooms and used much power.'],
      ['Which device sends sound into a computer?',['Microphone','Monitor','Projector'],'Microphone','A microphone captures sound as input.'],
      ['What is the main job of memory while a program runs?',['Hold working data','Print documents','Connect a network'],'Hold working data','Memory keeps the information a program is actively using.'],
      ['Which part carries out program instructions?',['Processor','Keyboard','Speaker'],'Processor','The processor executes the instructions in a program.'],
      ['What is an example of computer output?',['A picture shown on a screen','A key being pressed','A mouse being moved'],'A picture shown on a screen','The screen presents processed information as output.'],
      ['Which sequence includes storage?',['Input → Process → Store → Output','Output → Store → Input','Store → Output → Process'],'Input → Process → Store → Output','A computer may store processed information before or after producing an output.'],
      ['Which device is mainly an output device?',['Speaker','Mouse','Scanner'],'Speaker','A speaker presents sound produced by the computer.'],
      ['Which device can scan a paper picture into a computer?',['Scanner','Monitor','Printer'],'Scanner','A scanner captures the picture as input.'],
      ['What usually happens to unsaved work held only in memory when power is lost?',['It may disappear','It becomes a printed page','It moves to the keyboard'],'It may disappear','Working memory normally needs power to keep its contents.'],
      ['What is hardware?',['The physical parts of a computer','Instructions and apps only','A website password'],'The physical parts of a computer','Hardware includes parts you can physically touch.'],
      ['What is software?',['Programs and instructions','The computer desk','A charging cable'],'Programs and instructions','Software tells computer hardware what tasks to perform.'],
      ['Which connection can be used to attach a flash drive?',['USB port','Speaker cone','Screen pixel'],'USB port','A USB port connects compatible external devices.'],
      ['Why was the microprocessor important?',['It made powerful computers smaller','It made computers use paper','It removed all storage'],'It made powerful computers smaller','Putting processing functions on a compact chip helped shrink computers.'],
      ['Which action is input?',['Clicking a mouse button','Hearing sound from speakers','Seeing text on a monitor'],'Clicking a mouse button','The click sends information into the computer.'],
      ['Which action is output?',['A printer producing a page','Typing on a keyboard','Speaking into a microphone'],'A printer producing a page','The printed page is information produced by the computer.'],
      ['Why does a computer need instructions?',['To know what operations to perform','To become a person','To work without any input'],'To know what operations to perform','Computers process data by following defined instructions.']
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
      ['A finite algorithm…',['Has an ending','Never stops','Has no goal'],'Has an ending','Finite means it completes after a limited number of steps.'],
      ['Which instruction is most precise?',['Move forward three steps','Go somewhere','Do it properly'],'Move forward three steps','It gives a clear action and an exact amount.'],
      ['What is sequence in an algorithm?',['The order of steps','The colour of steps','The device used'],'The order of steps','Sequence describes which instruction comes first, next and last.'],
      ['Which instruction creates controlled repetition?',['Repeat 4 times','Repeat forever','Maybe repeat'],'Repeat 4 times','A fixed number makes the repetition clear and finite.'],
      ['What should an algorithm begin with?',['A clear goal or starting point','A random ending','An unknown result'],'A clear goal or starting point','A useful algorithm starts from a defined situation and works toward a goal.'],
      ['If it is raining, carry an umbrella. This is an example of…',['A decision','Storage','Output'],'A decision','The action depends on whether the condition is true.'],
      ['What does it mean to debug an algorithm?',['Find and fix problems in its steps','Decorate the instructions','Delete the goal'],'Find and fix problems in its steps','Debugging improves steps that are missing, unclear or in the wrong order.'],
      ['Which step should come first when making tea?',['Put water in the kettle','Drink the tea','Wash the empty cup afterward'],'Put water in the kettle','The water must be prepared before the drink can be finished.'],
      ['A condition in an algorithm is…',['A test that can affect the next step','A picture used as decoration','The final file name'],'A test that can affect the next step','Conditions determine which path the algorithm follows.'],
      ['Which phrase describes a loop?',['Repeat these steps','Choose between two paths','End immediately'],'Repeat these steps','A loop performs one or more instructions again.'],
      ['Why test an algorithm with different inputs?',['To check that it works in different cases','To make it longer','To remove every decision'],'To check that it works in different cases','Different inputs can reveal missing steps or incorrect decisions.'],
      ['What should happen when an instruction is unclear?',['Rewrite it more precisely','Leave it vague','Add unrelated steps'],'Rewrite it more precisely','Precise instructions reduce misunderstanding.'],
      ['Which is a valid ending for a search algorithm?',['Item found or no items left','Search forever','Start again without a reason'],'Item found or no items left','The algorithm ends after success or after checking every possible item.'],
      ['Breaking a large problem into smaller parts is called…',['Decomposition','Output','Storage'],'Decomposition','Smaller parts are easier to understand and solve.'],
      ['Which algorithm is more efficient?',['One that reaches the correct result with fewer unnecessary steps','One that repeats every step forever','One with no clear result'],'One that reaches the correct result with fewer unnecessary steps','Efficiency avoids work that does not help reach the correct goal.'],
      ['What makes an everyday recipe similar to an algorithm?',['It gives ordered steps toward a result','It always uses a computer','It has no ending'],'It gives ordered steps toward a result','A recipe is a sequence of instructions that produces an outcome.']
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
      ['What converts naturally to if/else?',['A decision','A title','An arrow colour'],'A decision','An if/else represents two decision paths in code.'],
      ['What do arrows connect in a flowchart?',['Steps in their flow order','Only titles','Unrelated pictures'],'Steps in their flow order','Arrows show where the process goes next.'],
      ['Which shape contains an action such as “Add the numbers”?',['Rectangle','Diamond','Oval'],'Rectangle','A rectangle represents a process or action.'],
      ['Where should “Enter your score” appear?',['Parallelogram','Oval','Diamond'],'Parallelogram','Entering data is an input operation.'],
      ['What is wrong with a decision that has no NO path?',['One possible result has nowhere to go','It has too many endings','It uses an arrow'],'One possible result has nowhere to go','Every possible decision result needs a defined path.'],
      ['A complete flowchart should normally have…',['A clear Start and End','Only decisions','No arrows'],'A clear Start and End','Start and End boundaries make the process complete and understandable.'],
      ['Which symbol should contain “Is the score at least 70?”',['Diamond','Rectangle','Oval'],'Diamond','The question creates different paths based on its answer.'],
      ['Which symbol should contain “Calculate the total”?',['Rectangle','Parallelogram','Oval'],'Rectangle','A calculation is a process or action.'],
      ['Which symbol should contain “Display the result”?',['Parallelogram','Diamond','Oval'],'Parallelogram','Displaying information is an output operation.'],
      ['What does tracing a flowchart mean?',['Following its arrows step by step','Changing every shape','Removing the Start'],'Following its arrows step by step','Tracing checks the route that a particular input will take.'],
      ['Can an arrow return to an earlier step?',['Yes, to show repetition','No, never','Only from Start'],'Yes, to show repetition','A returning arrow can create a controlled loop.'],
      ['What should appear on the two exits from a yes-or-no decision?',['YES and NO labels','Two Start labels','File names'],'YES and NO labels','The labels show which result follows each arrow.'],
      ['Why use standard flowchart shapes?',['They make diagrams easier to understand','They make decisions disappear','They replace all arrows'],'They make diagrams easier to understand','Standard symbols give readers a shared visual language.'],
      ['What should you check if a flowchart never reaches End?',['Whether a path loops forever','Whether the title is colourful','Whether it has a picture'],'Whether a path loops forever','An uncontrolled loop can prevent the flow from finishing.'],
      ['Two branches may join again before…',['A shared next step','A second Start','Deleting the process'],'A shared next step','Different paths can reconnect when they continue with the same action.'],
      ['Which flow is correctly ordered?',['Start → Input → Process → Output → End','Output → End → Start','Decision → Start → Input'],'Start → Input → Process → Output → End','The flow begins, receives data, processes it, shows a result and ends.']
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
      ['A for loop is useful for…',['Repetition','Storing files','Connecting Wi-Fi'],'Repetition','Loops repeat instructions in a controlled way.'],
      ['Which value is a Boolean?',['true','"true"','42'],'true','Without quotation marks, true is a Boolean value.'],
      ['Which declaration suits a name that should not be reassigned?',['const','let','loop'],'const','const is appropriate when the binding should stay the same.'],
      ['What runs when an if condition is false?',['The else branch','The same if block','A file download'],'The else branch','else provides the alternative path when the condition is false.'],
      ['What will console.log(3 + 2) display?',['5','3 + 2','Nothing'],'5','The addition is evaluated before the result is printed.'],
      ['Why do programmers test code?',['To find mistakes and confirm behaviour','To make the screen brighter','To rename the keyboard'],'To find mistakes and confirm behaviour','Testing checks whether the program behaves as intended.'],
      ['Which value is a number?',['12','"twelve"','false'],'12','A numeric value without quotation marks is a number.'],
      ['Which value is a string?',['"Ama"','25','true'],'"Ama"','Quotation marks identify the value as text.'],
      ['What does let score = 4 create?',['A variable named score with value 4','A file named score','A four-step loop'],'A variable named score with value 4','let declares a variable and assigns its starting value.'],
      ['What does score = score + 1 do?',['Increases score by one','Turns score into text','Stops the program'],'Increases score by one','The new value is the old score plus one.'],
      ['Which condition is true when age is 10?',['age >= 9','age < 5','age === 14'],'age >= 9','Ten is greater than or equal to nine.'],
      ['What is a bug in code?',['A mistake that causes unwanted behaviour','A computer mouse','A saved document'],'A mistake that causes unwanted behaviour','Programmers debug code to find and fix such mistakes.'],
      ['Why are quotation marks important around text?',['They tell the program it is a string','They add two numbers','They start Wi-Fi'],'They tell the program it is a string','Text literals are written inside quotation marks.'],
      ['Which line prints the value stored in name?',['console.log(name)','name === log','print = name only'],'console.log(name)','Passing the variable to console.log displays its current value.'],
      ['What should a controlled loop include?',['A clear stopping condition or count','No ending','Only a password'],'A clear stopping condition or count','A stopping rule prevents unintended endless repetition.'],
      ['Why use meaningful variable names?',['They make code easier to understand','They make the device heavier','They remove all conditions'],'They make code easier to understand','Names such as score explain what a stored value represents.']
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
      ['A client usually…',['Requests a service','Connects every network','Prints every page'],'Requests a service','Clients ask servers for data or services.'],
      ['Which device connects computers inside one local network?',['Switch','Keyboard','Projector'],'Switch','A switch links endpoints within a LAN.'],
      ['What does LAN stand for?',['Local Area Network','Large Access Node','Linked Application Number'],'Local Area Network','A LAN covers a limited local area such as a room or school.'],
      ['Can two devices share files on Wi-Fi when the internet is down?',['Yes, if the local network still works','No, never','Only with a printer'],'Yes, if the local network still works','Wi-Fi can connect local devices without an active internet connection.'],
      ['In a star network, each computer connects to…',['The central switch or access point','Every other computer directly','No central device'],'The central switch or access point','The centre manages the individual links in a star.'],
      ['A server usually…',['Provides data or a service','Types on a keyboard','Draws network cables'],'Provides data or a service','Servers respond to requests from clients.'],
      ['What is an endpoint on a network?',['A connected device such as a computer','A type of password','The colour of a cable'],'A connected device such as a computer','Endpoints send or receive data on the network.'],
      ['Which network usually covers the larger area?',['WAN','LAN','One USB cable'],'WAN','A WAN connects networks across towns, countries or greater distances.'],
      ['What does a router decide?',['Where traffic should go between networks','What keys are typed','How loud speakers sound'],'Where traffic should go between networks','Routers forward data toward other networks.'],
      ['What does a switch learn to help deliver local traffic?',['Which devices are connected to its ports','Every user password','The monitor brightness'],'Which devices are connected to its ports','A switch uses device addresses to forward local network traffic.'],
      ['Why might a wired connection be useful?',['It can provide a stable local link','It guarantees every website is true','It removes the need for a network'],'It can provide a stable local link','Network cables can offer reliable connections between devices.'],
      ['What is Wi-Fi?',['A wireless way to join a network','The whole internet','A type of document'],'A wireless way to join a network','Wi-Fi connects devices to a local network without a cable.'],
      ['If one computer cable fails in a star, what usually happens?',['That computer disconnects while others continue','Every network in the world stops','The switch becomes a keyboard'],'That computer disconnects while others continue','Each endpoint has its own link to the central device.'],
      ['Which service translates website names into network addresses?',['DNS','Word','Bluetooth speaker'],'DNS','DNS helps devices find the address associated with a domain name.'],
      ['What are small pieces of network data commonly called?',['Packets','Slides','Cells'],'Packets','Network messages are divided into packets for transmission.'],
      ['Why do networks use rules called protocols?',['So devices communicate in agreed ways','So every device has the same colour','So files never need names'],'So devices communicate in agreed ways','Protocols define how data is formatted, sent and received.']
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
      ['Responsible AI use includes…',['Checking important claims','Sharing private data','Assuming no mistakes'],'Checking important claims','Verification matters because AI can be wrong.'],
      ['What is a prediction in AI?',['A model’s estimated answer','A guaranteed fact','A human password'],'A model’s estimated answer','A prediction is the model’s best estimate based on learned patterns.'],
      ['What can happen when training data misses some groups?',['The system may work unfairly for them','The model becomes perfect','Testing is unnecessary'],'The system may work unfairly for them','Missing representation can lead to uneven performance.'],
      ['Why should test examples be separate from training examples?',['To check performance on new data','To repeat memorised answers','To increase screen brightness'],'To check performance on new data','Separate testing shows how well the model handles unseen examples.'],
      ['An AI answer sounds confident. What does that prove?',['Nothing about whether it is correct','That it must be true','That a human checked it'],'Nothing about whether it is correct','Confident language or a high score is not proof of truth.'],
      ['Which is a responsible way to use an AI image tool?',['Avoid entering private photos without permission','Upload every class photo','Ignore consent'],'Avoid entering private photos without permission','Privacy and consent still matter when using AI tools.'],
      ['What is training data used for?',['Helping a model learn patterns','Charging the computer','Printing every answer'],'Helping a model learn patterns','Models learn statistical relationships from training examples.'],
      ['What is an AI model?',['A system learned from data to make outputs or predictions','A guaranteed source of truth','A human teacher inside a computer'],'A system learned from data to make outputs or predictions','A model applies learned patterns to new inputs.'],
      ['Why can an AI make a mistake on a new example?',['Its learned patterns may not fit that example','Computers cannot use data','Every answer is random'],'Its learned patterns may not fit that example','New situations may differ from the data used for training.'],
      ['What does bias in an AI result mean?',['The result may unfairly favour or disadvantage some groups','The screen is tilted','The model has a personal opinion'],'The result may unfairly favour or disadvantage some groups','Data and design choices can create uneven outcomes.'],
      ['Which person should remain responsible for an important decision?',['A qualified human','The AI alone','An unknown website'],'A qualified human','Human review is important when decisions affect people.'],
      ['What is a good way to verify an AI claim?',['Compare it with reliable independent sources','Ask the AI to repeat it','Judge only by confidence'],'Compare it with reliable independent sources','Independent evidence helps confirm whether a claim is accurate.'],
      ['Should private personal data be pasted into a public AI tool?',['No, unless an approved process clearly permits it','Yes, always','Only if the answer is short'],'No, unless an approved process clearly permits it','Protect personal information and follow approved privacy rules.'],
      ['Why document where AI was used in a project?',['To be transparent about how the work was made','To hide mistakes','To remove human responsibility'],'To be transparent about how the work was made','Transparency helps others understand and evaluate the process.'],
      ['What is human oversight?',['A person reviews and can correct an AI-supported result','The AI checks itself only','Nobody checks the result'],'A person reviews and can correct an AI-supported result','Oversight keeps people responsible for important outcomes.'],
      ['Which dataset is most suitable for recognising many kinds of Ghanaian fruit?',['Varied labelled images of those fruits in different conditions','One image of one fruit','Unrelated pictures without labels'],'Varied labelled images of those fruits in different conditions','Relevant variety helps the model learn features that generalise.']
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
      ['A digital footprint is…',['The trail of online activity','A shoe size','A computer cable'],'The trail of online activity','Posts and actions can leave lasting records.'],
      ['Which message is most likely suspicious?',['“Urgent! Send your password to win”','“Class begins at 10” from your teacher','“Please close the door”'],'“Urgent! Send your password to win”','Urgency, prizes and requests for passwords are common warning signs.'],
      ['What should you do if an online message makes you uncomfortable?',['Tell a trusted adult','Keep it secret','Reply with private details'],'Tell a trusted adult','A trusted adult can help you respond safely.'],
      ['Why should each account use a different password?',['One leak will not unlock every account','It makes passwords shorter','Friends can guess them'],'One leak will not unlock every account','Unique passwords limit the damage if one account is compromised.'],
      ['Which detail is safest to use publicly in this learning app?',['A nickname','A home address','A real password'],'A nickname','A nickname supports learning without revealing unnecessary personal information.'],
      ['What is the safest response to a prize link from an unknown sender?',['Do not open it and ask for help','Open it immediately','Forward it to friends'],'Do not open it and ask for help','Unexpected prize links may be attempts to steal information.'],
      ['What is phishing?',['A trick designed to steal information','A safe way to share passwords','A computer drawing tool'],'A trick designed to steal information','Phishing messages imitate trusted sources to pressure people into revealing data.'],
      ['Which passphrase is generally safer?',['Several unrelated memorable words','123456','Your first name'],'Several unrelated memorable words','A long unique passphrase is harder to guess.'],
      ['What does multi-factor authentication add?',['Another proof of identity','A public password list','A shorter username'],'Another proof of identity','A second factor protects an account even if a password is exposed.'],
      ['What should you do after accidentally sharing a password?',['Tell a trusted adult and change it promptly','Post it again','Ignore it forever'],'Tell a trusted adult and change it promptly','Quick action can reduce the chance of account misuse.'],
      ['Which information can reveal your location?',['A photo showing a street sign near home','A favourite colour','A made-up nickname'],'A photo showing a street sign near home','Background details in photos can reveal where someone is.'],
      ['What should you do with repeated hurtful messages online?',['Save evidence, block or report, and tell a trusted adult','Reply with your password','Meet the sender alone'],'Save evidence, block or report, and tell a trusted adult','Reporting and trusted support are safer than handling harassment alone.'],
      ['Why install trusted security updates?',['They can fix known weaknesses','They make passwords public','They remove all files'],'They can fix known weaknesses','Updates often repair problems that attackers could misuse.'],
      ['Which download is safest?',['One from an approved trusted source','An unknown attachment promising a prize','A file that asks you to disable protection'],'One from an approved trusted source','Trusted sources reduce the risk of harmful files.'],
      ['What is consent when sharing a photo?',['Clear permission from the person or guardian when required','Silence from the person','Posting before asking'],'Clear permission from the person or guardian when required','People should understand and agree before their image is shared.'],
      ['What does “Stop, Think, Check, Ask” help you do?',['Respond safely to uncertain online situations','Create a weak password','Share faster without checking'],'Respond safely to uncertain online situations','The steps create time to examine risk and seek help.']
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
      ['Why use descriptive file names?',['To find work later','To use more storage','To change the font'],'To find work later','Clear names make organising and retrieving work easier.'],
      ['Which Excel formula finds the mean of B2 to B5?',['=AVERAGE(B2:B5)','=SUM(B2:B5)','=MEAN(B2-B5)'],'=AVERAGE(B2:B5)','AVERAGE calculates the arithmetic mean of the selected cells.'],
      ['What makes a document title easy to recognise?',['A larger clear heading','Tiny grey text','No spacing'],'A larger clear heading','A clear heading creates useful visual hierarchy.'],
      ['Which presentation choice improves consistency?',['Use the same fonts and colours throughout','Change every slide style','Use as many fonts as possible'],'Use the same fonts and colours throughout','Consistent design helps the audience follow the message.'],
      ['When should you save your work?',['Regularly while working','Only after closing the app','Never'],'Regularly while working','Saving regularly reduces the chance of losing progress.'],
      ['Which chart is useful for comparing several topic scores?',['Bar or column chart','A text paragraph','A password box'],'Bar or column chart','Bars make differences between category values easy to compare.'],
      ['Which Word feature creates an organised list?',['Bullets or numbering','A spreadsheet formula','Slide transition'],'Bullets or numbering','Lists make related points easier to scan.'],
      ['What does cell B3 mean in Excel?',['Column B, row 3','Book 3, page B','Bar chart number 3'],'Column B, row 3','Cell references combine a column letter and row number.'],
      ['Which formula adds values from A1 through A5?',['=SUM(A1:A5)','=ADD(A1-A5)','=TOTAL(A1)'],'=SUM(A1:A5)','SUM with a colon includes every cell in the range.'],
      ['Why include a chart title?',['To explain what the chart shows','To hide the data','To replace every label'],'To explain what the chart shows','A clear title gives the audience context.'],
      ['What should one presentation slide focus on?',['One clear main idea','Every detail in the project','Several unrelated topics'],'One clear main idea','A focused slide is easier for the audience to understand.'],
      ['Which file extension is commonly used for a PowerPoint presentation?',['.pptx','.xlsx','.txt only'],'.pptx','.pptx is the standard modern PowerPoint presentation format.'],
      ['Which file extension is commonly used for an Excel workbook?',['.xlsx','.docx','.png'],'.xlsx','.xlsx is the standard modern Excel workbook format.'],
      ['What should you do before submitting a document?',['Proofread it and confirm it is saved','Delete the title','Change every font'],'Proofread it and confirm it is saved','A final review catches errors and confirms the correct file is ready.'],
      ['Why organise related files in one clearly named folder?',['They are easier to find and manage','They automatically become public','They no longer need saving'],'They are easier to find and manage','Good organisation reduces lost or confused files.'],
      ['Which visual is most useful in a slide?',['One that supports the message','A random image','A tiny unreadable screenshot'],'One that supports the message','Relevant visuals help explain the slide’s main idea.']
    ])
  }
];

export const modules = foundationModules.map(expandLessons);
export const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
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
