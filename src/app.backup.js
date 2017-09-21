/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  Button
} from "react-native";

import SlidingDownPanel from "./SlidingDownPanel";

const { height } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  panel: {
    flex: 1,
    position: "relative"
  },
  content: {
    backgroundColor: "#ff0",
    height: 250
  },
  panelHeader: {
    height: 60,
    backgroundColor: "#b197fc",
    alignItems: "center",
    justifyContent: "center"
  },
  favoriteIcon: {
    position: "absolute",
    top: -24,
    right: 24,
    backgroundColor: "#2b8a3e",
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
};

class App extends React.Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 120
    }
  };

  state = {
    visible: false
  };

  _draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);

    // this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this);
  }

  // _renderFavoriteIcon() {
  //   const {top, bottom} = this.props.draggableRange
  //   const draggedValue = this._draggedValue.interpolate({
  //     inputRange: [-(top + bottom) / 2, -bottom],
  //     outputRange: [0, 1],
  //     extrapolate: 'clamp'
  //   })
  //
  //   const transform = [{scale: draggedValue}]
  //
  //   return (
  //     <Animated.View style={[styles.favoriteIcon, {transform}]}>
  //       <Image source={require('./favorite_white.png')} style={{width: 32, height: 32}} />
  //     </Animated.View>
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Hello world</Text>
          <Button
            title="Toggle"
            onPress={() => this.setState({ visible: !this.state.visible })}
          />
          <SlidingDownPanel
            visible={this.state.visible}
            showBackdrop={false}
            ref={c => {
              this._panel = c;
            }}
            draggableRange={this.props.draggableRange}
            onDrag={v => this._draggedValue.setValue(v)}
          >
            <View style={styles.panel}>
              {/* {this._renderFavoriteIcon()} */}
              <View style={styles.content}>
                <Text>Bottom Sheet Content</Text>
              </View>
              <View style={styles.panelHeader}>
                <Text style={{ color: "#FFF" }}>Bottom Sheet Peek</Text>
              </View>
            </View>
          </SlidingDownPanel>
        </View>
      </View>
    );
  }
}

export default App;
