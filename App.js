import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  const handleImageLoadStart = (imageId) => {
    setImageLoadingStates(prev => ({ ...prev, [imageId]: 'loading' }));
  };

  const handleImageLoadEnd = (imageId) => {
    setImageLoadingStates(prev => ({ ...prev, [imageId]: 'loaded' }));
  };

  const handleImageLoadError = (imageId) => {
    setImageLoadingStates(prev => ({ ...prev, [imageId]: 'error' }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('users');
        if (cachedData) {
          setUsers(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get('https://picsum.photos/v2/list');
          const limitedData = response.data.slice(0, 10);
          setUsers(limitedData);
          await AsyncStorage.setItem('users', JSON.stringify(limitedData));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const imageState = imageLoadingStates[item.id] || 'loading';

    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: `https://picsum.photos/id/${item.id}/400/600?blur=1`
          }}
          style={styles.image}
          resizeMode="cover"
          progressiveRenderingEnabled={true}
          onLoadStart={() => handleImageLoadStart(item.id)}
          onLoadEnd={() => handleImageLoadEnd(item.id)}
          onError={() => handleImageLoadError(item.id)}
        />

        {/* Indicador de carregamento da imagem */}
        {imageState === 'loading' && (
          <View style={styles.imageLoadingOverlay}>
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
        )}

        {/* Indicador de erro */}
        {imageState === 'error' && (
          <View style={styles.imageErrorOverlay}>
            <Text style={styles.errorText}>Erro ao carregar</Text>
          </View>
        )}

        <View style={styles.userContainer}>
          <Image
            style={styles.userPlaceholder}
            source={require('./assets/person.png')}
          />
          <Text style={styles.text}>{item.author}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator testID="loading-indicator" size="large" color="#38bdf8" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          bounces={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  list: {
    flexGrow: 1,
  },
  item: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: '90%',
    borderRadius: 0,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    alignContent: 'center',
    bottom: '5%',
    marginLeft: '2%',
    width: '60%',
    height: '10%',
    backgroundColor: '#212121',
    borderRadius: 15,
  },
  userPlaceholder: {
    width: 20,
    height: 22,
    marginRight: 10
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 10,
  },
  imageErrorOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
// ...existing code...