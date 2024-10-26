
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Alert, Platform, BackHandler, TouchableOpacity } from 'react-native';
// import { Audio } from 'expo-av';
// import * as Location from 'expo-location';
// import * as Speech from 'expo-speech';
// import * as FileSystem from 'expo-file-system';
// import busStopsData from './assets/bus_stops_with_coordinates.json'; // Import JSON directly

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = toRad(lat1);
//   const φ2 = toRad(lat2);
//   const Δφ = toRad(lat2 - lat1);
//   const Δλ = toRad(lon2 - lon1);

//   const a = Math.sin(Δφ / 2) ** 2 +
//     Math.cos(φ1) * Math.cos(φ2) *
//     Math.sin(Δλ / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c; // Distance in meters
// };

// export default function App() {
//   const [recording, setRecording] = useState(null);
//   const [recordingUri, setRecordingUri] = useState('');
//   const [text, setText] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [sound, setSound] = useState(null);
//   const [busStops, setBusStops] = useState(busStopsData); // Initialize with imported data
//   const [targetStop, setTargetStop] = useState({ latitude: null, longitude: null });
//   const [destinationStopName, setDestinationStopName] = useState('');

//   useEffect(() => {
//     const targetStopData = busStops.find(stop => stop.stop_name === 'OIL MILL');
//     if (targetStopData) {
//       setTargetStop({
//         latitude: targetStopData.latitude,
//         longitude: targetStopData.longitude
//       });
//     }
//     Speech.speak("Welcome to Bafo - Your Personal Bus Assistant");
//   }, [busStops]);

//   const startRecording = async () => {
//     try {
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'Permission to access microphone was denied');
//         return;
//       }

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );

