import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Store from '../../stores/Store';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Hcontainer from '../screens/Hcontainer';
import Onboard from '../screens/Onboard';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import Toast from 'react-native-toast-message';
import Investment from '../screens/Investment';
import MyInvestment from '../screens/MyInvestment';
import Profile from '../screens/Profile';
import Trade from '../screens/Trade';
import Wallet from '../screens/Wallet';
import AssetDetails from '../screens/AssetDetails';
import PL from '../screens/PL';
import GoogleAuthPassword from '../screens/GoogleAuthPassword';
import Verification from '../screens/SubSetting/Verification';
import KnowYourCrypto from '../screens/SubSetting/KnowYourCrypto';
import Rewards from '../screens/SubSetting/Rewards';
import HelpDesk from '../screens/SubSetting/HelpDesk';
import TradeListing from '../screens/TradeListing';
import Search from '../screens/Search';
import UpdateProfile from '../screens/SubSetting/UpdateProfile';
import DepositScreen from '../screens/SubSetting/DepositScreen';
import WithdrawScreen from '../screens/SubSetting/WithdrawScreen';
import InvestmentDetails from '../screens/InvestmentDetails';
import CreateTicket from '../component/helpdesk/CreateTicket';
import UpiDeposit from '../screens/SubSetting/deposit/UpiDeposit';
import BankDeposit from '../screens/SubSetting/deposit/BankDeposit';
import WithdrawCrypto from '../screens/SubSetting/withdraw/WithdrawCrypto';
import WithdrawBank from '../screens/SubSetting/withdraw/WithdrawBank';
import WithdrawUpi from '../screens/SubSetting/withdraw/WithdrawUpi';
import MyInvestmentDetails from '../screens/MyInvestmentDetails';
import Setting from '../screens/Setting';
import History from '../screens/History';
import Payment from '../screens/Payment';
import NotificationTab from '../screens/NotificationTab';
import ProfitAndLoss from '../screens/ProfitAndLoss';
import TicketDetails from '../screens/SubSetting/TicketDetails';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Hcontainer" component={Hcontainer} />
          <Stack.Screen name="Onboard" component={Onboard} />

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          <Stack.Screen name="Investment" component={Investment} />
          <Stack.Screen name="MyInvestment" component={MyInvestment} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Trade" component={Trade} />
          <Stack.Screen name="Wallet" component={Wallet} />

          <Stack.Screen name="PL" component={PL} />
          <Stack.Screen
            name="GoogleAuthPassword"
            component={GoogleAuthPassword}
          />

          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="KnowYourCrypto" component={KnowYourCrypto} />
          <Stack.Screen name="Rewards" component={Rewards} />
          <Stack.Screen name="HelpDesk" component={HelpDesk} />
          <Stack.Screen name="TradeListing" component={TradeListing} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="AssetDetails" component={AssetDetails} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="DepositScreen" component={DepositScreen} />
          <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />

          <Stack.Screen
            name="InvestmentDetails"
            component={InvestmentDetails}
          />
          <Stack.Screen name="CryptoDeposit" component={CreateTicket} />
          <Stack.Screen name="UpiDeposit" component={UpiDeposit} />
          <Stack.Screen name="BankDeposit" component={BankDeposit} />

          <Stack.Screen name="WithdrawCrypto" component={WithdrawCrypto} />
          <Stack.Screen name="WithdrawBank" component={WithdrawBank} />

          <Stack.Screen name="WithdrawUpi" component={WithdrawUpi} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="MyInvestmentDetails"
            component={MyInvestmentDetails}
          />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="NotificationTab" component={NotificationTab} />
          <Stack.Screen name="ProfitAndLoss" component={ProfitAndLoss}/>
          <Stack.Screen name="TicketDetails" component={TicketDetails}/>
        </Stack.Navigator>

        <Toast
          position="top"
          autoHide={true}
          visibilityTime={2000}
          onPress={() => Toast.hide()}
        />
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
