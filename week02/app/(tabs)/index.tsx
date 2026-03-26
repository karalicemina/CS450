import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

type WeatherCache = {
  [city: string]: WeatherData;
};

const STORAGE_KEY = 'weather_cache';
const API_KEY = '505a8a20724e28e91fb629d691b9998d';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [cache, setCache] = useState<WeatherCache>({});
  const [loading, setLoading] = useState(false);
  const [sourceMessage, setSourceMessage] = useState('');

  useEffect(() => {
    loadCachedWeather();
  }, []);

  const loadCachedWeather = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        const parsedCache: WeatherCache = JSON.parse(storedData);
        setCache(parsedCache);
      }
    } catch (err) {
      console.log('Error loading cache:', err);
    }
  };

  const saveCache = async (newCache: WeatherCache) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCache));
      setCache(newCache);
    } catch (err) {
      console.log('Error saving cache:', err);
    }
  };

  const getWeather = async () => {
    const normalizedCity = city.trim().toLowerCase();

    if (normalizedCity === '') {
      setError('Please enter a city name');
      setWeather(null);
      setSourceMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setSourceMessage('');

    try {
      if (cache[normalizedCity]) {
        setWeather(cache[normalizedCity]);
        setSourceMessage('Loaded from saved data');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (response.status === 404) {
        setError('City not found');
        setWeather(null);
        setSourceMessage('');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        setWeather(null);
        setSourceMessage('');
        setLoading(false);
        return;
      }

      const weatherData: WeatherData = {
        name: data.name,
        sys: {
          country: data.sys.country,
        },
        base: data.base,
        main: {
          temp: data.main.temp,
        },
        weather: [
          {
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          },
        ],
      };

      setWeather(weatherData);
      setSourceMessage('Loaded from API');

      const updatedCache = {
        ...cache,
        [normalizedCity]: weatherData,
      };

      await saveCache(updatedCache);
    } catch (err) {
      setError('Network error');
      setWeather(null);
      setSourceMessage('');
    } finally {
      setLoading(false);
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

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {sourceMessage ? (
        <Text style={styles.sourceMessage}>{sourceMessage}</Text>
      ) : null}

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
  loader: {
    marginTop: 10,
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
  sourceMessage: {
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
    fontSize: 14,
  },
});