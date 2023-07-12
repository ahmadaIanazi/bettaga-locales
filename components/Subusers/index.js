import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useUserStore } from '../../state/useUserStore';
import { getUserUsers } from '../../data/get/getUserUsers';
import themeContext from '../../themes/theme';
import { Ionicons } from '@expo/vector-icons';
import { signupSubuser } from '../../data/auth/signupSubuser';

const ROLES = [
  { id: 2, role: 'cashier', label: 'Cashier' },
  { id: 1, role: 'merchant', label: 'Admin' },
];

export default function Subusers() {
  const user = useUserStore((state) => state.user);
  const merchantId = user.uid;
  const [role, setRole] = useState(ROLES[0].role);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [users, setUsers] = useState([]);
  const [creatingUser, setCreatingUser] = useState(false);
  const color = useContext(themeContext);

  const [isAddUser, setIsAddUser] = useState(false);

  useEffect(() => {
    getUserUsers(merchantId).then((users) => {
      console.log('USERS', users);
      setUsers(users);
    });
  }, [merchantId]);

  const USER = ({ item }) => {
    
    const subuserEmail = item?.email
    const subuserRole = item?.role;

    return (
      <View style={styles.subuserContainer}>
        <View style={styles.subuserBox}>
          <Text style={{ fontWeight: 'bold' }}>{subuserRole}</Text>
          <Text>{subuserEmail}</Text>
        </View>
      </View>
    );};

  const handleSubmitUser = () => {
    if (!creatingUser) {
      // Validate email and password
      if (!email) {
        setEmailError('Email is required.');
      } else {
        setEmailError('');
      }
      
      if (!password) {
        setPasswordError('Password is required.');
      } else {
        setPasswordError('');
      }
      
      // Perform login logic if no errors
      if (email && password) {
        signupSubuser(email, password, merchantId, role).then(() => {
          setIsAddUser(!isAddUser);
          setEmailError('');
          setPasswordError('');
          setCreatingUser(false);
        });
      }
      setCreatingUser(true);
    }
  };

  const handleChooseRole = (role) => {
    setRole(role);
  };

  return (
    <View>
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => setIsAddUser(!isAddUser)}
          style={[styles.adduserButton, { backgroundColor: isAddUser ? 'lightgrey' : color.action }]}
        >
          <Ionicons name={isAddUser ? 'remove' : 'person-add'} size={24} color='black' />
          <Text>{isAddUser ? 'Cancel' : 'Add new user'}</Text>
        </TouchableOpacity>
      </View>
      {isAddUser && (
        <View style={styles.addUserBox}>
          <TextInput
            placeholder='Subuser Email'
            style={styles.emailInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            error={emailError}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <TextInput
            placeholder='Subuser Password'
            style={styles.password}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            error={passwordError}
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <View style={{ flexDirection: 'row' }}>
            {ROLES.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleChooseRole(item.role)}
                style={[
                  styles.roleView,
                  {
                    borderColor: color.action,
                    backgroundColor: role === item.role ? color.action : 'transparent',
                  },
                ]}
              >
                <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={handleSubmitUser}
            style={[styles.submitUser, { backgroundColor: color.action }]}
          >
            {creatingUser ? (
              <ActivityIndicator size={'large'} color='white' />
            ) : (
              <>
                <Ionicons name='person-add' size={24} color='black' />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Submit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View>
          <Text>Sub Users</Text>
        </View>
        <FlatList
          data={users}
          renderItem={USER}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subuserContainer:{
    width: '100%',
  },
subuserBox:{
  marginVertical: 10,
  borderRadius: 20,
  backgroundColor: 'lightgrey',
  padding: 10,
},
  adduserButton: {
    zIndex: 100,
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emailInput: {
    padding: 20,

    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  password: {
    padding: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  addUserBox: {
    zIndex: -1,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    paddingTop: 40,
  },
  submitUser: {
    zIndex: 100,
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  roleView: {
    borderWidth: 2,
    zIndex: 100,
    padding: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
