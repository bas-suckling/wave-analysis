# Wave Analysis - Analysing GPS (.gpx) data for surf sessions.

### Usage
Clone repo to your local machine

At the command line type: `npm install` 

To create data files, add a gpx file to the data directory and update the directory refs in index.js 

At the command line type: `node index.js`

To check out the data displayed for an example session, run the server using `npm run dev` and navigate to http://localhost:3000/

### Data to output
Session Data:
 - Number of waves
 - Distance surfed
 - Distance Paddled
 - Fastest Speed
 - Total time surfing
 - Average paddle speed
 - Average surf speed

Specific Wave Data:
- Distance surfed
- Max speed

### Analysis Methods

- Convert gpx (xml) to RAW json format 
- Convert RAW json format to processed json using [geolib](https://www.npmjs.com/package/geolib) functions
- Import JSON to excel and play with the data, design algorithms based on this. 

Need to figure out data smoothening method such as [Kalman Filter](https://en.wikipedia.org/wiki/Kalman_filter)

### Thresholds for Activities based on Speed
| Speed (km/h) | Activity |
| ------------- | ------------- |
| 1–4 | Slow-mod slow paddling |
| 4.1–8 | Moderate speed/very high–intensity paddling |
| 8.1+ | Surfing |

###### Thresholds based on:
http://fpt.co.nz/wp-content/uploads/2018/06/Physiological_Demands_of_Competitive_Surfing.20.pdf


### Data Presentation

Graphs / charts could be made using [chartist.js](https://www.npmjs.com/package/react-chartist)
