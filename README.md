# **rn-loading-wireframe**

It can help showing loading wireframe effect for its wrapped components.

## Features

- Support in React Native for both Android and iOS
- Possible to wrap more than one child component
- Easy to use
- Some customizations
- Produces wireframe with the size style corresponding the style of the wrapped child elements

## Demo

<img src=".github/demo.gif" height="500" />

## Installation

- Using **Npm**

```bash
npm install rn-loading-wireframe --save
```

- Using **Yarn**

```bash
yarn add rn-loading-wireframe
```

## Example

```jsx
import LoadingWireframe from 'rn-loading-wireframe';

<LoadingWireframe loading={true} color='#bdc3c7' fadeDuration={1000}>
  <Text
    style={{
      fontSize: 20,
      fontWeight: 'bold'
    }}>
    Loading Wireframe
  </Text>
  <Text
    style={{
      marginTop: 5
    }}>
    It can help showing loading wireframe effect
  </Text>
  <TouchableHighlight
    style={{
      marginTop: 10,
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange',
      borderRadius: 6
    }}>
    <Text style={{ color: '#fff' }}>Download</Text>
  </TouchableHighlight>
</LoadingWireframe>;
```

## Usage

### Available props

| Name              | Type   | Default   | Description                        |
| ----------------- | ------ | --------- | ---------------------------------- |
| loading           | bool   | false     | Should show the loading wireframe? |
| color             | string | `#bdc3c7` | Color of the loading wireframe     |
| fadeDuration      | number | 1000      | Duration of fading blink           |
| lowestFadeOpacity | number | 0.2       | The lowest opacity when fading out |

## License

- [MIT](LICENSE)
