import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { COLORS, FONT } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import URLHelper from '../api/URLhelper/URLHelper';
import { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

const GoogleAuthPassword = ({ route }) => {
  const receivedData = route.params?.data || {};
  console.log(receivedData);

  const navigation = useNavigation();


  const user = receivedData;

  const [emailVal, setEmail] = useState('');
  const [passwordVal, setPassword] = useState('');
  const [confirmPasswordVal, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const THEME = useSelector(state => state.theme);

  const [showProgressBar, setProgressBar] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [firstNameVal, setFirstName] = useState('');
  const [secondNameVal, setSecondName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    addUserDetails();
  });

  const addUserDetails = () => {
    console.log('Adding User Details :: ');
    setEmail(user.user.email ? user.user.email : '');
    setFirstName(user.user.givenName ? user.user.givenName : '');
    setSecondName(user.user.familyName ? user.user.familyName : '');
  };

  const validatePassword = () => {
    // Define regular expressions for password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = [0 - 9];
    // Check if the password meets the requirements
    if (
      passwordVal.length >= 8 &&
      uppercaseRegex.test(passwordVal) &&
      lowercaseRegex.test(passwordVal) &&
      numberRegex.test(passwordVal)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const signUp = async () => {
    if (!emailVal || !emailVal.includes('@')) {

      Toast.show({
        type: 'error',
        text1: 'Email Address'
      })
    } else if (passwordVal.length == 0) {

      Toast.show({
        type: 'error',
        text1: 'Please enter password'
      })
    } else if (passwordVal.length <= 7) {
      Toast.show({
        type: 'error',
        text1: 'The password is not long enough, it must be at least 8 characters in length.'
      })

    } else if (isValid) {
      Toast.show({
        type: 'error',
        text1: 'The password should include at least one uppercase letter, one lowercase letter, and one number.'
      })

    } else if (passwordVal != confirmPasswordVal) {
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password Not Matched'
      })

    } else {
      setProgressBar(true);
      console.log(
        'Else : ' + emailVal + ' | ' + passwordVal + ' | ' + confirmPasswordVal,
      );

      const apiUrl = URLHelper.BASE_URL + URLHelper.SIGN_UP;
      const headers = {
        userapisecret: URLHelper.USER_SECRET_KEY,
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('email', emailVal);
      formData.append('password', passwordVal);
      formData.append('first_name', firstNameVal);
      formData.append('last_name', secondNameVal);
      formData.append('password_confirmation', confirmPasswordVal);
      if (referralCode != '' && referralCode.length != 0) {
        formData.append('ref_code', referralCode);
      }

      try {
        const response = await axios.post(apiUrl, formData, { headers });
        console.log('REGISTERING STARTED');
        console.log('Response:', response.data);
        if (response.data.message === 'Invalid referral code.') {

          Toast.show({
            type: 'error',
            text1: 'Invalid referral code'
          })
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
          console.log('Error:', error.response.data); // This will contain the server's error response
          console.log('ERROR : ' + error.response.data.errors.email);
          // Toast.show('Please, check your internet connection');
          if (
            error.response.data.errors.email == 'Email Address already exists'
          ) {

            Toast.show({
              type: 'error',
              text1: 'Email Address already exists'
            })

            navigation.navigate("Login")
          }
        } else {
          // console.error('Error:', error.message);
          console.log('Error else:', error.message);
          console.log('Error:', error);

          Toast.show({
            type: 'error',
            text1: 'Please, check your internet connection'
          })
        }
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
          text1: 'Something went wrong'
        })
        if (error.response) {
          console.log(
            'Request failed with status code',
            error.response.status,
          );
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
      <StatusBar hidden={false} barStyle={'light-content'} />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/** Round Image */}

          <LinearGradient
            colors={[
              THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            ]}
            className="rounded-full p-2">
            <Image
              source={require('../../assets/image/logo.png')}
              style={styles.centerImage}
            />
          </LinearGradient>

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.title,
            }}>
            Welcome {user.user.givenName ? user.user.givenName : ''}
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.titleDescription,
            }}>
            Please Create a Password
          </Text>

          <View style={styles.inputContainer}>
            {/** Password */}
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

            {/** Confirm Password */}

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
            <Text style={styles.continue} onPress={signUp}>
              Continue
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoogleAuthPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    marginTop: heightPercentageToDP(20),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    height: heightPercentageToDP(10),
    width: heightPercentageToDP(10),
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
    paddingStart: 10,
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
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
    textAlign: 'center',
    alignSelf: 'stretch',
    marginHorizontal: heightPercentageToDP(2),
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
