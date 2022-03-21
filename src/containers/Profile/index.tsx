import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { Button } from 'native-base';
import SlideRightView from '../../components/SlideRightView';
import { useAuthContext } from '../../contexts/AuthContext';

interface Props {
    navigation: any;
}
const Profile: React.FC<Props> = ({navigation}) => {

    const [animation, setAnimation] = useState<any>();
    const { signOut } = useAuthContext();

    React.useEffect(() => {
        if(animation) {
            animation.play();
        }
    },[animation])
    return (
        <SlideRightView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <LottieView
                ref={animation => setAnimation(animation)}
                style={{
                    width: 400,
                    height: 400,
                }}
                source={require('../../../assets/animations/boat-sailing.json')}
            />
            <Button onPress={() => signOut()}>Logout</Button>
        </SlideRightView>
    )
}

export default Profile;