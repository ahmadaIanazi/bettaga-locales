import React, { useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handlePurchaseProduct, handleRestorePurchase } from '../../payments/InAppPurchase';
import PaywallAction from '../../components/paywallAction';
import PaywallBullets from '../../components/paywallBullets';
import PaywallHeader from '../../components/paywallHeader';
import { useCardStore } from '../../state/useCardStore';
import { addPayment } from '../../data/add/addPayment';
import { useUserStore } from '../../state/useUserStore';
import { giftCardPlan, stampCardPlan } from '../../K/offers';

export default function ScreenPaywall({
  route: {
    params: { offer },
  },
}) {
  const userId = useUserStore((state) => state.user.uid);
  const [offerData, setOfferData] = useState([]);
  const [offerTitle, setOfferTitle] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { cardState, cardProfileColor, setAskForPayment } = useCardStore();
  const backgroundColor = cardProfileColor;
  const cardId = cardState.id;

  const handlePurchase = (picked, offerings) => {
    setLoading(true);
    const pickedOffer = offerings[picked];

    handlePurchaseProduct(pickedOffer)
      .then((purchaserInfo) => {
        console.log('purchaserInfo', purchaserInfo);
        addPayment(purchaserInfo, userId, cardId, pickedOffer, cardState);
        navigation.goBack();
      })
      .catch((err) => {
        console.log('Error in Purchase Oops!', err);
        setLoading(false);
      });
  };

  const handleRestore = () => {
    setLoading(true);
    handleRestorePurchase()
      .then((RestorepurchaserInfo) => {
        console.log('purchaserInfo', RestorepurchaserInfo);
        navigation.goBack();
      })
      .catch((err) => {
        console.log('Error in Restore Purchase Oops!', err);
        setLoading(false);
      });
  };

  useLayoutEffect(() => {
    if (offer === 'giftOffer') {
      setOfferData(giftCardPlan[1]);
      setOfferTitle(giftCardPlan[0]);
    }
    if (offer === 'stampOffer') {
      setOfferData(stampCardPlan[1]);
      setOfferTitle(stampCardPlan[0]);
    }
    setAskForPayment(false);
  }, [offer]);

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <PaywallHeader handleShowMore={handleShowMore} showMore={showMore} offerTitle={offerTitle} />
      <PaywallBullets showMore={showMore} offerData={offerData} handleShowMore={handleShowMore} />
      <PaywallAction
        handlePurchase={handlePurchase}
        handleRestore={handleRestore}
        loading={loading}
      />
    </View>
  );
}
