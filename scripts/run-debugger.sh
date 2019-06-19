PROCESS_NAME="React Native Debugger"
if [ -e "/Applications/React Native Debugger.app" ] > /dev/null; then
  if pgrep $PROCESS_NAME; then
    echo 'Debugger is already running';
  else
    echo 'Starting React Native Debugger';
    open 'rndebugger://set-debugger-loc?host=localhost&port=8081';
  fi
else
  echo "React Native Debugger is not installed please run 'brew cask install react-native-debugger'";
fi;