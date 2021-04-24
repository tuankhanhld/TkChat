import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Mixins } from "./src/shared/styles"

export class App extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.textTitle}>FIND SEAT</Text>
      </View>
    )
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  textTitle: {
    fontSize: Mixins.scaleFont(30)
  }
})