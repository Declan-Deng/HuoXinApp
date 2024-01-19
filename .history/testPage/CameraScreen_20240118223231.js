import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {
  Camera,
  FrameProcessor,
  specialRenderers,
} from 'react-native-vision-camera';
import {GoogleFaceDetector} from 'react-native-google-vision-api';

class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.processFrame = this.processFrame.bind(this);

    this.faceDetector = new GoogleFaceDetector();
    this.faceDetector.configure({
      mode: 'fast',
      landmarkMode: GoogleFaceDetector.LANDMARK_MODE_NONE,
      classificationMode: GoogleFaceDetector.CLASSIFICATION_MODE_NONE,
      minFaceSize: 0.15,
      isTrackingEnabled: false,
    });
  }

  processFrame(frame) {
    const image = {
      data: frame.data,
      width: frame.width,
      height: frame.height,
      orientation: frame.orientation,
      format: 'nv21',
    };

    this.faceDetector
      .detect(image)
      .then(faces => {
        if (faces.length > 0) {
          Alert.alert('Face detected!', 'A face was detected on the camera.', [
            {text: 'OK'},
          ]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          cameraId={Camera.Constants.Type.back}
          style={styles.preview}
          frameProcessor={
            <FrameProcessor format="nv21" onProcessFrame={this.processFrame} />
          }>
          <specialRenderers.FaceMeshRenderer />
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraScreen;
