# Ami app

This is a sample app using [Customer.io's React Native package](https://www.npmjs.com/package/customerio-reactnative). Ami app currently works only on iOS devices. The work to get it on Android is in progress.

# What all features can I test with Ami app ?
Ami app gives you flexibility to test multiple features such as :

- Package initialisation
- Identify user
- Clear user identify
- Track events
- Device attributes (default & custom)
- Profile attributes (default & custom)
- Push Notifications 
- Rich Push & deep links


# Getting Started
Ami app already includes all the dependencies required. To install the libraries using :
```
npm install
```
**iOS only**

iOS needs an additional step to install libraries using CocoaPods
```
cd ios
pod install
cd ..
```
**Note** : Make sure that the deployment target is set to minimum 10.0 in Xcode.

# Running the app
Use the following commands to run the app on iOS platform

```
npx react-native run-ios
```
**To run the app on device**