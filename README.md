BAFO - Bus Assist for Ophthalmologically Treatable Individuals
An Internally Funded Project
Submitted By 
Harish Kumar M V - 3122215001030 (IV Year)
Heera Ethirajan - 3122215001033 (IV Year)


Sanctioned Year: 2022-23 
Academic Year Completed: 2024-25 
Sanctioned Amount: Rs 11,500 
Utilized Amount: Rs 8,292 
COMPUTER SCIENCE AND ENGINEERING 

SSN COLLEGE OF ENGINEERING 
KALAVAKKAM 603110 

August 2024
SSN College of Engineering: Chennai 603110

ABSTRACT

Vision Impairment is a prevalent condition that impacts millions of people in the world. People with vision impairment face challenges even to do simple everyday tasks like getting around in public spaces, managing personal tasks, accessing public services, etc, which can make their life difficult and unsafe. 

Public transportation is an important part of everyday life that enables people to commute to different places effortlessly at a low cost. It connects people to jobs, schools, and essential services. Despite so many advancements in public transportation systems, they are still not completely accessible and inclusive. People who are blind and visually impaired still face many difficulties in using the public transport  such as identifying the bus number or knowing where to get down, etc. 

The proposed system aims to address these issues by helping the visually impaired people use the public transportation system independently and effortlessly. A portable device integrated with a mobile application is developed for this purpose. The device consists of an ESP32 camera that captures real-time video and sends it to a deep learning model, via websocket connection, to detect buses and uses easyOCR to extract bus number from the detected buses. The user provides a voice input of their destination and if the bus is found then the user is again notified using voice output. Additionally, GPS tracks the user’s current location and notifies the user if the destination has arrived. Several models were tested including YOLOv4 tiny, YOLOv7 and YOLOv8 for detecting buses. The YOLOv8 model achieved the highest accuracy of 98.4% in detecting buses.




Most of the existing systems that are developed to assist visually impaired people rely on sensors that need to be installed in every bus. Also, it requires users to manually capture the images and send it to the system which can be inconvenient for the users. The system could be extended to other modes of transportation like trains to make public transport more accessible. It could also include features to help the user detect empty seats in a bus to ensure they can independently use the public transportation. 


CHAPTER 1
INTRODUCTION

Public transportation is an important part of everyday life. It helps people get around easily and reach places that they desire to go. Transport systems have the power to ensure access to urban opportunities, including leisure activities, productive work, and public facilities [1]. In India around 36.5 million people use public transportation everyday which accounts for about 18% percent of the Indian population [2]. India is expected to see a significant growth in the Public Transportation market in the near future. The number of users in India's Public Transportation market is expected to reach 1.20bn users by 2029 [3]. It is a low-cost and efficient way to commute to places and reduces the need to own a personal vehicle. For many people, public transport is not just a convenience but a necessity, that is essential for their independence and overall quality of life.

Ophthalmologically treatable individuals are those people who suffer from eye conditions or diseases that can be managed, corrected, or cured through medical interventions provided by ophthalmologists. These conditions range from common refractive errors to more complex diseases like cataracts, glaucoma, diabetic retinopathy, and age-related macular degeneration. The treatment options may include prescription glasses or contact lenses, medications, surgical procedures, or a combination of these approaches. When individuals do not have access to these treatments they can face significant challenges in their daily lives. Vision plays a crucial role in performing everyday activities such as reading, walking, and navigating their surroundings [4]. There are around 8.1 billion people in the world [5] out of which 295 million people live with moderate to severe visual impairment and 43 million people are blind [6]. 

However, for people who are blind and visually impaired, using public transport could be a significant challenge. For these people, tasks like identifying the bus number, understanding route information or even communicating with the driver or fellow passengers could be a hassle. 
This lack of accessibility to public transportation will require them to be dependent on others for assistance. Inclusivity in public services, especially public transport is very essential to ensure that everyone regardless of their abilities can take part in the society. 
By addressing these challenges, we can build a society where everyone feels respected and included. Inclusivity is not just about providing help, it's about giving people the power to live independently.

To address this problem we have developed a portable device, connected to a mobile application that assists visually impaired people at bus stops. The device notifies the user when the right bus arrives based on their specified destination. The entire process is voice-assisted, delivering a smooth and user-friendly experience using voice commands and feedback. The device also uses GPS to inform the user about the upcoming bus stops along their route which ensures that they don't have to rely on others for information throughout the journey.




















