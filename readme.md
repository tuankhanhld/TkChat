## Installation

Install node modules using packet manager with `npm`:
```bash
npm install
```

Or with `yarn`:
```bash
yarn install
```

Install pod packages
```bash
cd ios
pod install
```
 
## Setup target server URL
1. In root folder, go to `.env` file.
2. Enter correct the target API URL.

## Run application on different environment
- Script run development mode:
```bash
ENVFILE=.env react-native run-android
```
- Script run development mode as PROD:
```bash
ENVFILE=.env.production react-native run-android
```

## Errors solving
1. Error might appear when installing `Pod` packages.
    - Error like:
        >CocoaPods could not find compatible versions for pod "React/Core":
          In Podfile:
            react-native-fetch-blob (from `../node_modules/rn-fetch-blob`) was resolved to 0.10.6, which depends on
              React/Core
    - Resolve by go to root folder and run script
        >``bash
            grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
        ``
    - Go back ios folder and rerun `pod install`
