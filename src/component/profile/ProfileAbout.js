import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONT } from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProgressCircle from '../ProgressCircle';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ProfileAbout = ({ data }) => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

  console.log('Profile About Data :: ' + data);

  const profileData = data;

  // const [profileData, setProfileData] = useState(data);
  const navigation = useNavigation();
  const source = require('../../../assets/image/user_placeholder.png');

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // const getProfile = async () => {
  //   const apiUrl = URLHelper.BASE_URL + URLHelper.PROFILE;
  //   // const bearerToken =
  //   //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

  //   const headers = {
  //     userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
  //     Authorization: `Bearer ${ACCESS_TOKEN.data}`,
  //   };

  //   try {
  //     const response = await axios.get(apiUrl, {headers});
  //     console.log('REQUEST STARTED');
  //     console.log('Response:', response.data.user);

  //     // const id = response.data.user.id;
  //     // const name = response.data.user.first_name + response.data.user.last_name;
  //     // const email = response.data.user.email;
  //     // const phone = response.data.user.phone;
  //     // const avatar = response.data.user.photo;

  //     // AsyncStorage.setItem('cryptoUserId', id);
  //     // AsyncStorage.setItem('cryptoUserName', name);
  //     // AsyncStorage.setItem('cryptoUserEmail', email);
  //     // AsyncStorage.setItem('cryptoUserPhone', phone);
  //     // AsyncStorage.setItem('cryptoUserAvatar', avatar);

  //     setProfileData(response.data.user);
  //     console.log('REQUEST STOPPED');
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error:', error.response);
  //     } else {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // };

  return (
    <SafeAreaView>
      {profileData ? (
        <View
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.container,
          }}>
          <Image
            source={require('../../../assets/image/bitcoin_image.jpg')}
            style={styles.centerImage}
          />

          <View style={styles.containerLeft}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Image
                source={{
                  uri: profileData.photo,
                }}
                className="rounded-full"
                style={styles.profileImage}
              />

              <TouchableOpacity
                style={styles.profileImageEdit}
                className="rounded-full p-2"
                onPress={() => navigation.navigate('UpdateProfile')}>
                <AntDesign
                  name="edit"
                  size={heightPercentageToDP(2)}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerRight}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.name,
              }}
              numberOfLines={2}
            >
              {profileData.first_name + ' ' + profileData.last_name}
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.email,
              }}>
              {profileData.email ? profileData.email : ''}
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.number,
              }}>
              {profileData.phone ? profileData.phone : ''}
            </Text>
          </View>
        </View>
      ) : (
        <ProgressCircle />
      )}
    </SafeAreaView>
  );
};

export default ProfileAbout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    width: '100%',
    height: heightPercentageToDP(30),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
  },
  email: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2.5),
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(3),
  },
  number: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },

  centerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  containerLeft: {
    width: heightPercentageToDP(20),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerRight: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    width: heightPercentageToDP(15),
    height: heightPercentageToDP(15),
    marginStart: heightPercentageToDP(2),
    resizeMode: 'cover',
    alignSelf: 'center',
    zIndex: 1,
  },
  profileImageEdit: {
    position: 'absolute',
    backgroundColor: COLORS.green,
    alignSelf: 'center',
    left: heightPercentageToDP(15),
    top: heightPercentageToDP(16),
    zIndex: 2,
  },
});
