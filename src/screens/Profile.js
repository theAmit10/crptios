import {Alert, StatusBar} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, FONT} from '../../constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HeaderTop from '../component/profile/HeaderTop';
import ProfileAbout from '../component/profile/ProfileAbout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URLHelper from '../api/URLhelper/URLHelper';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../component/Loading';

const Profile = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

  const [profileData, setProfileData] = useState(null);
  // const source = require('../../../assets/image/user_placeholder.png');

  const isFocused = useIsFocused()

  useEffect(() => {
    getProfile();
  }, [isFocused]);

  const getProfile = async () => {
    const apiUrl = URLHelper.BASE_URL + URLHelper.PROFILE;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      console.log('Response:', response.data.user);

      setProfileData(response.data.user);
      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: error.response,
        });
        console.log('Error:', error.response);
      } else {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        console.log('Error:', error.message);
      }
    }
  };

  // Function to clear AsyncStorage data when the user logs out
  const clearAsyncStorage = async () => {
    try {
      const apiUrl = URLHelper.MY_INVESTMENT_LIST;

      const headers = {
        userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
        Authorization: `Bearer ${ACCESS_TOKEN.data}`,
      };

      await AsyncStorage.clear();
      console.log('AsyncStorage data cleared successfully.');
      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error,
      });
    }
  };

  const logoutHandler = () => {
    console.log('Logging Off...');
    clearAsyncStorage();
    Toast.show({
      type: 'success',
      text1: 'Logging Out ',
      text2: 'Please wait...',
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: THEME.data === 'LIGHT' ? COLORS.white : COLORS.purple,
        ...styles.container,
      }}>
      <StatusBar style="light" hidden={false} />
      <HeaderTop value={'Profile'} />

      {profileData ? (
        <ScrollView>
          <View>
            <ProfileAbout data={profileData} />
          </View>

          {/** verification */}
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'stretch'}}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('Verification')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="Safety"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Verification
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** About Us */}

          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('KnowYourCrypto')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="question"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Know Your Crypto
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** Setting */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('Setting')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="setting"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Settings
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** History */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('History')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="clockcircleo"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  History
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** Rewards */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('Rewards')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="tago"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Rewards
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** Payment */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('DepositScreen')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="carryout"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Payment
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** Helpdesk */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('HelpDesk')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="infocirlceo"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Helpdesk
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** About */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => navigation.navigate('KnowYourCrypto')}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="questioncircleo"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  About
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/** verification */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentContainer,
              }}
              onPress={() => logoutHandler()}>
              <View style={{flexDirection: 'row'}}>
                <LinearGradient
                  colors={[
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                  ]}
                  className="rounded-full p-3">
                  <AntDesign
                    name="logout"
                    size={heightPercentageToDP(2)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                    style={styles.centerImage}
                  />
                </LinearGradient>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Logout
                </Text>
              </View>

              <Text style={{textAlignVertical: 'center'}}>
                <AntDesign
                  name="right"
                  size={heightPercentageToDP(2)}
                  color={
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                  }
                  style={styles.centerImage}
                />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{height: heightPercentageToDP(10)}}></View>

        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',

    paddingBottom: heightPercentageToDP(10),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: heightPercentageToDP(1),

  },
  title: {
    fontFamily: FONT.extrabold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    marginStart: heightPercentageToDP(2),
  },
});
