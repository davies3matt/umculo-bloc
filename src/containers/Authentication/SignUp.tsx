import { Input, Stack, Center, Heading, Icon, Button, Link, InputLeftAddon, InputGroup, Image } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { formatPhoneNumber } from '../../utils/helpers';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

interface Props {
    navigation: any;   
}

interface SignUpProps {
    phoneNumber: string,
    email: string,
    password: string
}
const SignUp: React.FC<Props> = ({navigation}) => {

    const handleSignUp = async (values: SignUpProps) => {
        const { phoneNumber, email , password } = values;
        try {
            const user = await Auth.signUp({
                username: phoneNumber,
                password: password,
                attributes: {
                    email: email,
                    phone_number: phoneNumber
                }
            });
            console.log(user);
            navigation.navigate('VerifyCode', {username: phoneNumber});
        } catch (err) {
            console.log(err);
        }
    }

    const [userDetails, setUserDetails] = React.useState({
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [visibility, setVisibility] = React.useState(false);
    return (
        <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
        <View style={styles.container}>
            <Stack
                space={4}
                w={{
                    base: "75%",
                    md: "25%",
                }}
            >
            <Image 
                width={500}
                height={100}
                source={require('../../../assets/Images/house-board.png')}
                alt='house-board-logo'
            />
            <Center>
                <Heading textAlign="center" mb="10">
                Sign Up
                </Heading>
            </Center>
            <InputGroup >
            <InputLeftAddon children={`🇿🇦 +27`}/>
            <Input 
                w={{
                    base: "80%",
                    md: "100%",
                }}
                size='2xl'
                placeholder="Mobile Number" 
                textContentType='telephoneNumber'
                keyboardType='phone-pad'
                onChangeText={text => {
                    setUserDetails({
                    ...userDetails,
                    phoneNumber: text.replace(/[1-9][^0-9+]/g, '')
                })}} 
            />
            </InputGroup>
            <Input 
                size='2xl'
                placeholder="Email" 
                textContentType='emailAddress'
                autoCapitalize='none'
                onChangeText={text => {
                    setUserDetails({
                    ...userDetails,
                    email: text
                })}}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="email" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }       
            />
            <Input 
                size='2xl'
                placeholder='Password'
                textContentType='password'
                onChangeText={text => setUserDetails({
                    ...userDetails,
                    password: text
                })}
                type={visibility ? '' : 'password'}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="lock" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
                InputRightElement={
                    <Icon
                        style={{marginRight: '5%'}}
                        onPress={() => setVisibility(!visibility)}
                        as={<MaterialIcons name={visibility ? 'visibility'  : 'visibility-off'} />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
            />
            <Input 
                size='2xl'
                placeholder='Confirm Password'
                type={visibility ? '' : 'password'}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="lock" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
                InputRightElement={
                    <Icon
                        style={{marginRight: '5%'}}
                        onPress={() => setVisibility(!visibility)}
                        as={<MaterialIcons name={visibility ? 'visibility'  : 'visibility-off'} />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
            />
            <Button
                variant='subtle'
                onPress={() => handleSignUp(userDetails)}
            >Sign Up</Button>
            </Stack>
            <Link onPress={() => navigation.navigate('Login')} style={{marginTop: '5%'}}>Login</Link>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default SignUp;