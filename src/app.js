import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  PanResponder,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";

const MIN_SWIPE_SPEED = 0.3;
const MIN_PAN_DISTANCE = 100.0;
const SWIPER_HEIGHT = 200;
const TOP_VALUE_CLOSED = SWIPER_HEIGHT;
const TOP_VALUE_OPEN = 0;

const { width } = Dimensions.get("window");

class App extends Component {
  state: State = {
    isOpen: false
  };
  top = new Animated.Value(0);
  _panResponder = {};
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return false;
      },
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const { dy, vx, vy } = gestureState;
        return Math.abs(dy) > 10 || Math.abs(vy) > Math.abs(vx) + 0.3;
      },
      onPanResponderMove: (event, gestureState) => {
        this._updateDashboardViewNativeStyle(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        let shouldToggle = false;
        if (this.state.isOpen) {
          if (
            gestureState.dy < MIN_PAN_DISTANCE ||
            gestureState.vy > MIN_SWIPE_SPEED
          ) {
            shouldToggle = true;
          }
        } else {
          if (
            gestureState.dy > -MIN_PAN_DISTANCE ||
            gestureState.vy < -MIN_SWIPE_SPEED
          ) {
            shouldToggle = true;
          }
        }
        if (shouldToggle) {
          LayoutAnimation.easeInEaseOut();
          this.setState({ isOpen: !this.state.isOpen });
        } else {
          LayoutAnimation.easeInEaseOut();
          this._updateDashboardViewNativeStyle(0);
        }
      },
      onPanResponderTerminate: () => {
        LayoutAnimation.easeInEaseOut();
        this._updateDashboardViewNativeStyle(0);
      }
    });
  }
  _calculateDashboardViewStyle(dy: number) {
    let top = this.state.isOpen ? TOP_VALUE_CLOSED : TOP_VALUE_OPEN;
    top += dy;

    if (top > TOP_VALUE_CLOSED) {
      top = TOP_VALUE_CLOSED;
    } else if (top < TOP_VALUE_OPEN) {
      top = TOP_VALUE_OPEN;
    }

    this.top.setValue(top);
    // if (top > TOP_VALUE_CLOSED) {
    //   top = TOP_VALUE_CLOSED;
    // }
    return {
      position: "absolute",
      left: 0,
      right: 0,
      backgroundColor: "transparent",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      top: top - TOP_VALUE_CLOSED,
      justifyContent: "flex-end"
    };
  }
  _updateDashboardViewNativeStyle(dy: number) {
    this.refs.dashboard.setNativeProps({
      style: this._calculateDashboardViewStyle(dy)
    });
  }

  render() {
    let dashboardViewStyle = this._calculateDashboardViewStyle(0);
    const toolsOpacity = this.top.interpolate({
      inputRange: [TOP_VALUE_OPEN, TOP_VALUE_CLOSED],
      outputRange: [0, 1]
    });
    const arrowRotate = this.top.interpolate({
      inputRange: [TOP_VALUE_OPEN, TOP_VALUE_CLOSED],
      outputRange: ["0deg", "180deg"]
    });
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require("../assets/bg.jpg")} />
        <View
          key={"Dashboard"}
          style={dashboardViewStyle}
          ref={"dashboard"}
          {...this._panResponder.panHandlers}
        >
          <View
            style={{
              flex: 1,
              height: 200,
              marginHorizontal: 80,
              backgroundColor: "#000"
            }}
          >
            <Animated.Image
              source={require("../assets/tools.png")}
              style={[
                styles.tools,
                {
                  opacity: toolsOpacity,
                  transform: [
                    {
                      scale: toolsOpacity
                    }
                  ]
                }
              ]}
              resizeMode={"contain"}
            />
          </View>
          <View style={styles.notch}>
            <Image
              source={require("../assets/notch.png")}
              style={styles.notchImage}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -50,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.easeInEaseOut();
                this.setState({
                  isOpen: !this.state.isOpen
                });
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Animated.Image
                  source={require("../assets/arrow.png")}
                  style={{
                    tintColor: "#fff",
                    width: 30,
                    height: 30,
                    transform: [
                      {
                        rotate: arrowRotate
                      }
                    ]
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  vertical: {
    flexDirection: "column"
  },
  horizontal: {
    flexDirection: "row"
  },
  horizontallyCenterChildren: {
    alignItems: "center"
  },
  panel: {
    backgroundColor: "#000"
  },
  notch: {
    alignItems: "center",
    height: 30,
    marginTop: -1
  },
  notchImage: {
    width: width - 160,
    height: 30
  },
  bg: {
    flex: 1,
    width: null,
    height: null
  },
  tools: {
    flex: 1,
    width: null,
    height: null
  }
});

export default App;
