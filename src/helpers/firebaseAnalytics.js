import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

const firebaseAnalytics = () => {

  useEffect(() => {
    firebase.app();
    
  }, [])
  

  async function addCustomEvent() {
    await analytics().logEvent('custom_event', {
      id: '123123',
      value: 'value',
      variable: 'variable',
    });
  }

  async function onSignIn() {
    await Promise.all([
      analytics().setUserId(User.uid),
      analytics().setUserProperty('account_balance', User.balance),
    ]);
  }

  async function onSignOut() {
    await analytics().resetAnalyticsData();
  }

}

export default firebaseAnalytics