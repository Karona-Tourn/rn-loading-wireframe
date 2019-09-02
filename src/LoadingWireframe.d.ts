import { Component } from 'react';

interface LoadingWireframeProps {
    lowestFadeOpacity: number;
    fadeDuration: number;
    color: string;
    loading: boolean;
}

export default class LoadingWireframe extends Component<LoadingWireframeProps> {
}