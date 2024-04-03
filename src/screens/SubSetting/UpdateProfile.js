import { Platform, StatusBar } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import HeaderTop from '../../component/profile/HeaderTop';
import { COLORS, FONT } from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import Toast from 'react-native-toast-message';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';



const UpdateProfile = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();
  const source = require('../../../assets/image/user_placeholder.png');
  const [imageSource, setImageSource] = useState(null);

  const [firstNameVal, setFirstName] = useState('');
  const [secondNameVal, setSecondName] = useState('');

  const [showProgressBar, setProgressBar] = useState(false);

  const checkAndRequestPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (result === RESULTS.DENIED) {
      if (Platform.OS === 'android' && Platform.Version <= 29) { // Target Android 10 and above
        const permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('Permission not granted!');
          Toast.show({
            type: 'info',
            text1: 'Permission not granted!'
          })
          return;
        }

      }
    }
    // Call your DocumentPicker.pick() function here
    selectDoc();
  };

  // For Opening PhoneStorage
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      // const doc = await DocumentPicker.pickSingle()
      // const doc = await DocumentPicker.pickMultiple({
      //   type: [ DocumentPicker.types.images]
      // })
      if (doc) {
        console.log(doc);
        console.log(doc[0].uri);
        setImageSource({ uri: doc[0].uri });
      }

    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  // for uploading Profile content
  const handleUpdateProfile = async () => {
    if (!firstNameVal) {
      // console.error('Enter your first name');
      Toast.show({
        type: 'error',
        text1: 'Enter your first name',
      });
    } else if (!secondNameVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter your second name',
      });
      // console.error('Enter your second name');
    } else if (!imageSource) {
      Toast.show({
        type: 'error',
        text1: 'Add profile picture',
      });
      // console.error('Add profile picture');
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

        // Resize the image
        try {
          console.log('Started Compressing Image');
          const resizedImage = await ImageResizer.createResizedImage(
            imageSource.uri,
            200, // Adjust the dimensions as needed
            200, // Adjust the dimensions as needed
            'JPEG',
            100, // Image quality (0-100)
            0, // Rotation (0 = no rotation)
            null,
          );

          console.log('Compressed Image :: ' + resizedImage.size);
          setImageSource(resizedImage);

          if (imageSource) {
            formData.append('photo', {
              uri: resizedImage.uri,
              type: 'image/jpeg',
              name: 'profile.jpg',
            });
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error resizing the image',
            text2: error,
          });
          // console.error('Error resizing the image:', error);
        }

        const response = await axios.post(
          'https://www.hostmansa.com/crypto/public/api/update-profile',
          formData,
          {
            headers: {
              userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
              Authorization: `Bearer ${ACCESS_TOKEN.data}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('Profile updated successfully:', response.data);
        // console.warn('Profile updated successfully:');
        Toast.show({
          type: 'error',
          text1: 'Profile updated successfully',
        });
        setProgressBar(false);
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
        console.log(error);

        // if (error.response) {
        //   Toast.show({
        //     type: 'error',
        //     text1: error.response.data,
        //   });
        //   // console.error(
        //   //   'Request failed with status code',
        //   //   error.response.status,
        //   // );
        //   console.log('Response data:', error.response.data);
        // } else if (error.request) {
        //   Toast.show({
        //     type: 'error',
        //     text1: error.response.data,
        //   });
        //   console.error('Request was made, but no response was received');
        // } else {
        //   console.error('Error setting up the request:', error.message);
        // }
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
      <StatusBar style="light" hidden={false} />
      <HeaderTop value={'UpdateProfile'} />
      <ScrollView>
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
          }}>
          {/** Update Profile Content */}
          <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              borderColor:
                THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
              ...styles.profileTopContainer,
            }}>
            {/** For Profile */}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Image
                source={imageSource ? imageSource : source}
                className="rounded-full"
                style={styles.profileImage}
              />

              <TouchableOpacity
                style={styles.profileImageEdit}
                className="rounded-full p-2"
                onPress={checkAndRequestPermission}>
                <Feather
                  name="upload"
                  size={heightPercentageToDP(2.5)}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/** Input Zone */}

          <View style={styles.inputContainer}>
            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                First name
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholder="Enter your first name"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.white : COLORS.gray2
                }
                onChangeText={setFirstName}
                value={firstNameVal}></TextInput>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Last name
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholder="Enter your last name"
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.white : COLORS.gray2
                }
                onChangeText={setSecondName}
                value={secondNameVal}></TextInput>
            </View>
          </View>

          {showProgressBar && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: heightPercentageToDP(3),
              }}>
              <Progress.Circle size={30} indeterminate={true} />
            </View>
          )}

          <TouchableOpacity
            style={{ margin: heightPercentageToDP(2) }}
            onPress={handleUpdateProfile}>
            <Text
              style={{
                fontFamily: FONT.bold,
                backgroundColor: COLORS.green,
                textAlign: 'center',
                padding: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                color: COLORS.white,
                overflow: 'hidden'
              }}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
  },

  profileTopContainer: {
    height: heightPercentageToDP(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(1),
    marginEnd: heightPercentageToDP(1),
    borderWidth: 1,
    borderRadius: 5,
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
    top: heightPercentageToDP(6),
    zIndex: 2,
  },
  userNameInput: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 10,
    padding: heightPercentageToDP(1),
  },
  inputContainer: {
    width: widthPercentageToDP(100),
    padding: heightPercentageToDP(2),
    alignItems: 'stretch',
    gap: heightPercentageToDP(1),
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
    fontSize: heightPercentageToDP(2),
    margin: 5,
  },
});

// import React, {useState} from 'react';
// import {View, Text, Button, Image, Platform} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import { err } from 'react-native-svg/lib/typescript/xml';

// const ProfilePictureSelector = () => {
//   const [imageSource, setImageSource] = useState(null);

//   const pickImage = async () => {
//     const options = {
//       title: 'Select Image',
//       customButtons: [
//         {name: 'customOptionKey', title: 'Choose file from Custom Option'},
//       ],
//       storageOptions: {skipBackup: true, path: 'images'},
//     };

//     try {
//       const response = await ImagePicker.showImagePicker(options);

//       if (response.didCancel) {
//         // User cancelled image picker
//         console.log('response.didCancel')
//       } else if (response.error) {
//         // ImagePicker Error
//         console.log('response.error')
//       } else if (response.customButton) {
//         // User tapped custom button
//         console.log('response.custombutton')
//       } else {
//         // User picked an image
//         // Update your profile picture with the picked image
//         console.log('pure else')
//       }
//     } catch (error) {
//       // ImagePicker error
//       console.log('error')
//       console.log('error' +error)
//     }
//   };

//   return (
//     <View>
//       {imageSource && (
//         <Image source={imageSource} style={{width: 200, height: 200}} />
//       )}
//       <Button title="Select Profile Picture" onPress={pickImage} />
//     </View>
//   );
// };

// export default ProfilePictureSelector;
// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import * as Progress from 'react-native-progress';

// const UploadScreen = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // Mock upload function for demonstration purposes
//   const uploadFile = async () => {
//     // Simulate a delay for demonstration
//     const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//     // Upload process simulation
//     for (let i = 0; i <= 100; i += 10) {
//       setUploadProgress(i / 100);
//       await delay(1000); // Simulate a 1-second delay per 10% progress
//     }

//     // Reset the progress bar
//     setUploadProgress(0);
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Upload Progress</Text>
//       <Progress.Bar
//         progress={uploadProgress}
//         width={200}
//         height={20}
//         borderRadius={5}
//         borderColor="black"
//         color="blue"
//       />
//       <Progress.Pie progress={uploadProgress} size={50} />
//       <Progress.Circle size={30} indeterminate={true} />
//       <Progress.CircleSnail color={['red', 'green', 'blue']} />
//       <Text>{Math.round(uploadProgress * 100)}%</Text>
//       <TouchableOpacity onPress={uploadFile}>
//         <Text>Start Upload</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UploadScreen;
