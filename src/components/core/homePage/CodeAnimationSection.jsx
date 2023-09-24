import CodeBlocks from './CodeBlocks';
import { useSelector } from 'react-redux';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function CodeAnimationSection() {

  const { token } = useSelector((state => state.auth));

  return (

    <div className='max-w-[98rem] mx-auto'>

      <CodeBlocks
        position={'flex-row'}
        startHeading={'Unlock your '}
        highlightedHeading={'coding potential'}
        remainingHeading={'with our online courses'}
        para={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
        ctabtn1={{ text: `${token === null ? 'Try it yourself ' : 'Start Coding '}`, linkto: `${token === null ? '/signup' : '/dashboard/enrolled-courses'} ` }}
        ctabtn2={{ text: `${token === null ? 'Learn More' : 'Buy a course'}`, linkto: `${token === null ? '/login' : '/catalog'} ` }}
        codeblock={`import React from 'react';\n\nfunction App() {\n\nreturn (\n\n<div>\n<p>Hello, User</p>\n</div>\n\n);\n\n}\n\nexport default App;`}
        bgGradientColor={'from-[#892be255] to-[#ffa60061]'}
        codeColor={'customGradient'}
      />

      <CodeBlocks
        position={'flex-row-reverse'}
        startHeading={'Start '}
        highlightedHeading={`coding in seconds`}
        remainingHeading={''}
        para={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
        ctabtn1={{ text: 'Continue lesson ', linkto: `${token === null ? '/signup' : '/dashboard/enrolled-courses'} ` }}
        ctabtn2={{ text: 'Learn More', linkto: `${token === null ? '/login' : '/catalog'} ` }}
        codeblock={`const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\nres.send('Home Page!');\n});\n\napp.get('/about', (req, res) => {\nres.send('About Page!');\n});\n\napp.listen(port, () => {\nconsole.log("Server is running!");\n});`}
        bgGradientColor={'from-[#00efef75] to-[#fed13d67]'}
        codeColor={'customGradient2'} />
    </div>

  )
}

export default CodeAnimationSection;
