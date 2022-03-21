import LottieView from 'lottie-react-native';
import React from 'react';
import SlideRightView from '../components/SlideRightView';

const Loading: React.FC = () => {

    const [animation , setAnimation] = React.useState<any>();

    React.useEffect(() => {
        if (animation) {
            animation.play();
        }
    },[animation])
    return (
        <SlideRightView style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <LottieView
                ref={animation => {
                    setAnimation(animation);
                }}
                style={{
                    width: 400,
                    height: 400,
                }}
                source={require('../../assets/animations/loading.json')}
            />
        </SlideRightView>
    )
}

export default Loading;