CHAPTER 2
RELATED WORKS

In today's fast-changing world, where improvements and changes are constant, ensuring accessibility for everyone is very important. In the effort to improve accessibility, there are many innovative solutions that have been introduced. These initiatives aim to make public transportation more inclusive and accessible to visually impaired people. This Chapter 2 provides an overview of the existing works and research, showing the key features and benefits of each approach in improving the accessibility of public transportation for the visually impaired individuals.

Hangrong Pan and et al developed a travel assistance system that uses techniques like cascade SVM and image processing methods like histogram of oriented gradients to detect buses. It then uses a scene text detection algorithm to read the bus numbers from the images. It then informs the user the detected bus number via voice output. However, a challenge with this system is that the user needs to capture an image of the bus and send it to the system. This can be difficult because the user might not know when the bus has arrived, making it hard to capture the bus in time [7].

Salvador Martinez-Cruz and et al  developed the Sube app that uses BLE (Bluetooth Low Energy) beacons installed in buses to detect their presence and provide voice output to users. This system does not rely on GPS or require an internet connection, making it more user friendly in terms of connectivity. However, a major disadvantage is the need to install beacons in every bus, which is both costly and a complex task to do [8].



Another notable work developed by J Manikandan and et al, involves a system containing 2 modules: one for the user and one for the bus driver. The user module helps identify the available buses using sensors and notify the user using buzzers. The user then can signal their presence to the bus driver using a toggle switch. Once the bus driver receives the signal, they can send acknowledgement to the user through the buzzer. The system uses Zigbee technology to establish wireless connection and microcontrollers to process the signals. However, this system requires both the user as well as the driver to own a device each equipped with microcontrollers, sensors, and other components which can be expensive [9].

Krupal Jivrajani and et al developed Smart Stick which is an assistive device that has a camera attached to it that captures images of the surroundings and uses deep learning to detect obstacles and objects around the user. It also includes water sensors to detect slippery floors and sends information to the user via bluetooth. The stick also has a speech recognition feature that allows the user to say the destination they want to reach. This stick then converts this information to text and gets relevant information like bus or train numbers that reach this destination from a database and gives the user this information through voice output. Additionally, the stick also tracks the user’s location using GPS, monitors the user’s health using sensors and detects falls or accidents [10].

A system developed by S Bhatlawande and et al  is designed to detect buses and cabs for visually impaired individuals. This work uses five machine learning models - Decision Tree, Random Forest, SVM, Gaussian Naïve Bayes, and KNN  to detect buses and cabs. SIFT is used for feature detection and PCA is used for dimensionality reduction. Once a bus is detected the system gives audio feedback to inform the users. The highest accuracy achieved by the system is 98.1%, using the Random Forest classifier [11].  


Emilia Șipoș and et al developed a system containing 2 modules: one for the user and one for the bus. The user module allows the user to input a four-digit bus number corresponding to the bus they want to board. Once the bus number is entered, a signal is sent to the bus module. Upon receiving the signal the bus module triggers a buzzer and a warning LED to alert the driver that a visually impaired person is waiting to board the bus. The bus module then sends feedback to the user, confirming its arrival. However the system requires the installation of sensors in all buses which can be expensive and complex. Also, the user must know the bus numbers of all routes which can be inconvenient to the passengers [12]. 

A smart bus tracking system for blind and visually impaired that involves AI-powered real time navigation solutions was designed and developed by Saloni Redij and et al. It uses GPS to monitor the buses and provides updates on the estimated arrival time of the buses to the user. The user can input their source and destination through voice commands and the application will suggest all the nearby buses available on their route. It calculates the distance between the user and the bus using Open Route Service API and Flutter Geolocator Plugin. The system also alerts the bus driver if a visually impaired person is waiting to board the bus. However the system completely relies on GPS which can be a problem because GPS signals can be inconsistent which will affect the accuracy of the information provided [13].












                                         CHAPTER 4
WORKFLOW

Figure 2 depicts the basic workflow of this project that starts with the user providing the destination name as voice input through the mobile app. The system then filters the bus numbers corresponding to the given destination. A camera captures real time video and sends it to the deep learning model that detects buses. Once a bus is detected, the bus number from the bus is extracted and matched with the filtered list. If a match is found then the user is notified via voice output. Once the user boards the bus, GPS is used to track the user’s location and notify them when their destination arrives.

CHAPTER 5
ARCHITECTURE


