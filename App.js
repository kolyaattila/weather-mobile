import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTemperatureHigh, faTemperatureLow, faWind, faUmbrella } from '@fortawesome/free-solid-svg-icons'

// Utils
import { getWeather,getCelsius } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

// Search component
import SearchInput from './SearchInput';

// MomentJS
import moment from 'moment';

// CLASS
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // bind SCOPE
    this.handleDate = this.handleDate.bind(this);

    // STATE
    this.state = {
      loading: false,
      error: false,

      location: '',
      temperature: 0,
      icon: '',
      weather: '',
      created: '2000-01-01T00:00:00.000000Z'
    };

  }
  // Life cycle
  componentDidMount() {
    this.handleUpdateLocation('Oradea');
  }

  // Parse of date
  handleDate = date => moment(date).format("hh:mm:ss");

  // Update current location
  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {

        // const ID = await getLocationId(city);
        const { location, icon, temperature, weather, DATA } = await getWeather(city);

        this.setState({
          loading: false,
          error: false,
          location,
          icon,
          weather,
          temperature,
          DATA
        });


      } catch (e) {

        this.setState({
          loading: false,
          error: true,
        });

      }
    });
  };

  // RENDERING
  render() {

    // GET values of state
    const { loading, error, location, icon, temperature, weather, DATA } = this.state;

    function Item({ item, index, parentFlatList }) {
      return (
        <View style={styles.item}>
          <View>
            <Text style={[styles.smallText, styles.textStyle]}>
            {
              moment.unix(item.dt).calendar(null, {
                lastDay: "[Yesterday]",
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                lastWeek: "[last] dddd",
                nextWeek: "dddd",
                sameElse: "L"
              })
            }
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <Image source={{uri: 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'}} style={{width: 80, height: 80}} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.smallText, styles.textStyle]}>{`${getCelsius(item.temp.max)}°C`}</Text>
            <FontAwesomeIcon icon={ faTemperatureHigh } style={ styles.icon} size={13}  />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.smallText, styles.textStyle]}>{`${getCelsius(item.temp.min)}°C`}</Text>
            <FontAwesomeIcon icon={ faTemperatureLow } style={ styles.icon } size={13}  />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.smallText, styles.textStyle]}>{item.clouds}%</Text>
            <FontAwesomeIcon icon={faUmbrella} style={ styles.icon } size={13}  />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.smallText, styles.textStyle]}>{item.speed} km/h</Text>
            <FontAwesomeIcon icon={faWind} style={ styles.icon } size={13} />
          </View>
        </View>
      );
    }
    

    // Activity
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >

          <View style={styles.detailsContainer}>

            <View style={styles.logo}>
              <Text style={styles.logoText}>the.weather</Text>
            </View>

            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    😞 Could not load your city or weather. Please try again later...
                  </Text>
                )}
                {!error && (
                  <View>
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                      <Image source={{uri: 'http://openweathermap.org/img/wn/' + icon + '.png'}} style={{width: 100, height: 100}} />
                    </View>
                    <Text style={[styles.smallText, styles.textStyle]}>
                       {location}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${temperature}°C`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
            {!loading && (
              <View>
                {!error && (
                  <View style={[{justifyContent: 'flex-end'}]}> 

                  <FlatList
                    data={DATA}
                    horizontal={true}
                    renderItem={({ item, index }) => <Item item={item} index={index} parentFlatList={this} />}
                    keyExtractor={item => item.weather[0].id}>
                  
                  
                  </FlatList>
                  
                  </View>
                )}
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

/* StyleSheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,

  },
  smallText: {
    fontSize: 15,
  },
  logo: {
    fontSize: 44,
    color: 'white',
    marginTop: 50,   
    marginLeft:50,
    marginBottom:50,
  },
  logoText : {
    fontSize: 20,
    color: 'white',
    fontFamily: "sans-serif-medium"
  },
  item: {
    flexDirection:'column',
    marginTop:50,
    margin: 10,
    width:120,
    borderRadius:10,
    borderWidth:1,
    borderColor:'gray',
    margin:4,
    alignItems:'center',
    padding:10
  },
  icon: {
    color:'white',
    margin:5
  }
});
