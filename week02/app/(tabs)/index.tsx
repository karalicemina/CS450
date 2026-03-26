import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  base: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const API_KEY = '505a8a20724e28e91fb629d691b9998d';

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (response.status === 404) {
        setError('City not found');
        setWeather(null);
        return;
      }

      if (!response.ok) {
        setError('Something went wrong');
        setWeather(null);
        return;
      }

      setWeather(data);
      setError('');
    } catch (err) {
      setError('Network error');
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Enter city name and press search button
      </Text>

      <TextInput
        placeholder="Enter city name..."
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={getWeather}>
        <Text style={styles.searchButtonText}>SEARCH</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.cityText}>
            {weather.name} {weather.sys.country}
          </Text>

          <Text style={styles.stationText}>{weather.base}</Text>

          <Text style={styles.tempText}>
            {Math.round(weather.main.temp)}°C
          </Text>

          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
            }}
            style={styles.icon}
          />

          <Text style={styles.descriptionText}>
            {weather.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe3cf',
    padding: 20,
    paddingTop: 80,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2f9cf4',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f4f7f4',
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  cityText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  stationText: {
    fontSize: 18,
    color: '#444',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  tempText: {
    fontSize: 54,
    fontWeight: '300',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});