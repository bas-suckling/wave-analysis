# Wave Analysis - Analysing GPS (.gpx) data for surf sessions.

todo...
- database
    - session select
    - user meta data 
- timeline
    - redux / context provider

- react hooks? (learn)

- refactor segment




### Usage
Clone repo to your local machine

enter the `wave analysis` directory
At the command line type: `npm install` 

    To create/update data files,,, 
    -add a gpx file to the data directory "sever/data/rawData/[fileName.gpx]
    - NB at current stage of devel...
    - - Filename must be of from YYYY-MM-DD
    - - only accepts 1 session perday 
    -update input ref ( the directory refs in wave 'sever/dataFunctions/index.js' ????)
    -At the command line (from the sever/data/dataFunctions dir) type: `node index.js`

To check out the data displayed for an example session, run the server using `npm run dev` and navigate to http://localhost:3000/

### Data to output
Session Data:
 - Number of waves          [done]
 - Distance surfed          [done] 
 - Distance Paddled         [done]
 - Fastest Speed            [x]
 - Total time surfing       [X]
 - Average paddle speed     [X]
 - Average surf speed       [x]

Specific Wave Data:
- Distance surfed           [done]
- Max speed                 [x]

### Analysis Methods

- Read gpx (xml) 
- Process data - [geolib](https://www.npmjs.com/package/geolib) functions
- Output data to json format 


### Thresholds for Activities based on Speed
| Speed (km/h) | Activity |
| ------------- | ------------- |
| 1–4 | Slow-mod slow paddling |
| 4.1–8 | Moderate speed/very high–intensity paddling |
| 8.1+ | Surfing |

based on:
http://fpt.co.nz/wp-content/uploads/2018/06/Physiological_Demands_of_Competitive_Surfing.20.pdf


### Data Presentation

Graphs / charts could be made using [chartist.js](https://www.npmjs.com/package/react-chartist)

### Application Architecture
https://miro.com/app/board/o9J_koaQuQQ=/
