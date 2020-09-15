# Wave Analysis - Analysing GPS (.gpx) data for surf sessions.

TO DO LIST :

- redux / context provider
- timeline component

- postgres database
    - knex or sequelize
    - postGIS
- authentication with passport.js

- optimise front end for mobile / tablet

- test suite

- file uploader
- integration with Garmin or Strava

### Usage
Clone repo to your local machine
Navigate to the `wave analysis` directory
At the command line type: `npm install` 
Run the application using `npm run dev` and navigate to http://localhost:3000/

### Create/update data files
- add a gpx file to the data directory "sever/data/rawData/[fileName.gpx]
- Update input ref ( the directory refs in wave 'sever/dataFunctions/index.js' ????)
- At the command line (from the sever/data/dataFunctions dir) type: `node index.js
    
 NB at current stage of development
 - Filename must be in format YYYY-MM-DD.gpx
 - only accepts 1 session perday 

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


### Thresholds for Activities based on Speed
| Speed (km/h) | Activity |
| ------------- | ------------- |
| 1–4 | Slow-mod slow paddling |
| 4.1–8 | Moderate speed/very high–intensity paddling |
| 8.1+ | Surfing |

based on:
http://fpt.co.nz/wp-content/uploads/2018/06/Physiological_Demands_of_Competitive_Surfing.20.pdf
