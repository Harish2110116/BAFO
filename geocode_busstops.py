import json
import requests

def check_google_maps_api_key(api_key, address):
    url = 'https://maps.googleapis.com/maps/api/geocode/json'
    params = {
        'address': address,
        'key': api_key
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    # Print the response status and debug information
    print(f"Response Status: {data['status']}")
    
    if data['status'] == 'OK':
        try:
            # Extract the latitude and longitude
            location = data['results'][0]['geometry']['location']
            latitude = location['lat']
            longitude = location['lng']
            return latitude, longitude
        except (IndexError, KeyError):
            raise Exception("Error parsing response data.")
    else:
        error_message = data.get('error_message', 'No error message provided')
        raise Exception(f'Geocoding error: {data["status"]} - {error_message}')

def process_bus_stops(api_key, input_file, output_file):
    # Load bus stop names from the input JSON file
    with open(input_file, 'r') as f:
        bus_stops = json.load(f)
    
    results = []
    for stop_name in bus_stops:
        try:
            # Format the address as "bus_stop_name, Chennai"
            address = f"{stop_name}, Chennai"
            print(f"Geocoding: {address}")
            latitude, longitude = check_google_maps_api_key(api_key, address)
            results.append({
                'stop_name': stop_name,
                'latitude': latitude,
                'longitude': longitude
            })
        except Exception as e:
            print(f"Error for stop '{stop_name}': {e}")

    # Save the results to the output JSON file
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=4)

if __name__ == '__main__':
    api_key = 'AIzaSyCYn0RdQs34W_zkM2YnU1XLv1_B3Y6xo3k'  # Replace with your Google Maps API Key
    input_file = 'stop_names.json'  # Replace with your JSON file containing bus stop names
    output_file = 'bus_stops_with_coordinates.json'
    
    process_bus_stops(api_key, input_file, output_file)
