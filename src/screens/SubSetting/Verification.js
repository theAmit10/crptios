import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import HeaderTop from '../../component/profile/HeaderTop';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../../component/Loading';
import { HOVER } from 'nativewind/dist/utils/selector';

const Verification = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();

  const [checkInvite, setInvite] = useState(null);
  const [checkInvestment, setInvestment] = useState(null);

  useEffect(() => {
    getProfile();
    getReferralData();
    getMyInvestmentList();
  }, []);

  // Getting Profile name
  const getProfile = async () => {
    const apiUrl = URLHelper.BASE_URL + URLHelper.PROFILE;
    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      setProfileData(response.data.user);
      console.log('Response :: Added ');
      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };



  // Getting Total Rewards Count
  const getReferralData = async () => {
    const apiUrl = URLHelper.REFERREL_DETAILS;
    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      console.log('Response: COunt :: ', response.data.data.count_referrals);

      setInvite(response.data.data.count_referrals);

      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  // Getting Investment count
  const getMyInvestmentList = async () => {
    const apiUrl = URLHelper.MY_INVESTMENT_LIST;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');

      // setMyInvestmentList(response.data.data);
      setInvestment(response.data.data.length);

      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: THEME.data === 'LIGHT' ? COLORS.white : COLORS.purple,
        ...styles.mainCointer,
      }}>
      <HeaderTop value={'Verification'} />
      {profileData ? (
        <View>
          <ScrollView>
            {/** Content Parent Container */}

            <View
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.contentParentConatainer,
              }}>
              {/** Content Container */}

              {/** your details Container */}
              <TouchableOpacity>
                <View style={styles.contentContainer}>
                  <View style={styles.leftContainer}>
                    <AntDesign
                      name="checkcircleo"
                      size={heightPercentageToDP(3)}
                      color={
                        profileData
                          ? profileData.first_name
                            ? COLORS.green
                            : COLORS.gray
                          : COLORS.gray
                      }
                      style={{alignSelf: 'center', opacity: 0.9}}
                    />
                  </View>
                  <View style={styles.rightContainer}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Your details
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      Please provide your name and email
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/** payment Container */}
              <TouchableOpacity>
                <View style={styles.contentContainer}>
                  <View style={styles.leftContainer}>
                    <AntDesign
                      name="checkcircleo"
                      size={heightPercentageToDP(3)}
                      color={COLORS.green}
                      style={{alignSelf: 'center', opacity: 0.9}}
                    />
                  </View>
                  <View style={styles.rightContainer}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Choose a password
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      must be atleast 8 characters
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/** Investment Container */}
              <TouchableOpacity>
                <View style={styles.contentContainer}>
                  <View style={styles.leftContainer}>
                    <AntDesign
                      name="checkcircleo"
                      size={heightPercentageToDP(3)}
                      color={
                        checkInvestment == '0' ? COLORS.gray : COLORS.green
                      }
                      style={{alignSelf: 'center', opacity: 0.9}}
                    />
                  </View>
                  <View style={styles.rightContainer}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Investment
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      Start Investing in different plans
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/** team Container */}
              <TouchableOpacity>
                <View style={styles.contentContainer}>
                  <View style={styles.leftContainer}>
                    <AntDesign
                      name="checkcircleo"
                      size={heightPercentageToDP(3)}
                      color={checkInvite == '0' ? COLORS.gray : COLORS.green}
                      style={{alignSelf: 'center', opacity: 0.9}}
                    />
                  </View>
                  <View style={styles.rightContainer}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Invite your team
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      Start collaborating with your team to earn enticing
                      rewards.
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/** social Container 

          <TouchableOpacity>
            <View style={styles.contentContainer}>
              <View style={styles.leftContainer}>
                <AntDesign
                  name="checkcircleo"
                  size={heightPercentageToDP(3)}
                  color={COLORS.gray}
                  style={{alignSelf: 'center', opacity: 0.9}}
                />
              </View>
              <View style={styles.rightContainer}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Add your social
                </Text>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.subtitle,
                  }}>
                  share post to your social account
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          */}
            </View>
          </ScrollView>
          <TouchableOpacity
          style={{borderRadius: heightPercentageToDP(2)}}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Setting')}>
            <Text style={styles.verify}>Verify Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
  },
  contentParentConatainer: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(2),
  },
  contentContainer: {
    height: heightPercentageToDP(10),
    flexDirection: 'row',
  },
  leftContainer: {
    width: widthPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  verify: {
    color: COLORS.white,
    fontFamily: 'Jost-ExtraBold',
    fontSize: heightPercentageToDP(2),
    backgroundColor: COLORS.green,
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    textAlign: 'center',
    overflow: "hidden"
  },
});
