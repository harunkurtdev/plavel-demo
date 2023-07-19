import { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

import { useNavigation } from '@react-navigation/native';


import { Image, Button, View, SafeAreaView } from 'react-native';
import { Images } from "../constants/images";


// class PlavelImage extends React.Component {
//   render() {
//       return (
//           <Image
//               // source={Images.plavel}
//               style={{ width: 125, height: 50, margin: 4 }}
//               resizeMode="contain"
//           />
//       );
//   }
// }

function LoginScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'plavel',
      header: () => (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            source={Images.plavel}
            style={{ width: 125, height: 50, marginTop: 80 }}
            resizeMode="contain"
          />
        </View>
      ),
      headerLeft: () => (
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="black"
        />
      ),
    });
  }, [navigation]);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }



  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