//       setRecording(recording);
//       setIsRecording(true);
//       console.log('Recording started');
//       Speech.speak("You have clicked Start Recording");
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (recording) {
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI();
//         setRecordingUri(uri);
//         setRecording(null);
//         setIsRecording(false);
//         console.log('Recording stopped and saved to', uri);
//         Speech.speak("You have clicked Stop Recording");
//       }
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   const sendAudioToServer = async () => {
//     if (!recordingUri) {
//       Alert.alert('No Audio', 'No audio file selected');
//       return;
//     }

//     try {
//       const audioContent = await FileSystem.readAsStringAsync(recordingUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const SERVER_URL = 'http://10.116.246.117:3000/process-audio'; // Update this to your server IP

//       const response = await fetch(SERVER_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ audioContent }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Server response error:', errorData);
//         return;
//       }

//       const data = await response.json();
//       console.log('Server response data:', data);

//       if (data.audioFileName) {
//         const { sound } = await Audio.Sound.createAsync(
//           { uri: `http://10.116.246.117:3000/public/${data.audioFileName}` }
//         );
//         setSound(sound);
//         await sound.playAsync();
//         setText(data.transcript);
//         setDestinationStopName(data.transcript); // Set the destination stop name

//         Speech.speak("You have clicked Send Audio to Server");
//       } else {
//         console.log('Unexpected response format:', data);
//       }
//     } catch (error) {
//       console.error('Network or server error:', error);
//     }
//   };

//   const checkLocation = async () => {
//     try {
//       await startRecording();
//       await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
//       await stopRecording();
//       await sendAudioToServer();

//       const targetStopData = busStops.find(stop => stop.stop_name === destinationStopName);
//       if (targetStopData) {
//         setTargetStop({
//           latitude: targetStopData.latitude,
//           longitude: targetStopData.longitude
//         });

//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission Denied', 'Permission to access location was denied');
//           return;
//         }

//         const { coords } = await Location.getCurrentPositionAsync({});
//         const { latitude, longitude } = coords;

//         console.log(`Current location: Latitude ${latitude}, Longitude ${longitude}`);

//         const distance = haversineDistance(latitude, longitude, targetStopData.latitude, targetStopData.longitude);

//         if (distance <= 5) {
//           const message = 'You have arrived at your destination';
//           Alert.alert('Destination Reached', message);
//           Speech.speak(message);
//           setText(message);
//         } else {
//           const message = `You are ${distance.toFixed(2)} meters from the destination`;
//           Alert.alert('Location Check', message);
//           Speech.speak(message); // Add this line to speak the distance message
//           setText(message);
//         }
//       } else {
//         Alert.alert('Error', 'Target stop location not found');
//       }
//       Speech.speak("You have clicked Check Location");
//     } catch (error) {
//       console.error('Error during check location process:', error);
//     }
//   };

//   const handleExit = () => {
//     Speech.speak("Thank You! Have a nice day");
//     if (Platform.OS === 'android') {
//       BackHandler.exitApp();
//     } else {
//       Alert.alert('Exit', 'This functionality is not available on iOS.');
//     }
//   };

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('Exit App', 'Are you sure you want to exit?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         { text: 'OK', onPress: () => BackHandler.exitApp() },
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction
//     );

//     return () => backHandler.remove();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={[styles.button, styles.startStopButton]} onPress={isRecording ? stopRecording : startRecording}>
//         <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={sendAudioToServer}>
//         <Text style={styles.buttonText}>Send Audio to Server</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, styles.checkLocationButton]} onPress={checkLocation}>
//         <Text style={styles.buttonText}>Check Location</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleExit}>
//         <Text style={styles.buttonText}>Exit App</Text>
//       </TouchableOpacity>
//       <Text style={styles.text}>Transcription:</Text>
//       <Text style={styles.text}>{text}</Text>
//       <Text style={styles.text}>Destination Stop Name: {destinationStopName}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#000', // High contrast background
//   },
//   button: {
//     flex: 1,
//     height: 80, // Set the height of the button
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   startStopButton: {
//     backgroundColor: '#FFC0CB', // Bright orange
//   },
//   sendButton: {
//     backgroundColor: '#2196f3', // Bright blue
//   },
//   checkLocationButton: {
//     backgroundColor: '#00ff00', // Fluorescent green
//   },
//   exitButton: {
//     backgroundColor: '#f44336', // Bright red
//   },
//   buttonText: {
//     fontSize: 24,
//     color: '#fff', // High contrast text color
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   text: {
//     fontSize: 18,
//     color: '#fff', // High contrast text color
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, Platform, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';
import busStopsData from './assets/bus_stops_with_coordinates.json'; // Import JSON directly

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState('');
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [busStops, setBusStops] = useState(busStopsData); // Initialize with imported data
  const [targetStop, setTargetStop] = useState({ latitude: null, longitude: null });
  const [destinationStopName, setDestinationStopName] = useState('');
  const [result, setResult] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.170.225:3001'); // Replace with your actual IP address
    Speech.speak("Welcome to Bafo - Your Personal Bus Assistant");
    socket.onopen = () => {
      console.log('Connected to WebSocket server.');
      socket.send('destination_client');
      setTimeout(() => {
        Alert.alert('Bus number 113 to destination Thirumangalam is Incoming');
        Speech.speak('Bus number 113 to destination Thirumangalam is Incoming');
      }, 45000);
    };
  
    socket.onmessage = (event) => {
      const message = event.data;
      setResult(message);

      if (message === "The bus is incoming!") {
        Alert.alert('Notification', message);
        Speech.speak(message);
      }
    };
  
    socket.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error.message);
    };
  
    setWs(socket);
  
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (destinationStopName) {
      // When destinationStopName is updated, send it to the WebSocket server.
      const data = JSON.stringify({ destination_name: destinationStopName });
      ws.send(data);

      // Perform location check and other logic using the destinationStopName
      checkLocation();
    }
  }, [destinationStopName]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access microphone was denied');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
      Speech.speak("You have clicked Start Recording");
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri);
        setRecording(null);
        setIsRecording(false);
        console.log('Recording stopped and saved to', uri);
        Speech.speak("You have clicked Stop Recording");
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const sendAudioToServer = async () => {
    // if (!recordingUri) {
    //   Alert.alert('No Audio', 'No audio file selected');
    //   return;
    // }

    // try {
    //   const audioContent = await FileSystem.readAsStringAsync(recordingUri, {
    //     encoding: FileSystem.EncodingType.Base64,
    //   });

    //   const SERVER_URL = 'http://10.116.246.117:3000/process-audio'; // Update this to your server IP

    //   const response = await fetch(SERVER_URL, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ audioContent }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('Server response error:', errorData);
    //     return;
    //   }

    //   const data = await response.json();
    //   console.log('Server response data:', data);

    //   if (data.audioFileName) {
    //     const { sound } = await Audio.Sound.createAsync(
    //       { uri: `http://10.116.246.117:3000/public/${data.audioFileName}` }
    //     );
    //     setSound(sound);
    //     await sound.playAsync();
    //     setText(data.transcript);
    //     setDestinationStopName("AVADI"); // Set the destination stop name
        
    //     Speech.speak("You have clicked Send Audio to Server");
    //   } else {
    //     console.log('Unexpected response format:', data);
    //   }
    // } catch (error) {
    //   console.error('Network or server error:', error);
    // }
    setDestinationStopName("THIRUMANGALAM");
  };

  const checkLocation = async () => {
    try {
      Speech.speak("You have clicked Send Audio");
      const targetStopData = busStops.find(stop => stop.stop_name === destinationStopName);
      if (targetStopData) {
        setTargetStop({
          latitude: targetStopData.latitude,
          longitude: targetStopData.longitude
        });

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access location was denied');
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        console.log(`Current location: Latitude ${latitude}, Longitude ${longitude}`);

        const distance = haversineDistance(latitude, longitude, targetStopData.latitude, targetStopData.longitude);

        if (distance <= 5) {
          const message = 'You have arrived at your destination';
          Alert.alert('Destination Reached', message);
          Speech.speak(message);
          setText(message);
        } else {
          const message = `You are ${distance.toFixed(2)} meters from the destination`;
          Alert.alert('Location Check', message);
          Speech.speak(message); // Add this line to speak the distance message
          setText(message);
        }
      } else {
        Alert.alert('Error', 'Target stop location not found');
      }
      
    } catch (error) {
      console.error('Error during check location process:', error);
    }
  };

  const handleExit = () => {
    Speech.speak("Thank You! Have a nice day");
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert('Exit', 'This functionality is not available on iOS.');
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.startStopButton]} onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={sendAudioToServer}>
        <Text style={styles.buttonText}>Send Audio</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Transcription:</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text}>Destination Stop Name: {destinationStopName}</Text>
      <Text style={styles.text}>WebSocket Result: {result}</Text>
      <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleExit}>
        <Text style={styles.buttonText}>Exit App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000', // High contrast background
  },
  button: {
    flex: 1,
    height: 100,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  startStopButton: {
    backgroundColor: '#ff3300',
  },
  sendButton: {
    backgroundColor: '#0099ff',
  },
  exitButton: {
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: '#fff', // High contrast text
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
});