Figure 3 represents the system architecture which is designed to assist visually impaired people to identify buses and notify them through voice output. 

The process begins when the user provides an audio input of the destination name through the mobile app. This speech input is processed to reduce noise and is then converted into text. The system ensures that the input matches a destination in the bus routes database using cosine similarity. The destination name is then sent to the bus number filtration module to retrieve the corresponding bus numbers that reach this destination. 

Next, the ESP32 camera gets activated and starts capturing real time videos of the incoming buses. The captured image frames are sent to the bus detection module which identifies the presence of  bus in them. If a bus is detected then the bus number from the detected bus is extracted. The extracted bus number is then compared with the filtered list of bus numbers and if a match is found then the user is notified via voice output.

Additionally, the mobile’s GPS tracks the current location of the user which is used to calculate the distance between the destination and the user’s location. If the calculated distance is within threshold radius from the destination then the user is informed that the destination has arrived. If not, then this location calculation module is again triggered for every fixed timestamp duration

CHAPTER 6
MODULES INVOLVED

The system comprises several interlinked modules, each performing a specific function and they are as follows,

Speech to Text Convertor 
Bus Route identification and filtration	
Image Capturer and Object Detector
Text Detector and Extractor
Destination matching
GPS Tracker
Text to Voice Convertor

6.1. Speech to Text Convertor:

This module takes user input through voice and converts it to text. Additionally noise from the input data is also filtered to have a clear voice. This processed data is transformed into text using Google Cloud Speech API. Further, to restrict the data to be specific to bus destination names, the converted text is applied for cosine similarity with the existing data of bus routes. By doing so, the bus name with highest relevance can be identified and considered as input to the further modules. Algo1 gives the algorithm for the speech to text conversion.


BEGIN

  INITIALIZE system components
  LOAD bus_routes from database
  SETUP Google Cloud Speech-to-Text API client
  INITIALIZE audio processing tools for noise reduction

  WHILE True DO
    PROMPT user to speak the bus destination name
    CAPTURE voice_input via microphone
    APPLY noise reduction to voice_input
    SET filtered_audio TO noise-reduced voice_input
    CONVERT filtered_audio TO transcribed_text USING Google Cloud Speech-to-Text API
    SET normalized_text TO lowercase and cleaned transcribed_text
    SET best_match TO NULL
    SET highest_similarity TO 0
    FOR EACH route IN bus_routes DO
        SET normalized_route TO lowercase and cleaned route
        SET similarity TO CALCULATE cosine_similarity(normalized_text, normalized_route)
        IF similarity > highest_similarity THEN
            SET highest_similarity TO similarity
            SET best_match TO route
        END IF
    END FOR
    IF highest_similarity > SIMILARITY_THRESHOLD THEN
        SET output TO best_match
    ELSE
        PROMPT user to repeat input
    END IF
    LOG transcribed_text AND output
    PASS output TO next module

  END WHILE

END

FUNCTION cosine_similarity(text1, text2) RETURNS similarity
  SET vector1 TO convert_text_to_vector(text1)
  SET vector2 TO convert_text_to_vector(text2)
  SET dot_product TO compute_dot_product(vector1, vector2)
  SET magnitude1 TO compute_magnitude(vector1)
  SET magnitude2 TO compute_magnitude(vector2)

  IF magnitude1 > 0 AND magnitude2 > 0 THEN
    SET similarity TO dot_product / (magnitude1 * magnitude2)
  ELSE
    SET similarity TO 0
  END IF

  RETURN similarity
END FUNCTION
	Algo1: Speech to Text Conversion Module

6.2. Bus Route identification and filtration

As seen in Algo2, this module gets the input as destination name in the form of text and uses it to identify the corresponding bus route. The proposed system uses the Chennai Bus Route Data from kaggle https://www.kaggle.com/datasets/ekanshgarg1997/chennai-bus-route-data/data.
This dataset is preprocessed to only contain bus stop name and the route id(bus number). By storing this data in Google Firebase repository, the need for external storage could be avoided. Further, this module traverses, searches and then returns the bus route id (bus numbers) that reach the particular destination. The output from this module triggers the image capturer and object detector module and GPS tracker.

