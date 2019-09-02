import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const defaultStyles = {
  wireframe: {
    backgroundColor: 'transparent',
    justifyContent: undefined,
    alignItems: undefined,
    overflow: 'hidden',
    borderWidth: undefined,
    borderTopWidth: undefined,
    borderBottomWidth: undefined,
    borderLeftWidth: undefined,
    borderRightWidth: undefined,
    borderStartWidth: undefined,
    borderEndWidth: undefined
  }
};

class LoadingWireframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timingValue: new Animated.Value(0.0),
      targets: {}
    };

    const dimensions = Dimensions.get('screen');
    this.state.isPortrait = dimensions.width <= dimensions.height;
  }

  componentDidMount() {
    if (this.props.loading) {
      this._startFade();
    }
    Dimensions.addEventListener('change', this._onDimensionChanged);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this._onDimensionChanged);
  }

  _onDimensionChanged = ({ screen }) => {
    if (!this.props.loading) {
      return;
    }

    this.setState(oldState => {
      const isPortrait = screen.width <= screen.height;

      if (isPortrait == oldState.isPortrait) {
        return null;
      }

      return {
        targets: {},
        isPortrait
      };
    });
  };

  componentDidUpdate(oldProps, oldState) {
    if (this.props.loading != oldProps.loading) {
      if (this.props.loading) {
        this._startFade();
      } else {
        this._stopFade();
      }
    }

    if (this.state.isPortrait != oldState.isPortrait) {
      // Animate fade again as after the dimension changed, it caused the previous animation to stop
      if (this.props.loading) {
        this._startFade();
      }
    }
  }

  _startFade() {
    this._stopFade();
    this.state.timingValue.setValue(0.0);
    this._anim = Animated.loop(
      Animated.timing(this.state.timingValue, {
        toValue: 1.0,
        duration: this.props.fadeDuration,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    this._anim.start();
  }

  _stopFade() {
    this._anim && this._anim.stop();
    this._anim = null;
  }

  render() {
    const { loading, color, lowestFadeOpacity, children } = this.props;
    const opacity = this.state.timingValue.interpolate({
      inputRange: [0.0, 0.5, 1.0],
      outputRange: [1.0, lowestFadeOpacity, 1.0]
    });

    return React.Children.map(children, (child, index) => {
      return (
        <Wireframe
          key={index}
          opacity={opacity}
          color={color}
          loading={loading}
          size={this.state.targets[index] || null}
          onLayout={e => {
            this.setState(oldState => {
              return {
                targets: {
                  ...oldState.targets,
                  [index]: { width: e.layout.width, height: e.layout.height }
                }
              };
            });
          }}>
          {child}
        </Wireframe>
      );
    });
  }
}

const Wireframe = ({
  opacity,
  color,
  loading,
  children,
  size,
  onLayout,
  ...restProps
}) => {
  if (!loading || !React.isValidElement(children)) {
    return children;
  }

  let wireframeStyle: ViewStyle = !children.props.style
    ? defaultStyles.wireframe
    : {
        ...StyleSheet.flatten(children.props.style),
        ...defaultStyles.wireframe
      };

  const hasProvidedFixedSize =
    wireframeStyle.width !== null &&
    wireframeStyle.width !== undefined &&
    wireframeStyle.height !== null &&
    wireframeStyle.height !== undefined;

  if (size || hasProvidedFixedSize) {
    if (!hasProvidedFixedSize) {
      wireframeStyle = {
        ...wireframeStyle,
        width: size.width,
        height: size.height
      };
    }

    return (
      <View {...restProps} style={wireframeStyle}>
        <Animated.View
          style={{
            backgroundColor: color,
            flex: 1,
            opacity: opacity
          }}
        />
      </View>
    );
  } else if (onLayout) {
    return React.cloneElement(children, {
      onLayout: e => {
        onLayout && onLayout(e.nativeEvent);
      },
      style: { ...wireframeStyle, opacity: 0 }
    });
  }
};

LoadingWireframe.defaultProps = {
  lowestFadeOpacity: 0.2,
  fadeDuration: 1000,
  color: '#bdc3c7',
  loading: false
};

LoadingWireframe.propTypes = {
  lowestFadeOpacity: PropTypes.number.isRequired,
  fadeDuration: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default LoadingWireframe;
