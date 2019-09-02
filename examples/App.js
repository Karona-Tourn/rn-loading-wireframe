/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import LoadingWireframe from '../src';

const loadingWireframeColor = '#bdc3c7';
const loadingWireframeFadeDuration = 1000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 10 }}>
          {[1, 2, 3, 4, 5, 6].map((v, i) => {
            return (
              <View key={i} style={styles.card}>
                <LoadingWireframe
                  loading={loading}
                  color={loadingWireframeColor}
                  fadeDuration={loadingWireframeFadeDuration}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        'https://facebook.github.io/react-native/docs/assets/favicon.png'
                    }}
                  />
                </LoadingWireframe>
                <View style={{ flex: 1 }}>
                  <LoadingWireframe
                    loading={loading}
                    color={loadingWireframeColor}
                    fadeDuration={loadingWireframeFadeDuration}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'red'
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}>
                        Loading Wireframe
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5
                      }}>
                      <Text>It can help showing loading wireframe effect</Text>
                    </View>

                    <TouchableHighlight style={styles.button}>
                      <Text style={{ color: '#fff' }}>Download</Text>
                    </TouchableHighlight>
                  </LoadingWireframe>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    flexDirection: 'row',
    borderRadius: 6,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    marginEnd: 10
  },
  button: {
    position: 'absolute',
    end: 0,
    bottom: 0,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 6
  }
});