BEGIN
  INITIALIZE connection to Google Firebase
  LOAD preprocessed bus stop and route data from Firebase
  SETUP search tools for efficient data retrieval

  WHILE True DO
    PROMPT user to enter the destination name
    RECEIVE destination_name as text input
    SET normalized_destination TO lowercase and cleaned destination_name
    SET matching_routes TO EMPTY LIST
    FOR EACH record IN bus_route_data DO
      IF normalized_destination IS EQUAL TO record.bus_stop_name THEN
        ADD record.route_id TO matching_routes
      END IF
    END FOR
    IF matching_routes IS NOT EMPTY THEN
      SET output TO matching_routes
    ELSE
      SET output TO "No routes found for the specified destination."
    END IF
    DISPLAY output TO user
    LOG destination_name AND output

  END WHILE

END
			Algo2: Bus Route identification and filtration



6.3 Image Capturer and Bus Detector: 

This module captures images of the road and detects buses using a deep-learning-based object detection algorithm, YOLOv8. Algo3 shows the algorithm for this module.

BEGIN
  INITIALIZE connection to Roboflow inference server
  SETUP WebSocket for data transmission
  INITIALIZE ESP32 camera to capture images
  INITIALIZE YOLOv8 model for bus detection

  WHILE True DO
    TURN ON ESP32 2MP camera
    CAPTURE live_video_frames FROM camera
    FOR EACH frame IN live_video_frames DO
        SET processed_frame TO preprocess(frame)
     SET detection_results TO DETECT buses IN processed_frame USING YOLOv8 model
	 If confidence interval>80:
        	Then
SET bounding_boxes TO extract_bounding_boxes(detection_results)
SEND bounding_boxes AND detection_results TO mobile_device     USING WebSocket
	  END IF
    END FOR

  END WHILE

END
Algo3: Image Capturer and Bus Detector

 The image capturer module switches on the 2MP camera of ESP32 and starts to take live video. Image frames from this video are sent to a Custom object detection model developed for identifying buses. Websocket protocol is used to transmit data from ESP32 to mobile. It is not advised to use Http protocol for the same purpose to avoid latency issues. The proposed system uses the YOLOv8 model to detect buses. Furthermore, ficin a threshold of confidence interval greater than 80% shows improvement in the selection of buses by the system. 

