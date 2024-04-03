import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONT} from '../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchCoinMarket} from '../../stores/coinMarketSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const Search = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const coins = useSelector(state => state.coinMarket.coins);

  const tickerData = useSelector(state => state.websocket.tickerData);

  // const [data, setData] = useState(coins);
  const [filteredData, setFilteredData] = useState(tickerData);

  const handleSearch = text => {
    const filtered = tickerData.filter(item =>
      item.s.toLowerCase().includes(text.toLowerCase()),
    );

    // console.log('MINE DATA FILTER :: ' + filtered[0].s);
    // console.log('MINE DATA FILTER LENGTH :: ' + filtered.length);
    setFilteredData(filtered);
  };

  const setTextToSearchView = val => {
    console.log('Selected Asset :: ' + val);
    handleSearch(val);
  };

  useDispatch(() => {
    dispatch(fetchCoinMarket());
  }, []);

  console.log('MINE FILETER DATA LENGTH :: ' + filteredData.length);

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: widthPercentageToDP(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            name={'arrowleft'}
            size={heightPercentageToDP(3)}
            color={THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.searchInput,
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              padding: heightPercentageToDP(2)
            }}
            placeholder="Search"
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.gray2}></TextInput>
        </View>
      </View>

      {/** content Container */}

      <View
        style={{
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
          ...styles.container,
        }}>
        {filteredData ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{}}
            renderItem={({item, index}) => {
              let priceColor =
                item.P == 0
                  ? COLORS.gray
                  : item.P > 0
                  ? COLORS.green
                  : COLORS.red;

              return (
                <TouchableOpacity
                  key={index.toString()}
                  style={{
                    height: heightPercentageToDP(6),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      THEME.data === 'LIGHT'
                        ? COLORS.lightGray
                        : COLORS.skyBlue,
                    marginVertical: heightPercentageToDP(1),
                    borderRadius: heightPercentageToDP(1),
                    padding: heightPercentageToDP(1),
                    marginHorizontal: heightPercentageToDP(1),
                  }}
                  onPress={() => {
                    console.log('Pressed');

                    console.log(index.toString());
                    navigation.navigate('AssetDetails', {
                      itemId: item,
                      itemIndex: index.toString(),
                    });
                  }}>
                  {/** LOGO */}

                  {/** NAME */}

                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        fontFamily: FONT.bold,
                        fontSize: heightPercentageToDP(1.5),
                      }}>
                      {item.s}
                    </Text>
                  </View>

                  {/** FIGURES */}

                  <View>
                    <Text
                      style={{
                        textAlign: 'right',
                        fontSize: heightPercentageToDP(1.5),
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        fontFamily: FONT.medium,
                      }}>
                      {item.p}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      {item.minimum_buy_amount != 0 && (
                        <AntDesign
                          name="caretup"
                          size={heightPercentageToDP(1.2)}
                          color={priceColor}
                          style={{alignSelf: 'center', marginRight: 5}}
                        />
                      )}

                      <Text
                        style={{
                          marginLeft: 5,
                          color: priceColor,
                          fontFamily: FONT.regular,
                          lineHeight: 15,
                          padding: 2,
                          fontSize: heightPercentageToDP(1.2),
                          textAlignVertical: 'center',
                          textAlign: 'center',
                        }}>
                        {item.P}%
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: 10,
                  paddingBottom: heightPercentageToDP(10),
                }}></View>
            }
          />
        ) : (
          <LinearGradient
            colors={[
              THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
            ]}
            style={{
              height: heightPercentageToDP(30),
              margin: heightPercentageToDP(2),
              borderRadius: heightPercentageToDP(2),
            }}></LinearGradient>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    height: heightPercentageToDP(10),

    flexDirection: 'row',
    padding: heightPercentageToDP(1),
  },
  searchInput: {
    alignSelf: 'stretch',
    borderRadius: heightPercentageToDP(2),
    paddingStart: heightPercentageToDP(1),
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentContainerLeft: {
    flex: 1,
    backgroundColor: 'pink',
  },
  contentContainerRight: {
    flex: 1,
    backgroundColor: 'green',
  },
});
