import {ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {COLORS, FONT} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import URLHelper from '../api/URLhelper/URLHelper';
import {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  // For Registering
  const [emailVal, setEmail] = useState('');
  const [passwordVal, setPassword] = useState('');
  const [confirmPasswordVal, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [device_token, setDeviceToken] = useState('');

  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  // const DEVICE_TOKEN = useSelector(state => state.devicetoken);

  const [showProgressBar, setProgressBar] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [firstNameVal, setFirstName] = useState('');
  const [secondNameVal, setSecondName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    getDeviceToken();
  }, [device_token]);

  console.log('mine device token :: ' + device_token);

  const getDeviceToken = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('DEVICE_TOKEN');
      setDeviceToken(jsonValue);

      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('error' + error);
    }
  };

  // const validatePassword = () => {
  //   // Define regular expressions for password validation
  //   const uppercaseRegex = /[A-Z]/;
  //   const lowercaseRegex = /[a-z]/;
  //   const numberRegex = [0 - 9];

  //   // Check if the password meets the requirements
  //   if (
  //     passwordVal.length >= 8 &&
  //     uppercaseRegex.test(passwordVal) &&
  //     lowercaseRegex.test(passwordVal) &&
  //     numberRegex.test(passwordVal)
  //   ) {
  //     // setIsValid(true);
  //     return true;
  //   } else {
  //     // setIsValid(false);
  //     return false
  //   }
  // };

  function validatePassword(str) {
    // Regular expressions to check for presence of lowercase, uppercase, number, and special character
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check if the string length is 8 or more and it contains required character types
    if (
      str.length >= 8 &&
      lowerCaseRegex.test(str) &&
      upperCaseRegex.test(str) &&
      numberRegex.test(str) &&
      specialCharRegex.test(str)
    ) {
      return true;
    } else {
      return false;
    }
  }

  const signUp = async () => {
    if (!emailVal || !emailVal.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Enter email address',
      });
    } else if (passwordVal.length <= 7) {
      Toast.show({
        type: 'error',
        text1: 'The password is not long enough, ',
        text2: 'Password must be at least 8 characters in length.',
      });
    } else if (!validatePassword(passwordVal)) {
      Toast.show({
        type: 'error',
        text1: 'The password should include at least ',
        text2: '1 uppercase, 1 lowercase, 1 special character and 1 number',
      });
    } else if (passwordVal != confirmPasswordVal) {
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password Not Matched',
      });
    } else {
      setProgressBar(true);
      console.log(
        'Else : ' + emailVal + ' | ' + passwordVal + ' | ' + confirmPasswordVal,
      );

      // const headers = {
      //   userapisecret: URLHelper.USER_SECRET_KEY,

      //   // 'Content-Type': undefined,
      //   // 'Content-Type': 'multipart/form-data',
      //   'Content-Type': 'application/x-www-form-urlencoded'

      //   // 'Content-Type': 'application/json'
      //   // 'Content-Type': 'application/json',
      //   // userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp'

      // };
      const currentDate = new Date();
      const formData = new FormData();
      formData.append('email', emailVal);
      formData.append('password', passwordVal);
      formData.append('first_name', 'User');
      formData.append('last_name', currentDate.getTime());
      formData.append('password_confirmation', confirmPasswordVal);
      if (referralCode != '' && referralCode.length != 0) {
        formData.append('ref_code', referralCode);
      }
      formData.append('device_token', device_token);

      const apiUrl = URLHelper.BASE_URL + URLHelper.SIGN_UP;
      const headers = {
        userapisecret: URLHelper.USER_SECRET_KEY,
        'Content-Type': 'multipart/form-data',
      };

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            userapisecret: URLHelper.USER_SECRET_KEY,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('REGISTERING STARTED');
        console.log('Response Status : ', response.status);
        console.log('Response:', response.data);

        if (response.data.message === 'Invalid referral code.') {
          Toast.show({
            type: 'error',
            text1: 'Invalid referral code',
          });
        } else {
          navigation.navigate('OtpAuth', {
            itemEmail: emailVal,
          });
        }

        console.log('REGISTERING STOP');
        setProgressBar(false);
        // Handle the response as needed in your app
      } catch (error) {
        setProgressBar(false);

        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log('Error:', error.response.data); // This will contain the server's error response
          console.log('ERROR : ' + error.response.data.errors.email);
          // Toast.show('Please, check your internet connection');
          if (
            error.response.data.errors.email == 'Email Address already exists'
          ) {
            Toast.show({
              type: 'error',
              text1: 'Email Address already exists',
            });
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // console.error('Error:', error.message);
          console.log('Error else:', error.message);
          console.log('Error:', error);

          Toast.show({
            type: 'error',
            text1: 'Please, check your internet connection',
          });
        }
      }
    }
  };

  // const [formData, setFormData] = useState({
  //   email: 'dwi@gmail.com',
  //   password: 'Arshu@236723',
  //   first_name: 'eree',
  //   last_name: 'sss',
  //   password_confirmation: 'Arshu@236723',
  //   device_token: '66',
  // });

  // const currentDate = new Date();
  // const formData = new FormData();
  // formData.append('email', emailVal);
  // formData.append('password', passwordVal);
  // formData.append('first_name', 'User');
  // formData.append('last_name', currentDate.getTime());
  // formData.append('password_confirmation', confirmPasswordVal);
  // if (referralCode != '' && referralCode.length != 0) {
  //   formData.append('ref_code', referralCode);
  // }
  // formData.append('device_token', 'adsgweasndlggksdnnsnlS');

  // const signUp = async () => {
  //   try {
  //     const config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: 'https://www.hostmansa.com/crypto/public/api/sign-up',
  //       // formData,
  //       headers: {
  //         userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
  //         'Content-Type': 'application/json',
  //         ...formData,
  //       },
  //     };

  //     const response = await axios.request(config);
  //     console.log(JSON.stringify(response.data));

  //     if (response.data.message === 'Invalid referral code.') {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Invalid referral code',
  //       });
  //     } else {
  //       navigation.navigate('OtpAuth', {
  //         itemEmail: emailVal,
  //       });
  //     }

  //     console.log('REGISTERING STOP');
  //     setProgressBar(false);

  //   } catch (error) {
  //     setProgressBar(false);

  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //         console.log('Error:', error.response.data); // This will contain the server's error response
  //         console.log('ERROR : ' + error.response.data.errors.email);
  //         // Toast.show('Please, check your internet connection');
  //         if (
  //           error.response.data.errors.email == 'Email Address already exists'
  //         ) {
  //           Toast.show({
  //             type: 'error',
  //             text1: 'Email Address already exists',
  //           });
  //         }
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error('No response received:', error.request);
  //       }
  //       else {
  //         // console.error('Error:', error.message);
  //         console.log('Error else:', error.message);
  //         console.log('Error:', error);

  //         Toast.show({
  //           type: 'error',
  //           text1: 'Please, check your internet connection',
  //         });
  //       }
  //   }
  // };

  const registerUser = async userData => {
    try {
      setProgressBar(true);
      const response = await axios.post(
        'https://www.hostmansa.com/crypto/public/api/sign-up',
        userData,
        {
          headers: {
            userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
            'Content-Type': 'application/json',
          },
        },
      );

      // Handle successful response
      console.log('User registered successfully:', response.data);
      if (response.data.message === 'Invalid referral code.') {
        Toast.show({
          type: 'error',
          text1: 'Invalid referral code',
        });
      } else {
        navigation.navigate('OtpAuth', {
          itemEmail: emailVal,
        });
      }

      setProgressBar(false);
      // You can return the response data if needed
      return response.data;
    } catch (error) {
      setProgressBar(false);

      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);

        if (
          error.response.data.errors.email == 'Email Address already exists'
        ) {
          Toast.show({
            type: 'error',
            text1: 'Email Address already exists',
          });
        } else {
          // console.error('Error:', error.message);
          console.log('Error else:', error.message);
          console.log('Error:', error);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request error:', error.message);
        Toast.show({
          type: 'error',
          text1: 'Please, check your internet connection',
        });
      }

      // Throw the error to be handled by the caller
      throw error;
    }
  };

  // Example usage:
  const userData = {
    email: emailVal,
    password: passwordVal,
    first_name: 'eree',
    last_name: 'sss',
    password_confirmation: confirmPasswordVal,
    // ref_code: '4656a29d712501',
    device_token: '6678787',
  };

  // For Google Login

  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     // Your Google OAuth client ID
  //     // iosClientId: 'YOUR_IOS_CLIENT_ID',
  //     // Your Google OAuth client ID
  //     androidClientId: '191145196270-us2gus61u2c26lu8g49hl8f3ti57t136.apps.googleusercontent.com',
  //   });

  //   GoogleSignin.onGoogleSignInComplete((googleUser) => {
  //     setUser(googleUser);
  //   });
  // }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setUser(userInfo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     setUser(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '191145196270-pjej7p01ub153jsn7ddidv3lmql936qa.apps.googleusercontent.com',
      iosClientId:
        '191145196270-hi8u1b3qqi6gdanabj3g1gnm3u5h0bqc.apps.googleusercontent.com',
      // androidClientId: '191145196270-ru4ac3nj22665k2ldtvqjvd0c4361qiu.apps.googleusercontent.com',
      // offlineAccess: true
    });
  }, []);

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        console.log(result);

        setEmail(result.user.email);
        setFirstName(result.user.givenName);
        setSecondName(result.user.familyName);
        setProfileImage(result.user.photo);

        navigation.navigate('GoogleAuthPassword', {data: result});
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  // for uploading Profile content
  const handleUpdateProfile = async () => {
    if (!firstNameVal) {
      console.error('Enter your first name');
    } else if (!secondNameVal) {
      console.error('Enter your second name');
    } else if (!imageSource) {
      console.error('Add profile picture');
    } else {
      setProgressBar(true);

      try {
        const bearerToken =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

        const formData = new FormData();
        formData.append('first_name', firstNameVal);
        formData.append('last_name', secondNameVal);
        formData.append('phone', '987654312');
        formData.append('country', 'India');
        formData.append('gender', 'Male');

        console.log('Image URI :: ' + imageSource.uri);

        const response = await axios.post(
          'https://www.hostmansa.com/crypto/public/api/update-profile',
          formData,
          {
            headers: {
              userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
              Authorization: `Bearer ${bearerToken}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('Profile updated successfully:', response.data);
        console.warn('Profile updated successfully:');
        setProgressBar(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
        if (error.response) {
          console.log('Request failed with status code', error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          console.log('Request was made, but no response was received');
        } else {
          console.log('Error setting up the request:', error.message);
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <StatusBar
        hidden={false}
        barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/** Round Image */}

          <LinearGradient
            colors={[
              THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            ]}
            className="rounded-full p-10">
            <Image
              source={require('../../assets/image/add_user.png')}
              style={styles.centerImage}
            />
          </LinearGradient>

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.title,
            }}>
            Create an Account
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.titleDescription,
            }}>
            Welcome, Please Enter Your Details
          </Text>

          <View style={styles.inputContainer}>
            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Email address
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ...styles.userNameInput,
                }}
                placeholder="Enter your email"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setEmail}
                value={emailVal}
                keyboardType="email-address"></TextInput>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Password
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ...styles.userNameInput,
                }}
                placeholder="Create password"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setPassword}
                value={passwordVal}
                secureTextEntry={true}></TextInput>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Confirm Password
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  ...styles.userNameInput,
                }}
                placeholder="Confirm password"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setConfirmPassword}
                value={confirmPasswordVal}
                secureTextEntry={true}
              />
            </View>

            {/** For Referral code */}

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Referral Code
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ...styles.userNameInput,
                }}
                placeholder="Enter Referral Code"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setReferralCode}
                value={referralCode}></TextInput>
            </View>
          </View>

          <TouchableOpacity
            onPress={GoogleSingUp}
            activeOpacity={0.5}
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
              borderColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
              ...styles.googleAuthContainer,
            }}>
            <Image
              source={require('../../assets/image/google.png')}
              style={styles.googleImage}
            />
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.googleAuth,
              }}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          {/**
        <View>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={GoogleSingUp}
            />
          </View>
        
        */}

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
            <Text style={styles.continue} onPress={signUp}>
              Continue
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: heightPercentageToDP(4),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    height: heightPercentageToDP(8),
    width: heightPercentageToDP(8),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(3),
  },
  titleDescription: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    opacity: 0.5,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
    borderRadius: 5,
    padding: heightPercentageToDP(1.5),
  },
  inputContainer: {
    width: widthPercentageToDP(100),
    padding: heightPercentageToDP(2),
    alignItems: 'stretch',
    gap: heightPercentageToDP(1),
  },

  continue: {
    color: 'white',
    fontFamily: FONT.bold,
    backgroundColor: COLORS.green,
    borderBottomColor: COLORS.green,
    fontSize: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
    textAlign: 'center',
    alignSelf: 'stretch',
    marginHorizontal: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(5),
  },

  googleAuthContainer: {
    color: 'white',
    flexDirection: 'row',
    fontFamily: FONT.semibold,
    padding: heightPercentageToDP(1.5),
    borderWidth: 1,
    borderRadius: heightPercentageToDP(1),
    justifyContent: 'center',
    marginBottom: heightPercentageToDP(3),
    alignSelf: 'stretch',
    marginHorizontal: heightPercentageToDP(2),
  },
  googleAuth: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginStart: heightPercentageToDP(1),
  },
  googleImage: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
});