Also, for the purpose of building the ML model, 2500 preprocessed bus images were taken from roboflow (https://universe.roboflow.com/test-project-csgdb/bus-route-number-fyp/dataset/26) and were custom annotated bus buses alone. With the help of these images the bus detection model was developed with an accuracy of 98.4. The model is hosted in a roboflow inference server as well, for the purpose to reduce external storage and to avoid latency. The proposed work has also compared the accuracy of other models including YOLOv4 tiny, YOLOv7 and found that YOLOv8 outperforms the others. The bounding region of the detected bus is sent as input to the Text Detector and Extractor module. Figure 4 shows how the bounding box is drawn for the detected bus. Figure 4a represents the input image and Figure 4b shows the output from the model.
Figure 4a: Input image to Bus Detection model        Figure 4b: Output of bounding box  
 for detected bus 
			Figure 4: Output of Image Capturer and Bus Detector Module








6.4. Text Detector and Extractor: 
This module as seen in the Algo4 takes the bounding region of detected bus and uses it for further steps. 


BEGIN

  INITIALIZE EasyOCR for text extraction
  INITIALIZE image cropping and text processing tools

  WHILE True DO
    RECEIVE bounding_boxes AND image_frame FROM ML_Model
    FOR EACH bounding_box IN bounding_boxes DO
      SET cropped_image TO crop_image(image_frame, bounding_box)
      SET extracted_text TO EXTRACT text FROM cropped_image USING EasyOCR
      SET filtered_text TO FILTER extracted_text BASED ON pattern (number OR number followed by alphabet)
      IF filtered_text IS VALID THEN
        LOG filtered_text
        PASS filtered_text TO destination_matching_module
      ELSE
        LOG "No valid bus number detected"
      END IF
    END FOR

  END WHILE

END
		Algo4: Text Detector and Extractor

The image frame is cropped and the text is detected and extracted only from the bus region using EasyOCR. The text extracted is then filtered to follow the pattern of Indian Bus Numbers which is a number or a number followed by an alphabet (e.g., 73, 73A). Further the filtered bus number is sent for destination matching. The Figure 5a shows the input and Figure 5b output after text localisation and extraction.





Figure 5a: Input to perform text extraction             Figure 5b: Output after text 
								    
		Figure 5: Input and output after text extraction using EasyOCR


6.5. Destination Matching: 
The Destination Matching module takes the filtered bus numbers list as input from the Bus Route Identification and Filtration module and the incoming Bus number as input from the Text Detector and Extractor module. This module checks if the detected bus number is present in the list returned by the bus number filtration module. If the bus number is present, then, the Text to Speech Convertor module is triggered to inform the user that the bus going to the destination is arriving through voice output. If the bus number is not present in the list of bus routes then the Image Capturer and Bus Detector module is triggered to ask for the next image frame.The following Algo5 shows the pseudocode for the Destination matching module.






BEGIN
  INITIALIZE Text-to-Speech Convertor
  INITIALIZE Image Capturer and Bus Detector

  WHILE True DO
    RECEIVE filtered_bus_numbers FROM  Bus Route Identification And
    Filtration Module       
    RECEIVE incoming_bus_number FROM TextDetectorAndExtractorModule
    IF incoming_bus_number IS IN filtered_bus_numbers THEN
      NOTIFY user THAT the bus going to the destination is arriving USING
      Text-to-Speech Convertor 
    ELSE
      PROMPT Image Capturer and Bus Detector module TO capture next frame
    END IF
    LOG incoming_bus_number AND filtered_bus_numbers
  END WHILE
END
Algo5: Destination Matching

6.6. GPS Tracker: 
This module helps in continuous tracking of the user until the destination is reached. To perform this function, the inbuilt mobile GPS is used and the current location is sent to the application for further calculations. The application receives the current location for every 5 mins after setting the destination. With the help of current GPS location and the latitude and longitudinal coordinates of the destination which is obtained using Google Maps API, the distance between the current location and the destination is calculated by using haversian distance. So if the distance is less than the fixed threshold of 5 meter radius then the Text to Speech module is prompted to announce that the user has arrived at the destination, else the user is prompted with real-time location updates. The Algo6 provides an idea of how this module is executed.









BEGIN
  INITIALIZE GPS module on the mobile device
  INITIALIZE Google Maps API client
  INITIALIZE threshold_radius TO 5 meters
  SET destination_coordinates TO NULL

  PROMPT user TO input destination
  SET destination_coordinates TO GET latitude and longitude of the destination USING Google Maps API

  WHILE True DO
    WAIT FOR 5 minutes
    SET current_location TO GET current latitude and longitude FROM GPS module
    SET distance_to_destination TO CALCULATE haversine_distance BETWEEN current_location AND destination_coordinates
    IF distance_to_destination < threshold_radius THEN
      SET message TO "You have arrived at your destination."
      PROMPT Text-to-Speech module TO announce message
    ELSE
      SET update_message TO CONCATENATE "Current distance to destination: " AND distance_to_destination AND " meters."
      PROMPT Text-to-Speech module TO announce update_message
    END IF
    LOG current_location AND distance_to_destination

  END WHILE

END

FUNCTION haversine_distance(lat1, lon1, lat2, lon2)
  DECLARE earth_radius TO 6371e3 // Earth radius in meters
  SET phi1 TO lat1 IN radians
  SET phi2 TO lat2 IN radians
  SET delta_phi TO (lat2 - lat1) IN radians
  SET delta_lambda TO (lon2 - lon1) IN radians

  SET a TO SIN(delta_phi / 2) * SIN(delta_phi / 2) +
         COS(phi1) * COS(phi2) * 
         SIN(delta_lambda / 2) * SIN(delta_lambda / 2)
  SET c TO 2 * ATAN2(SQRT(a), SQRT(1 - a))

  SET distance TO earth_radius * c

  RETURN distance
END FUNCTION
Algo6: GPS Tracker

6.7. Text to Speech Converter: 
This module takes input as “Bus detected goes to destination” from the Destination Matching module and the current location and destination reached/not from the GPS Tracker module. 
With these as inputs in the form of text, the module converts the text in the form of speech using the Google Speech Cloud API as shown in the Algo7 and provides the user with alerts and prompts. Furthermore, this module is used to inform the user with audible information about the various interactions that the user performs with the mobile app to increase the usability experience and to provide a sense of guidance. 

BEGIN

  INITIALIZE Google Cloud Text-to-Speech API client

  WHILE True DO
    RECEIVE bus_status_text FROM DestinationMatchingModule
    RECEIVE location_status FROM GPSTrackerModule
    SET combined_text TO CONCATENATE bus_status_text AND location_status
   SET speech_audio TO CONVERT combined_text TO speech USING Google Cloud     Text-to-Speech API
    OUTPUT speech_audio TO user
    LOG combined_text AND speech_audio

  END WHILE

END

Algo7 : Text to Speech Converter




















CHAPTER 7
EXPERIMENTS AND RESULTS

Integration of the various modules provides a seamless and an independent transit for Ophthalmologically treatable individuals. The Figure6 shows the mobile application interface developed using ReactNative. The interface includes easily accessible buttons of larger size and the usage of contrasting and high intensity variation colors make the individual buttons to be clearly visible. The hardware device is made to be handy and portable. As seen in Figure 7, ESP 32 along with its battery is fixed to a cap and this device is connected to the mobile application.

Figure 6: BAFO Mobile Interface




Figure 7: Portable device with ESP32 and its battery 

This project uses a custom annotated and built YOLOv8 bus detection model from a dataset of 2500 preprocessed images. The performance of bus detection models were also compared with YOLOv4 tiny and YOLOv7 and from Table 1 we can infer that there is a significant increase in the model accuracy (mAP) value from using YOLOv4 tiny to YOLOv8.
As the name says, YOLOv4 tiny uses a lesser number of convolution layers to restrict the storage of the model. Also  ESP32 is only compatible with tiny models. But in a system like bus identification, it is not reliable to use such models with very less accuracy of 54%. This will also increase latency. Therefore the proposed model uses YOLOv8 with the highest accuracy of 98.4%. Early stopping techniques were also used for the purpose to avoid model overfitting. It is also to be noted that the YOLOv8 models can be readily hosted in the roboflow inference server and cloud access can be claimed. Usage of cloud model for the purpose of this proposed system breaks another milestone to store a large model in ESP32. This system accesses the ML model directly from the mobile application via API calls. 



Model Name
mAP(Accuracy)
YOLOv4 Tiny
54.6%
YOLOv7
95.3%
YOLOv8
98.4%

			Table 1: Comparison of Bus Detection Model Accuracies

The proposed system uses websocket protocol for transmission of data ESP32 and the mobile application because of the significant decrease in the latency. Usage of HTTP protocol for this application generated a high latency depending upon the internet connectivity ranging from 40 secs to 120 secs. While websocket protocol produces very less latency of 1 sec. But the usage of websocket protocol is restricted to regions of high connectivity only. 











                                                         CHAPTER 8
DISCUSSION 

Many current systems that are available for assisting the visually impaired people use sensors that require to be installed in every bus which can be expensive and difficult to implement on a large scale. Even sensor-free devices require the user to capture images manually which could be inconvenient for the users. Furthermore, most of the solutions use Raspberry Pi for their systems which is expensive and also large in size. Currently there is no single complete application available for assisting the visually impaired people in the process of boarding the bus. Also many of them use GPS to track the bus location which can be inconsistent sometimes and they generally have multiple modules that makes the device very complicated to use.
The proposed system stands out by using an ESP32 camera which makes the device more compact and user friendly to use. Additionally, the model runs in the cloud which not only reduces latency but also eliminates the need for the user to carry heavy hardware devices along with them. The system also uses websocket connection to link the esp32 and the mobile app which further reduces the latency. It also offers a very user friendly mobile application which makes it easier for the user to operate the device.

















CHAPTER 9
FUTURE WORKS
 
The proposed work can be expanded to cover other modes of transportation such as trains to make all types of public transport accessible to blind and visually impaired people. A separate app for the bus drivers can also be developed which will enable them to get notified if a visually impaired person is waiting to board the bus. Additionally the system can include features that help the user find empty seats available in the bus and also help them navigate to the bus stop from their location. Currently the system only includes chennai bus routes in the database .By expanding the database to include bus routes from other cities, the system can extend its accessibility and utility to a broader range of users across different regions. These improvements will make sure that the app enables the user to have a completely independent and hassle free experience while using the public transportation system.






















        CHAPTER 10
CONCLUSION

Public transportation plays a crucial role in daily life, enabling people to commute to different places without the need for owning a private vehicle. However, for visually impaired people using public transport could be a significant challenge. Making public transportation accessible to everyone regardless of their abilities is very important to build an inclusive society. We have developed a product for the ophthalmologically treatable people that enables them to use public transportation on their own without having to be dependent on others. The system uses an esp32 camera, real-time video processing, speech recognition techniques and cloud computing to offer an easy, smooth and user-friendly experience. By addressing the challenges faced by the visually impaired people our project provides a practical and scalable solution that makes public transportation accessible and inclusive.






















CHAPTER 11
BUDGET JUSTIFICATION
  
SNO
ITEM NAME
AMOUNT
1.
ESP32-CAM W-BT Board ESP32-CAM-MB Micro USB to Serial Port CH340G with OV2640 2MP Camera Module Dual Mode Support NodeMCU
3198
2.
TOZO A1 Mini Wireless Earbuds Bluetooth 5.3 in Ear Light-Weight Headphones Built-in Microphone, IPX5 Waterproof, Immersive Premium Sound Long Distance Connection Headset with Charging Case, Pink
2098
3.
LensKandy Cat Eye Zero Power Blue Cut Computer Glasses for Women | Antiglare, Light Weight & Blocks harmful rays | UV Protection Specs | Medium | 2036
939
4.
2 x 18650 Lithium Battery Shield V8 Mobile Power Expansion Board Module 5V/3A 3V/1A Micro USB for Arduino ESP32 ESP8266
1052


5.
Orange ICR 18650 3.7V 2200mAh 2C Li-ion Battery
1005




8292


Amount sanctioned=Rs. 11,500/-
Amount spent=Rs. 8,292/-













CHAPTER 12
REFERENCES

“The most efficient, equitable, and climate-friendly solution for urban mobility”, Institute of transportation and Development Policy, 27-Aug-2024. Available at: https://itdp.org/our-work/public-transport/
Sahu, Sarthak, et al. "India’s public transportation system: the repercussions of COVID-19." Public transport 15.2 (2023): 435-478.
 “Public Transportation - India”, Statista, 29-Aug-2024. Available at: https://www.statista.com/outlook/mmo/shared-mobility/public-transportation/india
“Visual impairment”, Wikipedia, 27-Aug-2024. Available at: https://en.wikipedia.org/wiki/Visual_impairment
“World Population'', Worldometers, 27-Aug-2024. Available at: https://www.worldometers.info/world-population/#google_vignette
“Global Estimates of Vision Loss”, The International Agency for the Prevention of Blindness, 2020. Available : https://www.iapb.org/learn/vision-atlas/magnitude-and-projections/global/.
Pan H, Yi C, Tian Y. A primary travelling assistant system of bus detection and recognition for visually impaired people. In2013 IEEE International Conference on Multimedia and Expo Workshops (ICMEW) 2013 Jul 15 (pp. 1-6). IEEE.
PÉREZ-SOTO GI, BENITEZ-RANGEL JP, CAMARILLO-GÓMEZ KA. An Outdoor Navigation Assistance System for Visually Impaired People in Public Transportation.
Manikandan J, Bharathi J, Gayathri M, Lavanya G. Bus Identification System For Visually Impaired Using Zigbee Technology. In2022 International Conference on Communication, Computing and Internet of Things (IC3IoT) 2022 Mar 10 (pp. 1-5). IEEE.
 Jivrajani K, Patel SK, Parmar C, Surve J, Ahmed K, Bui FM, Al-Zahrani FA. AIoT-based smart stick for visually impaired person. IEEE Transactions on Instrumentation and Measurement. 2022 Dec 9;72:1-1.
 Bhatlawande S, Hegde A, Jain A, Jain N, Shilaskar S, Madake J. Mobility aid for identification of bus and auto-rikshaw for visually challenged people. InAIP Conference Proceedings 2023 Sep 11 (Vol. 2755, No. 1). AIP Publishing.
 Șipoș E, Ciuciu C, Ivanciu L. Sensor-based prototype of a smart assistant for visually impaired people—Preliminary results. Sensors. 2022 Jun 3;22(11):4271.
 Redij S, Rao A, Kumar SA, Jadhav A. Smart Bus Tracking For Blind And Visually Impaired. InITM Web of Conferences 2022 (Vol. 44, p. 02001). EDP Sciences.
“The Road to WebSockets” , Websocket.org, 29-Aug-2024. Available at: https://websocket.org/guides/road-to-websockets/
 Wu T, Dong Y. YOLO-SE: Improved YOLOv8 for remote sensing object detection and recognition. Applied Sciences. 2023 Dec 5;13(24):12977.
Apallius de Vos IM, van den Boogerd GL, Fennema MD, Correia AD. Comparing in context: Improving cosine similarity measures with a metric tensor. arXiv e-prints. 2022 Mar:arXiv-2203.



