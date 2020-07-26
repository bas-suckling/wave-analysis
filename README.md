# Wave Analysis

### First crack at analysing garmin GPS (.gpx) data for surf sessions.

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

- Convert gpx (xml) to json format for trackpoints

### Thresholds for Activities based on Speed
| Speed (km/h) | Activity |
| ------------- | ------------- |
| 1–4 | Slow-mod slow paddling |
| 4.1–8 | Moderate speed/very high–intensity paddling |
| 8.1+ | Surfing |

###### Thresholds based on:
http://fpt.co.nz/wp-content/uploads/2018/06/Physiological_Demands_of_Competitive_Surfing.20.pdf


### Data Presentation

Graphs / charts could be made using chartist.js: 

https://gionkunz.github.io/chartist-js/