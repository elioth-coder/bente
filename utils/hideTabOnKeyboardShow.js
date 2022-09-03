import { Keyboard } from "react-native"

export default function hideTabBarOnKeyboardShow(navigation) {
  const _keyboardDidShow = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }
  
  const _keyboardDidHide = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'flex' },
    });
  }  

  return {
    addKeyboardEventListener: () => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);  
    },
    removeKeyboardEventListener: () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    }
  }
}