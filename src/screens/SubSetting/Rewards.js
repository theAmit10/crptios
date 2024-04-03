import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONT } from '../../../constants';
import HeaderTop from '../../component/profile/HeaderTop';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-community/clipboard';
import Share from 'react-native-share';
import Helper from '../../../utils/Helper';
import Loading from '../../component/Loading';

const Rewards = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [showProgressBar, setProgressBar] = useState(false);
  const [referralData, setReferralData] = useState(null);

  useEffect(() => {
    getReferralData();
  }, []);

  const getReferralData = async () => {
    setProgressBar(true);
    const apiUrl = URLHelper.REFERREL_DETAILS;
    const bearerToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';
    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };
    try {
      const response = await axios.get(apiUrl, { headers });
      console.log('REQUEST STARTED');
      console.log('Response:', response.data.data);

      setReferralData(response.data.data);
      setProgressBar(false);

      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong'
      })
      if (error.response) {
        console.log('Error:', error.response);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  // to copy text
  const copyToClipboard = value => {
    Clipboard.setString(value);
    // Alert.alert('Text copied to clipboard!');
    // Alert.prompt('Text has been copied', 'copied');
    Toast.show({
      type: 'success',
      text1: 'Text has been copied',
    });
    // showAlert()
  };

  const shareToSocialMedia = value => {
    // Toast.show({
    //   type: 'success',
    //   text1: `Loading ${value}`,
    // });
    shareLink();
  };

  // const shareLink = async () => {

  //   try {
  //     const shareOptions = {
  //       title: 'Share via',
  //       message: 'Check out this link!',
  //       url: 'https://www.example.com', // Replace with your URL
  //       social: Share.Social.INSTAGRAM, // Change the social platform as needed
  //     };
  //     await Share.shareSingle(shareOptions);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const shareLink = async () => {
    console.log('Starting Sharing Process');
    try {
      const shareOptions = {
        title: Helper.ADD_TITLE_SHARE,
        message: Helper.ADD_MESSAGE_SHARE,
        url: Helper.ADD_URL_SHARE,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error while sharing:', error.message);
      // Toast.show({
      //   type: 'error',
      //   text1: error.message,
      // });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.mainCointer,
      }}>
      <HeaderTop value={'Rewards'} />
      <ScrollView>
        {/** Content Container */}

        {referralData ? (
          <>
            <View>
              <View
                style={{
                  backgroundColor:
                    THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                  ...styles.contentParentConatainer,
                }}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.title,
                  }}>
                  Share your referral link and earn ccrypto when others trade
                </Text>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.subtitle,
                  }}>
                  Referral ID
                </Text>

                <TouchableOpacity
                  onPress={() => copyToClipboard(referralData.url)}>
                  <View
                    style={{
                      backgroundColor:
                        THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      ...styles.referralContainer,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      {referralData != null ? referralData.url : ''}
                    </Text>

                    <Feather
                      name="copy"
                      size={heightPercentageToDP(3)}
                      color={COLORS.green}
                      style={{ alignSelf: 'center', opacity: 0.9 }}
                    />
                  </View>
                </TouchableOpacity>

                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.subtitle,
                  }}>
                  Referral Link
                </Text>

                <TouchableOpacity
                  onPress={() => copyToClipboard(referralData.url)}>
                  <View
                    style={{
                      backgroundColor:
                        THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      ...styles.referralContainer,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.subtitle,
                      }}>
                      {referralData != null ? referralData.url : ''}
                    </Text>

                    <Feather
                      name="copy"
                      size={heightPercentageToDP(3)}
                      color={COLORS.green}
                      style={{ alignSelf: 'center', opacity: 0.9 }}
                    />
                  </View>
                </TouchableOpacity>

                {/** social media container */}
                <View style={styles.socialMediaContainer}>
                  <TouchableOpacity
                    onPress={() => shareToSocialMedia('Facebook')}>
                    <View
                      style={{
                        backgroundColor:
                          THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      }}
                      className="rounded-md blur-sm p-2">
                      <FontAwesome5
                        name="facebook"
                        size={heightPercentageToDP(3)}
                        color={
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark
                        }
                        style={{ alignSelf: 'center', opacity: 0.9 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => shareToSocialMedia('whatsapp')}>
                    <View
                      style={{
                        backgroundColor:
                          THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      }}
                      className="rounded-md blur-sm p-2">
                      <FontAwesome5
                        name="whatsapp"
                        size={heightPercentageToDP(3)}
                        color={
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark
                        }
                        style={{ alignSelf: 'center', opacity: 0.9 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => shareToSocialMedia('instagram')}>
                    <View
                      style={{
                        backgroundColor:
                          THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      }}
                      className="rounded-md blur-lg p-2">
                      <FontAwesome5
                        name="instagram"
                        size={heightPercentageToDP(3)}
                        color={
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark
                        }
                        style={{ alignSelf: 'center', opacity: 0.9 }}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => shareToSocialMedia('twitter')}>
                    <View
                      style={{
                        backgroundColor:
                          THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                      }}
                      className="rounded-md blur-sm p-2">
                      <FontAwesome5
                        name="twitter"
                        size={heightPercentageToDP(3)}
                        color={
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark
                        }
                        style={{ alignSelf: 'center', opacity: 0.9 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/** middle component */}

              {/** middle left */}

              <View
                style={{
                  backgroundColor:
                    THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
                  ...styles.middleComponent,
                }}>
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                    ...styles.middleLeft,
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.green,
                      width: widthPercentageToDP(10),
                      opacity: 0.5,
                    }}
                    className="rounded-md blur-sm p-2">
                    <FontAwesome6
                      name="people-line"
                      size={heightPercentageToDP(2)}
                      color="white"
                      style={{ alignSelf: 'center', opacity: 1 }}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.title,
                    }}>
                    Your Community
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.referCount,
                    }}
                    numberOfLines={1}>
                    {referralData != null ? referralData.count_referrals : '0'}
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.referText,
                    }}>
                    Referrals
                  </Text>
                </View>

                {/** middle right */}
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                    ...styles.middleRight,
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.green,
                      width: widthPercentageToDP(10),
                      opacity: 0.5,
                    }}
                    className="rounded-md blur-sm p-2">
                    <FontAwesome6
                      name="indian-rupee-sign"
                      size={heightPercentageToDP(2)}
                      color="white"
                      style={{ alignSelf: 'center', opacity: 1 }}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.title,
                    }}>
                    Lifetime Rewards
                  </Text>
                  <Text style={styles.referCount} numberOfLines={1}>
                    {referralData != null ? referralData.total_reward : '0'}
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.referText,
                    }}>
                    {referralData != null ? referralData.total_reward : '0'}
                  </Text>
                </View>

                {/** Bottom Section */}
              </View>

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.BottomTitle,
                }}>
                Track your income with our unique two-tier referral system;
              </Text>

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.BottomSubTitle,
                }}>
                Crypto Money shares 20% of its trading fee profits from your
                direct and indirect referrals
              </Text>

              {/** Referral percentage bottom */}

              <View
                style={{
                  borderColor:
                    THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                  ...styles.referralBottom,
                }}>
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'LIGHT'
                        ? COLORS.lightGray
                        : COLORS.skyBlue,
                    borderColor:
                      THEME.data === 'LIGHT'
                        ? COLORS.lightGray
                        : COLORS.skyBlue,
                    ...styles.topReferralContainer,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      #
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Rewards Split
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Referrals
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(3),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}>
                      Amount Earned
                    </Text>
                  </View>
                </View>

                {/** Referral Data one */}

                <View style={styles.topReferralContainerData}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      #1
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      {referralData.referralLevel.first_level_percent}%
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      {referralData.referralLevel.first}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      ({referralData.referrals_1.total_amount_earned})
                    </Text>
                  </View>
                </View>

                {/** Referral Data Two */}

                <View style={styles.topReferralContainerData}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      #2
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      {referralData.referralLevel.second_level_percent}%
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      {referralData.referralLevel.second}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: heightPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.title,
                      }}
                      numberOfLines={1}>
                      ({referralData.referrals_2.total_amount_earned})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View
            style={{
              height: heightPercentageToDP(80),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loading />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
  },
  contentParentConatainer: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  referralContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: heightPercentageToDP(1.5),
    borderColor: COLORS.purpleDark,
    borderRadius: heightPercentageToDP(2),
  },
  socialMediaContainer: {
    height: heightPercentageToDP(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  middleComponent: {
    margin: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
    flexDirection: 'row',
  },
  middleLeft: {
    flex: 1,

    margin: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    gap: 5,
  },
  middleRight: {
    flex: 1,
    margin: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    gap: 5,
  },
  referCount: {
    color: COLORS.green,
    fontFamily: FONT.extrabold,
    fontSize: heightPercentageToDP(3),
  },
  referText: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  BottomTitle: {
    fontFamily: FONT.semibold,
    width: widthPercentageToDP(90),
    fontSize: heightPercentageToDP(2.5),
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: heightPercentageToDP(2),
  },
  BottomSubTitle: {
    fontFamily: FONT.regular,
    width: widthPercentageToDP(90),
    fontSize: heightPercentageToDP(2),
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: heightPercentageToDP(1),
  },
  referralBottom: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(2),
  },
  topReferralContainer: {
    flexDirection: 'row',
    borderRadius: heightPercentageToDP(2),
  },
  topReferralContainerData: {
    height: heightPercentageToDP(10),
    flexDirection: 'row',
  },
});
