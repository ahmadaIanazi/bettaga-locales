import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import themeContext from '../../themes/theme';
import { useContext, useEffect, useState } from 'react';
import { numberOfAllowedSelectedTags } from '../../K/rules';
import { useKeyboard } from '../../hooks/useKeyboard';
import usePushNotificationValidator from '../../yup/usePushNotificationValidation';
import { useCardStore } from '../../state/useCardStore';
import { hexOrRgbToRgba } from '../../utils/hexOrRgbToRgba';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Button, Div, Toast } from '../../../customized';
import { SendMessageToAllPasses } from '../../operations/SendMessageToAllPasses';
import { SendMessageToAllCards } from '../../operations/SendMessageToAllCards';
import { useUserStore } from '../../state/useUserStore';

const { width } = Dimensions.get('screen');

export default function Push({ card, cards, handlePushNotification, setSeeAllPush }) {
  const color = useContext(themeContext);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [focused, setFocused] = useState(false);
  const [customersCount, setCustomersCount] = useState(0);
  const keyboardOpen = useKeyboard() > 0;
  const keyboardHeight = useKeyboard();
  const [isSingleCard, setSingleCard] = useState(false);
  const [pushContent, setPushContent] = useState('');
  const isValid = usePushNotificationValidator(pushContent);
  const [allSelected, setSelected] = useState(false);
  const [alert, setAlert] = useState(false);
  const placeholder = 'Send a push notification...';
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAnonymous } = useUserStore();

  const {
    cardState,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const backgroundOpacityColor = isDarkLight;

  useEffect(() => {
    if (cards == null || cards == undefined) {
      setSingleCard(true);
      setSelectedTagIds([card.id]);
      setCustomersCount(card.customersCount);
    }
  }, [card, cards]);

  const handleSelectTag = (id, selectAll = false) => {
    if (selectAll) {
      if (selectedTagIds?.length === cards?.length) {
        setSelectedTagIds([]);
        setCustomersCount(0);
      } else {
        setSelectedTagIds(cards.map((card) => card.id));
        const totalCustomersCount = cards.reduce((total, card) => total + card.customersCount, 0);
        setCustomersCount(totalCustomersCount);
      }
    } else {
      setSelectedTagIds((prevIds) => {
        if (prevIds.includes(id)) {
          const updatedIds = prevIds.filter((prevId) => prevId !== id);
          const totalCustomersCount = cards.reduce((total, card) => {
            if (updatedIds.includes(card.id)) {
              return total + card.customersCount;
            } else {
              return total;
            }
          }, 0);
          setCustomersCount(totalCustomersCount);
          return updatedIds;
        } else if (prevIds?.length < numberOfAllowedSelectedTags) {
          const updatedIds = [...prevIds, id];
          const totalCustomersCount = cards.reduce((total, card) => {
            if (updatedIds.includes(card.id)) {
              return total + card.customersCount;
            } else {
              return total;
            }
          }, 0);
          setCustomersCount(totalCustomersCount);
          return updatedIds;
        } else {
          const updatedIds = prevIds.slice(1).concat(id);
          const totalCustomersCount = cards.reduce((total, card) => {
            if (updatedIds.includes(card.id)) {
              return total + card.customersCount;
            } else {
              return total;
            }
          }, 0);
          setCustomersCount(totalCustomersCount);
          return updatedIds;
        }
      });
    }
  };

  const CardTag = ({ item }) => {
    const cardColor = item.cardColor;
    const cardIconColor = item.cardColor;
    const cardTextColor = item.textColor;
    const cardName = item.cardName;
    const isSelected = selectedTagIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.tag,
          isSelected && styles.selectedTag,
          {
            backgroundColor: isSelected ? 'black' : cardColor,
            borderColor: color.action,
            borderWidth: isSelected ? 2 : 0,
          },
        ]}
        onPress={() => handleSelectTag(item.id)}
      >
        <View
          style={[styles.cardTagIcon, { backgroundColor: isSelected ? cardIconColor : 'white' }]}
        ></View>
        <Text style={{ color: isSelected ? 'white' : cardTextColor }}>{cardName}</Text>
      </TouchableOpacity>
    );
  };

  const CardTagAll = () => {
    const tagColor = color.primary;

    const handleSelectAllTags = () => {
      setSelected((prevSelected) => !prevSelected);
      handleSelectTag(null, true);
    };

    return (
      <TouchableOpacity
        onPress={handleSelectAllTags}
        style={[styles.tag, { backgroundColor: allSelected ? 'black' : tagColor }]}
      >
        <Text style={{ color: 'white' }}>All</Text>
      </TouchableOpacity>
    );
  };

  const closeKeyboard = () => {
    Keyboard.dismiss()
  }

  const handleOnFocus = () => {
    if (isSingleCard) {
      setSeeAllPush(true);
    }
    setFocused(true);
  };
  const handleOnBlur = () => {
    if (isSingleCard) {
      setSeeAllPush(false);
    }
    setFocused(false);
  };

  const viewMainStyle = {
    zIndex: 100,
    flex: 1,
    position: focused ? 'absolute' : 'relative',
    bottom: keyboardOpen ? keyboardHeight : 0,
    backgroundColor: focused ? (isSingleCard ? backgroundOpacityColor : color.background ) : 'transparent',
  };

  const handlePushNotificationSend = () => {
    setAlert(!alert);
    setErrorMessage('');
    if (isValid) {
      setLoading(true);
      setError(false);
      const filteredPushContent = pushContent;

      const cardIds = selectedTagIds;
      SendMessageToAllCards(cardIds, filteredPushContent, customersCount)
        .then(() => {
          setIsPushAvailable(true);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage('Error when sending message:', err);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
      setErrorMessage('This Message is not valid.');
    }
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const linear = [hexOrRgbToRgba(backgroundOpacityColor, 0), backgroundOpacityColor];
  const linearWhite = [color.transparent, color.background];

  return (
    <View style={viewMainStyle}>
      {loading ? (
        <ActivityIndicator
          style={{ alignSelf: 'center', position: 'absolute', bottom: width / 2, left: width / 2 }}
          size={'large'}
          color={color.text}
        />
      ) : (
        focused && (
          <>
            <LinearGradient colors={isSingleCard ? linear : linearWhite} style={styles.linear} />
            <TouchableOpacity
              onPress={closeKeyboard}
              style={{ alignSelf: 'flex-end', padding: 20 }}
            >
              <Text style={{ color: color.text, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
            <View
              style={{ width, height: 200, justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Text>{}</Text>
              <Text style={{ color: color.text }}>{`to ${customersCount} customers`}</Text>
              {error && <Text style={{ color: color.text }}>{errorMessage}</Text>}
            </View>
            {alert && !isAnonymous && (
              <Alert
                title='Are you sure?'
                message='You are about to send a Push Notification to the customers.'
                onPressCancel={handleAlert}
                onPressOk={handlePushNotificationSend}
              />
            )}
            {alert && isAnonymous && (
              <Toast
                type='error'
                message='You must signup to send a Push Notification to the customers.'
                trigger={isAnonymous}
              />
            )}
          </>
        )
      )}
      <View style={[styles.textInputWrap, { bottom: focused ? 50 : 0 }]}>
        {!loading && (
          <>
            <TextInput
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={[
                focused ? styles.inputFocused : styles.input,
                {
                  borderColor: color.action,
                  backgroundColor: focused ? color.background : color.light,
                  color: color.text,
                  // marginStart: focused ? 0 : 0,
                },
              ]}
              multiline={focused ? true : false}
              placeholder={placeholder}
              placeholderTextColor={color.placeholder}
              onChangeText={setPushContent}
            />
            <Button
              s='br-20 f'
              textColor={'white'}
              color={color.action}
              title='Send'
              onPress={handleAlert}
            />
          </>
        )}
      </View>
      <View>
        {!loading && !isSingleCard && (
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={CardTag}
            ListHeaderComponent={CardTagAll}
            data={cards}
            showsHorizontalScrollIndicator={false}
            style={styles.tags}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linear: {
    height: 20,
    width: width,
    top: -20,
  },
  textInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    // width: '75%',
    marginEnd: 10,
    height: 40,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  inputFocused: {
    // width: '75%',
    flex: 1,
    marginEnd: 10,
    height: 120,
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagBox: {
    width: '100%',
  },
  tags: {
    // top: 50,
  },
  tag: {
    flexDirection: 'row',
    marginEnd: 15,
    marginStart: 5,
    borderRadius: 14,
    height: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  selectedTag: {
    borderWidth: 2,
  },
  cardTag: {
    flexDirection: 'row',
    marginEnd: 15,
    marginStart: 5,
    borderRadius: 14,
    height: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  cardTagIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginEnd: 5,
  },
});
