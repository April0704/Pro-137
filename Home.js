import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      imagePath: "",
      url: "",
    };
  }

  componentDidMount() {
    //call getPlanets function here so that the data is fetched as soon as the screen is mounted
    this.getPlanets();
  }

  getPlanets = () => {
    //write the codee to fetch the planet data from the API
    const {url} = this.state;
    axios
     .get(url)
     .then((response) =>{
      this.setState({
        listData : response.data.data,
      });
     })
     .catch((error)=>{
      alert.alert(error.message);
     });
  };



  /*this function will determine the imagePath state depending on the planetType*/
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  /*this function will be used in the flatlist. You need to complete this function by observing the data*/
  render() {
    const { listData } = this.state;

    if (listData.length != 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
            <View style={styles.upperContainer}>
              <Text style={styles.headerText}>Planets World</Text>
            </View>
            <View style={styles.lowerContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.listData}
                renderItem={this.renderItem}
                numColumns={2}
              />
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1, paddingTop: 20 }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={styles.headerText}>Loading...</Text>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "monospace",
    textAlign: "center",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
  listItem: {
    padding: 15,
    margin: "2.5%",
    width: "45%",
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  cardImage:{
    width: 100,
    height: 100,
    paddingTop: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  nameCardPlanet:{
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  }
});