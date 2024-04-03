import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP,widthPercentageToDP} from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAccessToken } from '../../stores/userAccessTokenSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  console.log('THEME SS am : ' + THEME.data);
  const [mycode, setCode] = useState(null);
  const [firstInstall, setFirstInstall] = useState(null);
  const [mytheme, setMyTheme] = useState(THEME.data);
  const dispatch = useDispatch();

  useEffect(() => {
    fetStoredTheme();
    checkFirstInstall();
    // generatingDeviceToken();
  }, []);

  

  // Generating Device Token for Notification

  // const generatingDeviceToken = async () => {
  //   let token = await messaging().getToken();
  //   // dispatch(addDeviceToken(token));

  //   // const jsonValue = JSON.stringify(token);
  //   AsyncStorage.setItem('DEVICE_TOKEN', token);
  //   console.log('Device Token :: ' + token);
  // };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);


  const updateTheme = newTheme => {
    if (newTheme) {
      console.log('SS update if: ' + newTheme);
      dispatch(changeTheme(newTheme));
    } else {
      console.log('SS update else: ' + newTheme);
      dispatch(changeTheme(newTheme));
    }

    let mode;
    if (!newTheme) {
      mode = THEME.data === 'DARK' ? 'DARK' : 'LIGHT';
    }

    storeData('currentTheme', newTheme);
  };


  const fetStoredTheme = async () => {

    try {
      console.log('#################');
      console.log('THEME SS started: ');
      const themeData = await getData('currentTheme');

      if (themeData) {
        console.log('WASU IF THEME SS Async themeData : ' + themeData);
        setMyTheme(themeData);
        dispatch(changeTheme(themeData));
      } else {
        console.log('WASU ELSE THEME SS Async themeData : ' + themeData);
        setMyTheme(THEME.data);
        dispatch(changeTheme(THEME.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate('SplashScreen');
    }
  };

  

  const checkFirstInstall = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('firstTimeAppInstall');
      let auth = await AsyncStorage.getItem('accessToken');
      setCode(jsonValue);
      setFirstInstall(jsonValue);
      console.log('Encrypted CODE is firstTimeAppInstall :: ' + jsonValue);

      dispatch(updateAccessToken(auth));

      const timer = setTimeout(() => {
        if (jsonValue) {
          // navigation.navigate('Onboard');
          // navigation.navigate('Login');
          if (auth) {
            navigation.navigate('Hcontainer');
          } else {
            navigation.navigate('Login');
          }
        } else {
          navigation.navigate('Onboard');
          // navigation.navigate('Login');
        }
      }, 3000);

      // return () => clearTimeout(timer);
      // return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('error' + error);
    }
  };

  if (mytheme) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
        }}>
        <StatusBar hidden={true}   />

        <View
          style={{
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            position: 'absolute',
            zIndex: 1,
            top: heightPercentageToDP(65),
            right: widthPercentageToDP(20),
          }}
          className="rounded-full p-10"></View>

        <Image
          source={require('../../assets/image/logo.png')}
          style={{
            width: widthPercentageToDP(50),
            height: heightPercentageToDP(50),
          }}
          tintColor={THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark}
        />

        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
          ]}
          className="rounded-full p-5">
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              top: heightPercentageToDP(65),
              right: widthPercentageToDP(20),
            }}
            className="rounded-full p-10"></View>
        </LinearGradient>

        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
          ]}
          className="rounded-full p-20"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: heightPercentageToDP(65),
            left: widthPercentageToDP(-5),
          }}></LinearGradient>
      </View>
    );
  } else {
    return null;
  }
}

export default SplashScreen

const styles = StyleSheet.create({})