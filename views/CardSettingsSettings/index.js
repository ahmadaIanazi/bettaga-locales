import React, { useContext, useState } from 'react';

import { useCardStore } from '../../state/useCardStore';
import { Alert, Button, Div, H, L, Modal, P, T } from '../../../customized';
import { updateDocField } from '../../data/update/updateDocField';
import { UpdateAllPasses } from '../../operations/UpdateAllPasses'
import themeContext from '../../themes/theme';

export default function CardSettingsSettings() {
  const color = useContext(themeContext)
  const { cardState } = useCardStore();

  const cardId = cardState.id
  const cardActive = cardState.active

  const [Warning, setWarning] = useState(false);
  const [deactivated, setDeactivated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleWarning = () => {
    setWarning(true);
  };

  const onPressCancel = () => {
    setWarning(false);
  };
  
  const handleDeactivate = () => {
    setWarning(false);
    const value = cardActive ? false : true
    updateDocField('cards', cardId, 'active', value).then(()=>{
      setDeactivated(true)
    })
  };

  const handleUpdateAllPasses = () => {
    onPressCancel();
    setLoading(true);
    UpdateAllPasses(cardId)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Div s='f' color={color.background}>
        <Div s='m-20 jc p-40 br-40' color={color.light}>
          <H s='xl center uppercase'>Update All Cards</H>
          <P>
            This is to send the update card data to all existing cards. This process takes a while,
            and its NOT 100% guaranteed.
          </P>
          <L s='center'>Why not all cards will received the update?</L>
          <P>
            Because all card holders must be online at the time we send the update of the card, and
            we cannot re-send the card update unless we do that manually.
          </P>
          {loading ? (
            <H s='c'>Updating .. you can leave and come back later.</H>
          ) : (
            <>
              <Button
                s='br-20'
                onPress={handleWarning}
                title={'Refresh and Update All Cards'}
                textColor={'white'}
                color={color.success}
              />
            </>
          )}
        </Div>
        {Warning && (
          <Alert
            onPressCancel={onPressCancel}
            onPressOk={handleUpdateAllPasses}
            title='Are you sure?'
            message='This cannot be un-done ! No backsies !!'
          />
        )}
        <Div s='m-20 jc p-40 br-40' color={color.light}>
          <H s='xl center'>Disable Card</H>
          <P s='rg'>
            This is to disable the card, and to stop all links, or existing cards to be used
            anymore.
          </P>
          <L s='center ts-17 mb-10'>Warning!!</L>
          <P s='rg'>This will not remove the existing cards from Apple Wallet.</P>
          {deactivated ? (
            <H s='c'>Done</H>
          ) : (
            <Button
              s='br-20'
              onPress={handleDeactivate}
              title={cardActive ? 'Disable' : 'Activate'}
              textColor={'white'}
              color={color.error}
            />
          )}
        </Div>
      </Div>
    </>
  );
}
