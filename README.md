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
**To run the app on iOS Simulator**

Use the following commands to run the app on iOS Simulator

```
npx react-native run-ios
```
**To run the app on device**

To run using terminal

```
react-native run-ios --device "Max's iPhone"
```
To run using Xcode
- Jump into ios folder and open ```.xcworkspace``` file
- Select the device from the list of devices available
- Run the app 

# Testing the package using app 

**Initialising the package**

Package gets initialised as soon as you launch the application.
You need to change Site Id & API key in `Env.js` file to use your own workspace.
```
const Env = {
    siteId: "YourSiteId",
    apiKey: "YourApiKey"
}
```
Once this change is made, save and run the app.


