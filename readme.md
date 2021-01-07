Change name project app

\$ npx react-native-rename <newName>
With custom Bundle Identifier (Android only. For iOS, please use Xcode)

\$ npx react-native-rename <newName> -b <bundleIdentifier>

Then, Rename your app
\$ npx react-native-rename "Travel App"
With custom Bundle Identifier

\$ npx react-native-rename "Travel App" -b com.junedomingo.travelapp

---

Compile APK debug without server JS for installR
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

---

-- Add SplashScreen tuto
https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9

-- React native app version
npm i react-native-version-info
