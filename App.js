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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.download_url }} style={styles.image} />
      <View style={styles.userContainer}>
        <Image
          style={styles.userPlaceholder}
          source={require('./assets/person.png')}
        />
        <Text style={styles.text}>{item.author}</Text>
      </View>
    </View>
  );

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
  }
});
// ...existing code...