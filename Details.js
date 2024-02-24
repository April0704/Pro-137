import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";


export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: ``
    };
  }

  componentDidMount() {
      //call getDetails function here so that the data is fetched as soon as the screen is mounted
      this.getDetails();
  }
  getDetails = () => {
      //write the codee to fetch the specific planet's data from the API
      const {url} = this.state;
      axios
        . get(url)
        .then((response) => {
          this.setDetails(response.data.data);

        })
        .catch((error) => {
          Alert.alert(error.message);
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
render() {
  const { details, imagePath } = this.state;
  if (details.specifications) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1, paddingTop: 20 }}
        >
          <Image
            source={imagePath}
            style={{
              height: 250,
              width: 250,
              marginTop: 50,
              alignSelf: "center",
            }}
          />
          <View style={{ marginTop: 50 }}>
            <Text style={styles.planetName}>{details.name}</Text>
            <View style={{ alignSelf: "center" }}>
              <Text
                style={styles.planetData}
              >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.planetData}
              >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.planetData}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.planetData}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.planetData}
              >{`Orbital Speed : ${details.orbital_speed.toFixed(8)}`}</Text>
              <Text
                style={styles.planetData}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.planetData}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={styles.planetData}
              >{`Planet Type : ${details.planet_type}`}</Text>
              <View style={{ flexDirection: "row",alignSelf:"center" }}>
                <Text style={styles.planetData}>
                  {details.specifications ? `Specifications : ` : ""}
                </Text>
                {details.specifications.map((item, index) => (
                  <Text key={index.toString()} style={styles.planetData}>
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  return null;
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
planetName: {
  fontSize: 45,
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 40,
  width: "80%",
  alignSelf: "center",
  fontFamily:"monospace"
},
planetData: {
  fontSize: 15,
  color: "white",
  textAlign:"center",
  fontFamily:"monospace"
},
});
