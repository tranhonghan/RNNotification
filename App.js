import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {notificationManager} from './src/NotificationManager'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.localNotify = null
    this.senderID = "633113694883"
  }

  componentDidMount() {
    this.localNotify = notificationManager
    this.localNotify.configure(this.onRegister, this.onNotification, 
      this.onOpenNotification, this.senderID)
  }

  onRegister(token) {
    console.log("[Notification] Registered: ", token)
  }

  onNotification(notify) {
    console.log("[Notification] onNotification: ", notify)
  }

  onOpenNotification (notify) {
    console.log("[Notification] onOpenNotification: ", notify)
    alert("Open Notification" + notify.title)
  }

  onPressCancelNotification = () => {
    this.localNotify.cancelAllLocalNotification()
  }

  onPressSendNotification = () => {
    const options = {
        soundName: 'default',//'notification1.mp3', 
        playSound: true,
        vibrate: true
    }

    this.localNotify.showNotification(
      1,
      "App Notification",
      "Local Notification",
      {}, // data
      options // options
    )
  }

  render() {
    let {container, button} = styles
    return(
      <View style={container}>
        <TouchableOpacity
          style={button}
          onPress={this.onPressSendNotification}
        >
          <Text> Send notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={button}
          onPress={this.onPressCancelNotification}
        >
          <Text> Cancel notification</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
})