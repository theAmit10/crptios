import {Alert, BackHandler, StatusBar} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS, FONT} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import URLHelper from '../api/URLhelper/URLHelper';
import axios from 'axios';
import {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {storeData} from '../../stores/AsyncLocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {updateAccessToken} from '../../stores/userAccessTokenSlice';

const Login = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const [emailVal, setEmail] = useState('');
  const [passwordVal, setPassword] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      // BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const signIn = async () => {
    if (!emailVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter email address',
      });
    } else if (!passwordVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter password',
      });
    } else {
      console.log('Else : ' + emailVal + ' | ' + passwordVal + ' | ');
      setProgressBar(true);
      const apiUrl = URLHelper.BASE_URL + URLHelper.SIGN_IN;
      const headers = {
        userapisecret: URLHelper.USER_SECRET_KEY,
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('email', emailVal);
      formData.append('password', passwordVal);

      try {
        const response = await axios.post(apiUrl, formData, {headers});
        console.log('REGISTERING STARTED');
        console.log('Response:', response.data);

        if (response.data.message == 'Login successful') {
          console.log('Response:', response.data.access_token);
          // storeData('accessToken', response.data.access_token);

          AsyncStorage.setItem('accessToken', response.data.access_token);
          dispatch(updateAccessToken(response.data.access_token));
          storeData('userId', response.data.user.id);
          settingFirstTimeInstall();
          console.log('REGISTERING STOP');
          navigation.navigate('Hcontainer');
        } else if (response.data.message == "Email or Password doesn't match") {
          Toast.show({
            type: 'error',
            text1: "Email or Password doesn't match",
          });
        } else if (
          response.data.message ==
          'Your account has been deleted. please contact support team to active again'
        ) {
          Toast.show({
            type: 'error',
            text1: 'Your account has been deleted',
            text2: ' please contact support team to active again',
          });
        } else if (
          response.data.message ==
          'You have no account,please register new account'
        ) {
          Toast.show({
            type: 'error',
            text1: 'No account found ,please register a new account',
          });
        }

        setProgressBar(false);
      } catch (error) {
        setProgressBar(false);
        if (error.response) {
          console.log('Error:', error.response.data);
          console.log('Error:', error.response.data.errors);
          console.log('ERROR : ' + error.response.data.errors.email);

          Toast.show({
            type: 'error',
            text1: 'something went wrong',
          });
        } else {
          console.log('Error:', error);
          console.log('Error:', error.message);

          Toast.show({
            type: 'error',
            text1: 'Please, check your internet connection',
          });
        }
      }
    }
  };

  const settingFirstTimeInstall = () => {
    try {
      const jsonValue = JSON.stringify('yes');
      AsyncStorage.setItem('firstTimeAppInstall', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
      />

      <ImageBackground
        source={require('../../assets/image/back_one.png')}
        style={styles.image}
        tintColor={THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark}
      />

      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
          justifyContent: 'center',
        }}>
        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
          ]}
          className="rounded-full p-6"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: heightPercentageToDP(15),
            left: widthPercentageToDP(50),
          }}
        />
        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
          ]}
          className="rounded-full p-20"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: heightPercentageToDP(-5),
            right: widthPercentageToDP(-5),
          }}
        />
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.title,
          }}>
          Sign In
        </Text>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.subtitle,
          }}>
          Email
        </Text>
        <TextInput
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            borderColor: THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
            ...styles.userNameInput,
          }}
          placeholder="Type email here"
          placeholderTextColor={
            THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
          }
          onChangeText={setEmail}
          value={emailVal}
          keyboardType="email-address"></TextInput>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.subtitle,
          }}>
          Password
        </Text>
        <TextInput
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            borderColor: THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
            ...styles.userNameInput,
          }}
          placeholder="Type Password here"
          placeholderTextColor={
            THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
          }
          onChangeText={setPassword}
          value={passwordVal}
          secureTextEntry={true}></TextInput>
        <View style={styles.accountAndForgotContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.account,
              }}>
              Create An Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.forgot,
              }}>
              Forgot Account
            </Text>
          </TouchableOpacity>
        </View>

        {showProgressBar ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: heightPercentageToDP(3),
            }}>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
        ) : (
          <TouchableOpacity style={styles.bottonContainer} onPress={signIn}>
            <Text style={styles.next}>Continue</Text>
          </TouchableOpacity>
        )}

        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
          ]}
          className="rounded-full p-20"
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: heightPercentageToDP(-5),
            left: widthPercentageToDP(-5),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',

    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
  },

  title: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginStart: heightPercentageToDP(1),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginStart: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
  },
  userNameInput: {
    width: '95%',
    fontFamily: FONT.regular,
    padding: heightPercentageToDP(2),
    fontSize: heightPercentageToDP(2),
    borderWidth: 2,
    borderRadius: heightPercentageToDP(1),
    margin: heightPercentageToDP(1),
  },
  bottonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
    bottom: heightPercentageToDP(2),
    zIndex: 9,
  },
  next: {
    color: 'white',
    width: '100%',
    fontFamily: FONT.semibold,
    backgroundColor: COLORS.green,
    borderBottomColor: COLORS.green,
    fontSize: heightPercentageToDP(2),
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
    textAlign: 'center',
  },
  accountAndForgotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: heightPercentageToDP(10),
    marginEnd: heightPercentageToDP(10),
  },
  account: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(1.8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',

    marginTop: heightPercentageToDP(2),
  },
  forgot: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(1.8),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginTop: heightPercentageToDP(2),
  },
});
