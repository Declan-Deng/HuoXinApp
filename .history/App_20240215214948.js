import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import {useCameraPermission} from 'react-native-vision-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './loginPage/LoginPage';
import AgreementPage from './agreementPage/AgreementPage';
import CameraScreen from './testPage/CameraScreen';
import FinishPage from './testPage/FinishPage';
import SocialLoginPage from './loginPage/SocialLoginPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('登录');
  const [isReady, setIsReady] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    const loadInitialRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem('currentScreen');
        setInitialRoute(savedRoute || '登录');
      } catch (error) {
        console.error('Failed to load saved route:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadInitialRoute();
  }, []);

  useEffect(() => {
    const checkPermissions = async () => {
      const permissionsToCheck =
        Platform.Version >= 33
          ? [
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ]
          : [
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              PermissionsAndroid.PERMISSIONS.CAMERA,
            ];

      const hasPermissions = await Promise.all(
        permissionsToCheck.map(PermissionsAndroid.check),
      );
      if (hasPermissions.every(Boolean)) {
        setPermissionGranted(true);
      } else {
        const requestPermissions = await PermissionsAndroid.requestMultiple(
          permissionsToCheck,
        );
        const granted = Object.values(requestPermissions).every(
          value => value === PermissionsAndroid.RESULTS.GRANTED,
        );
        setPermissionGranted(granted);
      }
    };

    checkPermissions();
  }, []);

  if (!isReady) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 30, marginTop: 20}}>
          权限未授予，请同意要求的所有权限
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: true, orientation: 'landscape'}}>
        <Stack.Screen
          name="登录"
          component={LoginPage}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="社会登录"
          component={SocialLoginPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="用户确认"
          component={AgreementPage}
          options={{
            headerTitle: '确认信息',
            headerTitleAlign: 'center',
            cardShadowEnabled: true,
            cardOverlayEnabled: true,
            animationEnabled: true,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="检测界面"
          component={CameraScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="完成界面"
          component={FinishPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
