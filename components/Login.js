import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isLoginTapped, setIsLoginTapped] = useState(false)

    const loginTapped = () => {
        setIsLoginTapped(true)
        alert("Validation pending")
        navigation.navigate("Dashboard")
    }

    const generateUniqueUser = () => {
        const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
        const random = Array.from(
            {length: 15},
            () => char[Math.floor(Math.random() * char.length)]
        );
        const randomString = random.join("");
        setName(randomString)
        setEmail(randomString+"@customer.io")
        alert("New User Created")
      }

  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
        <View style={styles.loginViewContainer}>
            <Text style={styles.headerText}>Ami App</Text>
            <Text style={styles.headerSubText}>React Native APN</Text>
        <View style={styles.nameView}>
            <Text style={[styles.labelText, {paddingTop: 0}]}>First Name</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(e) => setName(e.value)}
                  value={name}
                  placeholder='John D'
                />
          </View>
          <View style={styles.nameView}>
             <Text style={styles.labelText}>E-mail</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(e) => setEmail(e.value)}
                  value={email}
                  placeholder='you@company.com'
                />
          </View>
          <TouchableOpacity
          style={styles.loginButton}
          onPress={() => loginTapped()}
          underlayColor='#f194ff'>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.generateRandomLoginButton}
          onPress={() => generateUniqueUser()}
          >
          <Text style={styles.loginText, {color:'#3C437D', fontSize: 14, fontWeight: '600'}}>Generate random login</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            {/* <CIOLogo  width={200} height={127}/> */}
        </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    headerSubText: {
        fontFamily:'Avenir',
        fontSize: 15,
        color:'#343446',
        alignSelf: 'center',
        bottom : 100,
    },
    headerText : {
        fontFamily:'Avenir',
        fontSize: 30,
        color:'#343446',
        fontWeight: '700',
        alignSelf: 'center',
        bottom : 100,
    },
    loginView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        flex: 0.9,
    },
    generateRandomLoginButton: {
        alignSelf:'center',
        paddingBottom:10,
        marginBottom: 40,
    },
    loginViewContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent:'center'
      },
      innerContainer:{
        flex:1,
        margin: 30,
      },
      nameView: {
        flexDirection: 'column',
      },
      labelText: {
        padding: 20,
        paddingBottom:0,
        color: '#6f7488',
        fontFamily:'Avenir',
        fontWeight: '600'
      },
      input: {
        height: 40,
        margin: 20,
        marginTop:3,
        borderWidth: 1,
        borderRadius:5,
        borderColor:"#ebecf2",
        padding: 10,
        fontFamily:'Avenir',
        color: '#4b4b60'
      },
      loginButton:{
        padding:10,
        alignSelf:'center',
        paddingBottom:10,
        backgroundColor:'#3C437D',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 20,
        marginBottom: 20,
        width: '90%'
      },
      loginText:{
        color:'#fff',
        textAlign:'center',
        fontWeight: '600',
        paddingLeft : 10,
        paddingRight : 10
    },
    footer:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 35,
        marginLeft:-20
    }
})

export default Login;