import 'dotenv/config';

export default {
  expo: {
    name: 'my-calendar',
    slug: 'my-calendar',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/my-calendar_v1.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: 'com.ryoooosk.mycalendar',
      infoPlist: {
        GIDClientID: process.env.GID_CLIENT_ID,
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              'com.googleusercontent.apps.263177566185-drbk0phvhgda95ijl0gen0e081oe3utg',
            ],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.ryoooosk.mycalendar',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/my-calendar_v1.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-apple-authentication',
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
