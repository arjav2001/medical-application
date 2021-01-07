import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Registration from './screens/Registration.js'
import Meds from './screens/Meds.js'
import LoginPage from './screens/LoginPage'
import PatientSearch from './screens/PatientSearch.js'
import PharmPage from './screens/PharmPage.js'
import DoctorPage from './screens/DoctorPage.js'
import History from './screens/History.js'
import Log from './screens/Log.js'
import Stores from './screens/Stores.js'
import ChangeStores from './screens/ChangeStores.js'
import Button from './Button.js'
import Calendar from './screens/Calendar.js'
import ComplaintPage from './screens/ComplaintPage.js'
import PatientSearchPharm from './screens/PatientSearchPharm.js'
import AnalystHome from './screens/AnalystHome.js'

const Login = createStackNavigator()
const Doctor = createStackNavigator()
const Nurse = createStackNavigator()
const Pharm = createStackNavigator()
const Analyst = createStackNavigator()

function MyLogin() {
  return (
    <Login.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Login.Screen name="Login" component={LoginPage}
        options={{headerShown: false}}
      />
      <Login.Screen name="Doctor" component={MyDoctor}/>
      <Login.Screen name="Nurse" component={MyNurse} />
      <Login.Screen name="Pharm" component={MyPharm} />
      <Login.Screen name="Analyst" component={MyAnalyst} />
    </Login.Navigator>
  )
}

function MyAnalyst() {
  return (
    <Analyst.Navigator>
      <Analyst.Screen name="Home" component={AnalystHome} />
    </Analyst.Navigator>
  )
}

function MyPharm() {
  return (
    <Pharm.Navigator>
      <Pharm.Screen name="PatientSearch" component={PatientSearchPharm}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Search",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Pharm.Screen name="Meds" component={PharmPage}
        options={{headerShown: false}}
      />
      <Pharm.Screen name="Stores" component={Stores}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Stores",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Pharm.Screen name="Log" component={Log}
        options={{headerShown: false}}
      />
      <Pharm.Screen name="Change" component={ChangeStores}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Change Stores",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
    </Pharm.Navigator>
  )
}

function MyNurse() {
  return (
    <Nurse.Navigator>
      <Nurse.Screen name="Registration" component={Registration}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
    </Nurse.Navigator>
  )
}

function MyDoctor() {
  return (
    <Doctor.Navigator>
      <Doctor.Screen name="PatientSearch" component={PatientSearch}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Search",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Doctor.Screen name="Meds" component={DoctorPage}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "New Complaint",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Doctor.Screen name="History" component={History}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "History",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Doctor.Screen name="Log" component={Log}
        options={{headerShown: false}}
      />
      <Doctor.Screen name="Stores" component={Stores}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Stores",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Doctor.Screen name="Change" component={ChangeStores}
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Change Stores",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
      <Doctor.Screen name="ComplaintPage" component={ComplaintPage}
        options={{headerShown: false}}
      />
      <Doctor.Screen name="Calendar" component={Calendar} 
        options={({ navigation, route }) => ({
          headerStyle: styles.header,
          headerTitle: "Calendar",
          headerTitleAlign: 'center',
          headerLeft: () => (
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.goBack()
            //   }}
            // >
            //   <Text>Go Back</Text>
            // </TouchableOpacity>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          )
        })}
      />
    </Doctor.Navigator>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyLogin />
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#5effea'
  }
});
