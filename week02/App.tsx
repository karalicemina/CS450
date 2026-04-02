import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '505a8a20724e28e91fb629d691b9998d'; 

  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = async () => {
    const data = await AsyncStorage.getItem('weather');
    if (data) {
      setWeather(JSON.parse(data));
    }
  };

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 404) {
        setError('City not found');
        setWeather(null);
        setLoading(false);
        return;
      }

      const data = await response.json();

      setWeather(data);

      // save u local storage
      await AsyncStorage.setItem('weather', JSON.stringify(data));

    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>
            {weather.name}, {weather.sys.country}
          </Text>

          <Text style={styles.temp}>
            {weather.main.temp}°C
          </Text>

          <Text>{weather.weather[0].description}</Text>

          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
            }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  card: {
    marginTop: 20,
    alignItems: 'center'
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  temp: {
    fontSize: 30
  }
});