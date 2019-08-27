import React from 'react';
import { StyleProp, ViewStyle, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

const defaultStyles = {
	wireFrame: {
		backgroundColor: 'transparent',
		color: 'transparent',
		justifyContent: undefined,
		alignItems: undefined,
		overflow: 'hidden'
	}
};

class LoadingWireframe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timingValue: new Animated.Value(0.0)
		};
	}

	componentDidMount() {
		if (this.props.loading) {
			this._startFade();
		}
	}

	componentDidUpdate(oldProps, oldState) {
		if (this.props.loading != oldProps.loading) {
			if (this.props.loading) {
				this._startFade();
			} else {
				this._stopFade();
			}
		}
	}

	_startFade() {
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
					loading={loading}>
					{child}
				</Wireframe>
			);
		});
	}
}

const Wireframe = ({ opacity, color, loading, children, ...restProps }) => {
	if (loading) {
		const childStyle: StyleProp<ViewStyle> = Array.isArray(
			children.props.style
		)
			? [...children.props.style, defaultStyles.wireFrame]
			: {
					...children.props.style,
					...defaultStyles.wireFrame
			  };

		return (
			<View {...restProps} style={childStyle}>
				<Animated.View
					style={{
						backgroundColor: color,
						flex: 1,
						opacity: opacity
					}}
				/>
			</View>
		);
	}

	return children;
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
